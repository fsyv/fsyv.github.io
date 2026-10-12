#!/usr/bin/env node
// No dependencies. Hugo remains the full YAML/Markdown parser; this checks our
// deliberately narrow portable-link convention and the rendered local site.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const privateMode = args[0] === '--private';
if (
  args.length &&
  !(privateMode && args.length === 1) &&
  !(args.length === 2 && args[0] === '--site')
)
  throw new Error('Usage: node scripts/check-kb.mjs [--site public | --private]');
const vault = path.join(root, 'content', privateMode ? '_private' : '');
const failures = [];
const fail = (message) => failures.push(message);
const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
const relative = (file) => path.relative(root, file);
const codeFree = (text) =>
  text.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, '').replace(/`+[^`\n]*`+/g, '');
const scalar = (yaml, key) => {
  const line = yaml.match(new RegExp(`^${key}:\\s*(.*?)\\s*$`, 'm'))?.[1] ?? '';
  return line.replace(/^(['"])(.*)\1$/, '$2');
};
const inVault = (file) => file === vault || file.startsWith(vault + path.sep);
const isTemplate = (file) => path.relative(vault, file).split(path.sep)[0] === '_templates';
const isLocalState = (file) =>
  ['.obsidian', '.trash', '_private'].includes(path.relative(vault, file).split(path.sep)[0]);
const isPrivateAsset = (file) =>
  privateMode && path.relative(vault, path.dirname(file)).split(path.sep).includes('assets');
const ids = new Map();
const markdown = walk(vault).filter(
  (file) =>
    file.endsWith('.md') && !isTemplate(file) && !isLocalState(file) && !isPrivateAsset(file),
);
let sourceLinks = 0;

for (const old of [
  'about',
  'books',
  'posts',
  'publications',
  'concepts',
  'claims',
  'connections',
  'evolution',
]) {
  if (fs.existsSync(path.join(vault, old))) fail(`Unexpected old/fixed directory: content/${old}`);
}
for (const section of ['', 'maps', 'notes', 'sources', 'questions']) {
  if (!fs.existsSync(path.join(vault, section, '_index.md')))
    fail(`Missing section index: ${section}/_index.md`);
}

for (const file of markdown) {
  const text = fs.readFileSync(file, 'utf8');
  const fm = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!fm) {
    fail(`${relative(file)}: missing YAML front matter`);
    continue;
  }
  const yaml = fm[1];
  for (const key of ['title', 'date', 'draft', 'tags', 'id', 'kind', 'maturity', 'endorsement']) {
    if (!new RegExp(`^${key}:`, 'm').test(yaml)) fail(`${relative(file)}: missing ${key}`);
  }
  const id = scalar(yaml, 'id');
  if (!/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(id))
    fail(`${relative(file)}: id must be a UUID, not a template placeholder`);
  if (ids.has(id)) fail(`${relative(file)}: duplicate id also in ${relative(ids.get(id))}`);
  ids.set(id, file);
  if (!['index', 'map', 'note', 'source', 'question'].includes(scalar(yaml, 'kind')))
    fail(`${relative(file)}: invalid kind`);
  if (!['seed', 'developing', 'evergreen'].includes(scalar(yaml, 'maturity')))
    fail(`${relative(file)}: invalid maturity`);
  if (
    !['ai-candidate', 'user-confirmed', 'not-applicable', 'legacy-unreviewed'].includes(
      scalar(yaml, 'endorsement'),
    )
  )
    fail(`${relative(file)}: invalid endorsement`);
  if (privateMode && scalar(yaml, 'visibility') !== 'private')
    fail(`${relative(file)}: private import must declare visibility: private`);
  if (!['true', 'false'].includes(scalar(yaml, 'draft')))
    fail(`${relative(file)}: draft must be a boolean`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(scalar(yaml, 'date')))
    fail(`${relative(file)}: use a YYYY-MM-DD date`);
  if (
    scalar(yaml, 'kind') === 'question' &&
    !['open', 'researching', 'resolved'].includes(scalar(yaml, 'status'))
  )
    fail(`${relative(file)}: invalid question status`);
  const body = codeFree(text.slice(fm[0].length));
  if (/\[\[.*?\]\]/.test(body))
    fail(`${relative(file)}: use standard Markdown links, not Wikilinks`);
  if (/{{[<%]/.test(body)) fail(`${relative(file)}: Hugo shortcode is not portable to Obsidian`);
  // Inline links/images, plus reference definitions. Destinations with spaces use %20 or <...>.
  const destinations = [
    ...body.matchAll(/!?\[[^\]\n]*\]\(\s*(<[^>]+>|[^\s)]+)(?:\s+['"][^\n]*['"])?\s*\)/g),
    ...body.matchAll(/^\s*\[[^\]\n]+\]:\s*(<[^>]+>|\S+)/gm),
  ];
  for (const match of destinations) {
    const raw = match[1].replace(/^<|>$/g, '');
    if (/^[a-z][a-z\d+.-]*:/i.test(raw) || raw.startsWith('//')) continue;
    sourceLinks++;
    const [destination, fragment] = raw.split('#', 2);
    const pathname = decodeURIComponent(destination.split('?', 1)[0]);
    if (pathname.startsWith('/')) {
      fail(`${relative(file)}: vault link must be file-relative: ${raw}`);
      continue;
    }
    const target = pathname ? path.resolve(path.dirname(file), pathname) : file;
    if (
      !inVault(target) ||
      isTemplate(target) ||
      isLocalState(target) ||
      !fs.existsSync(target) ||
      !fs.statSync(target).isFile()
    ) {
      fail(`${relative(file)}: missing/non-public local target ${raw}`);
      continue;
    }
    if (
      pathname &&
      !pathname.endsWith('.md') &&
      !match[0].startsWith('!') &&
      !isPrivateAsset(target)
    )
      fail(`${relative(file)}: note links must include .md: ${raw}`);
    if (fragment && target.endsWith('.md')) {
      const anchor = decodeURIComponent(fragment);
      if (!/^[a-z0-9-]+$/.test(anchor))
        fail(`${relative(file)}: use a tested simple ASCII heading anchor: ${raw}`);
      const headings = [
        ...codeFree(fs.readFileSync(target, 'utf8')).matchAll(/^#{1,6}\s+([A-Za-z0-9 -]+)\s*$/gm),
      ].map((m) => m[1].trim().toLowerCase().replace(/\s+/g, '-'));
      if (!headings.includes(anchor)) fail(`${relative(file)}: missing heading ${raw}`);
    }
  }
}

const decodeHTML = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
// Even a forced git add of private files must fail public CI/preflight.
if (!privateMode) {
  const top = spawnSync('git', ['rev-parse', '--show-toplevel'], { cwd: root, encoding: 'utf8' });
  if (top.status === 0 && path.resolve(top.stdout.trim()) === root) {
    const staged = spawnSync('git', ['ls-files', '--', 'content/_private', '.local'], {
      cwd: root,
      encoding: 'utf8',
    });
    if (staged.status !== 0) fail('Cannot inspect public Git index');
    else if (staged.stdout.trim())
      fail(
        'Private paths tracked by public Git; remove them from the public index before proceeding',
      );
  }
}
let renderedLinks = 0;
if (args[0] === '--site') {
  const site = path.resolve(root, args[1]);
  if (!fs.existsSync(site)) throw new Error(`Build output does not exist: ${site}`);
  const baseURL = fs
    .readFileSync(path.join(root, 'config/_default/hugo.toml'), 'utf8')
    .match(/^baseURL\s*=\s*"([^"]+)"/m)?.[1];
  const origin = new URL(baseURL).origin;
  const files = walk(site);
  const htmlFiles = files.filter((file) => file.endsWith('.html'));
  const contents = new Map(htmlFiles.map((file) => [file, fs.readFileSync(file, 'utf8')]));
  for (const file of files) {
    if (/(^|\/)(?:_private|_templates|\.obsidian|\.trash)(\/|$)/.test(path.relative(site, file)))
      fail(`Private/local directory published: ${path.relative(site, file)}`);
  }
  for (const [file, html] of contents) {
    const location = new URL(path.relative(site, file).replace(/index\.html$/, ''), baseURL);
    // Inspect HTML attributes, not strings inside inline JavaScript/CSS.
    const markup = html
      .replace(/<!--[^]*?-->/g, '')
      .replace(/(<(?:script|style)\b[^>]*>)[^]*?(<\/(?:script|style)\s*>)/gi, '$1$2');
    const attrs = [...markup.matchAll(/<[^>]+>/g)].flatMap((tag) => [
      ...tag[0].matchAll(/\b(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g),
    ]);
    for (const attr of attrs) {
      const raw = decodeHTML(attr[1] ?? attr[2] ?? attr[3]);
      if (!raw || /^(?:mailto:|tel:|data:|javascript:|blob:)/i.test(raw)) continue;
      const url = new URL(raw, location);
      if (url.origin !== origin) continue;
      renderedLinks++;
      const pathname = decodeURIComponent(url.pathname);
      let target = path.resolve(site, '.' + pathname);
      if (!target.startsWith(site + path.sep) && target !== site) {
        fail(`${path.relative(site, file)}: escaped site ${raw}`);
        continue;
      }
      if (fs.existsSync(target) && fs.statSync(target).isDirectory())
        target = path.join(target, 'index.html');
      if (!fs.existsSync(target)) {
        fail(`${path.relative(site, file)}: missing rendered target ${raw}`);
        continue;
      }
      if (pathname.endsWith('.md'))
        fail(`${path.relative(site, file)}: unconverted Markdown URL ${raw}`);
      if (url.hash && contents.has(target)) {
        const anchor = decodeURIComponent(url.hash.slice(1));
        const anchors = [
          ...contents
            .get(target)
            .matchAll(/\b(?:id|name)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g),
        ].map((m) => decodeHTML(m[1] ?? m[2] ?? m[3]));
        if (!anchors.includes(anchor))
          fail(`${path.relative(site, file)}: missing rendered fragment ${raw}`);
      }
    }
  }
  for (const section of ['maps', 'notes', 'sources', 'questions']) {
    if (!fs.existsSync(path.join(site, section, 'index.html')))
      fail(`Missing rendered section: ${section}`);
    const home = contents.get(path.join(site, 'index.html')) ?? '';
    if (!home.includes(`href="/${section}/"`) && !home.includes(`href=/${section}/`))
      fail(`Homepage does not link to ${section}`);
  }
  const cname = fs.readFileSync(path.join(root, 'CNAME'), 'utf8').trim();
  if (
    !fs.existsSync(path.join(site, 'CNAME')) ||
    fs.readFileSync(path.join(site, 'CNAME'), 'utf8').trim() !== cname
  )
    fail('Built CNAME missing or differs from root CNAME');
  console.log(
    `Rendered: ${htmlFiles.length} HTML pages; ${renderedLinks} local links/assets checked.`,
  );
}
console.log(
  `Vault: ${markdown.length} Markdown pages; ${ids.size} stable IDs; ${sourceLinks} local links checked.`,
);
if (failures.length) {
  for (const message of failures) console.error(`FAIL ${message}`);
  process.exitCode = 1;
} else console.log('Knowledge checks passed.');
