#!/usr/bin/env node
// Exercise the resolver and checks in a temporary repository; never touch notes.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'knowledge-links-'));
const hugo = process.env.HUGO_BIN || 'hugo';
const run = (command, args, expected = 0) => {
  const result = spawnSync(command, args, { cwd: fixture, encoding: 'utf8' });
  if (result.error) throw result.error;
  if (expected === 0 ? result.status !== 0 : result.status === 0) {
    throw new Error(
      `${command} exited ${result.status}, expected ${expected === 0 ? 'success' : 'failure'}\n${result.stdout}\n${result.stderr}`,
    );
  }
  return result.stdout + result.stderr;
};
const build = (expected) =>
  run(
    hugo,
    [
      '--source',
      fixture,
      '--themesDir',
      path.join(root, 'themes'),
      '--destination',
      path.join(fixture, 'public'),
      '--minify',
    ],
    expected,
  );
const page = (body, draft = false, id = randomUUID(), math = false) =>
  `---\ntitle: "Link test"\ndate: 2026-01-01\ndraft: ${draft}\ntags: []\nid: "${id}"\nkind: note\nmaturity: seed\nendorsement: ai-candidate\nmath: ${math}\n---\n\n${body}\n`;
const note = (name) => path.join(fixture, 'content/notes', name);
try {
  for (const dir of ['config', 'layouts', 'content', 'static', 'assets', 'archetypes', 'scripts'])
    fs.cpSync(path.join(root, dir), path.join(fixture, dir), {
      recursive: true,
      filter: (file) => path.basename(file) !== '_private',
    });
  fs.copyFileSync(path.join(root, 'CNAME'), path.join(fixture, 'CNAME'));
  fs.writeFileSync(note('link target.md'), page('## Links\n\nTarget.'));
  fs.writeFileSync(note('链接.md'), page('Unicode path.'));
  fs.writeFileSync(
    note('math-test.md'),
    page('Inline $x^2$.\n\n$$\nx^2 + y^2 = z^2\n$$', false, randomUUID(), true),
  );
  fs.writeFileSync(
    note('compatibility-test.md'),
    page(
      '[Sibling](./link%20target.md?from=test#links)\n\n[Unicode](./%E9%93%BE%E6%8E%A5.md)\n\n[Section](../maps/_index.md)\n\n[Home](../_index.md)',
    ),
  );
  build(0);
  run(process.execPath, ['scripts/check-kb.mjs', '--site', 'public']);
  const rendered = fs.readFileSync(
    path.join(fixture, 'public/notes/compatibility-test/index.html'),
    'utf8',
  );
  if (!/href=["']?\/notes\/link-target\/\?from=test#links/.test(rendered))
    throw new Error('Query/fragment or escaped source filename was not resolved');

  fs.renameSync(note('link target.md'), note('renamed.md'));
  if (!build(1).includes('Unresolved knowledge link'))
    throw new Error('Missing .md link did not produce the expected error');
  const source = fs.readFileSync(note('compatibility-test.md'), 'utf8');
  fs.writeFileSync(note('compatibility-test.md'), source.replace('link%20target.md', 'renamed.md'));
  build(0);
  run(process.execPath, ['scripts/check-kb.mjs', '--site', 'public']);

  fs.appendFileSync(
    note('compatibility-test.md'),
    '\n[Missing anchor](renamed.md#not-a-heading)\n',
  );
  if (!run(process.execPath, ['scripts/check-kb.mjs'], 1).includes('missing heading'))
    throw new Error('Missing heading was not detected');
  fs.writeFileSync(note('compatibility-test.md'), source.replace('link%20target.md', 'renamed.md'));
  const duplicate = fs.readFileSync(note('renamed.md'), 'utf8');
  fs.writeFileSync(note('duplicate.md'), duplicate);
  if (!run(process.execPath, ['scripts/check-kb.mjs'], 1).includes('duplicate id'))
    throw new Error('Duplicate stable ID was not detected');
  fs.unlinkSync(note('duplicate.md'));

  for (const [section, kind] of [
    ['notes', 'default'],
    ['maps', 'map'],
    ['sources', 'source'],
    ['questions', 'question'],
  ]) {
    run(hugo, [
      'new',
      'content',
      `${section}/archetype-check.md`,
      '--kind',
      kind,
      '--themesDir',
      path.join(root, 'themes'),
    ]);
    const file = path.join(fixture, 'content', section, 'archetype-check.md');
    const text = fs.readFileSync(file, 'utf8');
    if (!/^date: \d{4}-\d{2}-\d{2}$/m.test(text))
      throw new Error(`Archetype ${kind} emitted an incompatible date`);
    fs.writeFileSync(file, text.replace('REPLACE-WITH-UUID', randomUUID()));
  }
  run(process.execPath, ['scripts/check-kb.mjs']);
  run(hugo, [
    '--source',
    fixture,
    '--themesDir',
    path.join(root, 'themes'),
    '--destination',
    path.join(fixture, 'public'),
    '--buildDrafts',
    '--minify',
  ]);
  run(process.execPath, ['scripts/check-kb.mjs', '--site', 'public']);
  if (fs.existsSync(path.join(fixture, 'public/_templates')))
    throw new Error('Local templates were published when building drafts');
  const math = fs.readFileSync(path.join(fixture, 'public/notes/math-test/index.html'), 'utf8');
  if (
    !math.includes('<math') ||
    (!math.includes('display="block"') && !math.includes('display=block'))
  )
    throw new Error('Inline/block MathML not rendered');
  fs.mkdirSync(path.join(fixture, 'content/_private'), { recursive: true });
  const marker = 'PRIVATE_FIXTURE_NEVER_PUBLISH_7294';
  fs.writeFileSync(
    path.join(fixture, 'content/_private/secret.md'),
    page(marker).replace('tags: []', 'url: /unexpected-private-page/\ntags: []'),
  );
  run(hugo, [
    '--source',
    fixture,
    '--themesDir',
    path.join(root, 'themes'),
    '--destination',
    path.join(fixture, 'private-check'),
    '--buildDrafts',
    '--minify',
  ]);
  const scan = (dir) =>
    fs
      .readdirSync(dir, { withFileTypes: true })
      .some((e) =>
        e.isDirectory()
          ? scan(path.join(dir, e.name))
          : fs.readFileSync(path.join(dir, e.name)).includes(Buffer.from(marker)),
      );
  if (scan(path.join(fixture, 'private-check')))
    throw new Error('Private content leaked even with buildDrafts');
  fs.appendFileSync(note('compatibility-test.md'), '\n[Private target](../_private/secret.md)\n');
  if (!run(process.execPath, ['scripts/check-kb.mjs'], 1).includes('non-public local target'))
    throw new Error('Public-to-private link accepted');
  fs.writeFileSync(note('compatibility-test.md'), source.replace('link%20target.md', 'renamed.md'));
  const privatePage = (body) =>
    page(body, true).replace('tags: []', 'visibility: private\ntags: []');
  for (const section of ['', 'maps', 'notes', 'sources', 'questions']) {
    const dir = path.join(fixture, 'content/_private', section);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, '_index.md'), privatePage('Local index.'));
  }
  fs.writeFileSync(path.join(fixture, 'content/_private/secret.md'), privatePage(marker));
  const attachments = path.join(fixture, 'content/_private/notes/assets');
  fs.mkdirSync(attachments);
  fs.writeFileSync(path.join(attachments, 'evidence.txt'), 'Local attachment.');
  fs.writeFileSync(
    path.join(attachments, 'drawing.md'),
    'Raw drawing attachment, not a knowledge note.',
  );
  fs.writeFileSync(
    path.join(fixture, 'content/_private/notes/example.md'),
    privatePage(
      '[Evidence](assets/evidence.txt)\n\n[Public prerequisite](../../notes/renamed.md#links)',
    ),
  );
  run(process.execPath, ['scripts/check-kb.mjs', '--private']);
  fs.unlinkSync(path.join(attachments, 'evidence.txt'));
  if (
    !run(process.execPath, ['scripts/check-kb.mjs', '--private'], 1).includes(
      'missing/non-public local target',
    )
  )
    throw new Error('Missing private attachment accepted');
  run('git', ['init']);
  run('git', ['add', '-f', 'content/_private/secret.md']);
  if (
    !run(process.execPath, ['scripts/check-kb.mjs'], 1).includes(
      'Private paths tracked by public Git',
    )
  )
    throw new Error('Forced staging private content accepted');
  console.log(
    'Integration checks passed: relative/section/home/encoded links, query/fragment, rename repair, missing link/anchor, duplicate ID, four archetypes, draft template exclusion, MathML, private-to-public prerequisites, private publication/link/staging isolation.',
  );
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
}
