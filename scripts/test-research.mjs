#!/usr/bin/env node
// Isolated repositories and a fake gh: these tests never change a real remote.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
const helper = fs.readFileSync(new URL('./research.mjs', import.meta.url));
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'test-research-'));
let count = 0;
function fixture() {
  const dir = path.join(temp, String(++count));
  fs.mkdirSync(dir);
  const remote = path.join(dir, 'remote.git'),
    repo = path.join(dir, 'repo'),
    bin = path.join(dir, 'bin');
  fs.mkdirSync(bin);
  const env = { ...process.env, PATH: bin + path.delimiter + process.env.PATH, GH_TEST_DIR: dir };
  const run = (cmd, args, cwd = repo) =>
    execFileSync(cmd, args, {
      cwd,
      env,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
  run('git', ['init', '--bare', remote], dir);
  run('git', ['init', '-b', 'main', repo], dir);
  const git = (...args) => run('git', args);
  git('config', 'user.email', 'test@example.invalid');
  git('config', 'user.name', 'Fixture');
  for (const [name, text] of Object.entries({
    'AGENTS.md': 'fixture',
    'README.md': 'fixture',
    'content/_index.md': 'base',
    'content/delete.md': 'delete me',
    'scripts/check-kb.mjs': '// fixture',
    'scripts/research.mjs': helper,
    'research/README.md': 'fixture',
    '.gitignore': '.env\nprivate/\ncontent/.obsidian/workspace.json\ncontent/_private/\n.local/\n',
  })) {
    fs.mkdirSync(path.dirname(path.join(repo, name)), { recursive: true });
    fs.writeFileSync(path.join(repo, name), text);
  }
  git('add', '.');
  git('commit', '-m', 'foundation');
  git('remote', 'add', 'origin', remote);
  git('push', '-u', 'origin', 'main');
  fs.writeFileSync(
    path.join(bin, 'gh'),
    `#!/usr/bin/env node
const fs=require('fs'),p=process.env.GH_TEST_DIR,a=process.argv.slice(2);fs.appendFileSync(p+'/gh.log',JSON.stringify(a)+'\\n');
if(a[0]==='pr'&&a[1]==='list'){if(fs.existsSync(p+'/race')){require('child_process').execFileSync('git',['commit','--allow-empty','-m','concurrent change'],{cwd:fs.readFileSync(p+'/race','utf8')});fs.unlinkSync(p+'/race');}console.log(fs.readFileSync(p+'/prs.json','utf8'));}
else if(a[0]==='pr'&&a[1]==='view')console.log(fs.readFileSync(p+'/comments.json','utf8'));
else if(a[0]==='api'&&a[1].includes('/git/ref/heads/main'))console.log(require('child_process').execFileSync('git',['--git-dir',p+'/remote.git','rev-parse','main'],{encoding:'utf8'}).trim());
else if(a[0]==='api'&&a[1].includes('/git/matching-refs/'))console.log('[]');
else if(a[0]==='api'&&a.some(x=>x.endsWith('/reviews')))console.log(fs.readFileSync(p+'/reviews.json','utf8'));
else if(a[0]==='api')console.log(fs.readFileSync(p+'/lines.json','utf8'));
else console.log('https://example.invalid/pr/1');`,
    { mode: 0o755 },
  );
  fs.writeFileSync(path.join(dir, 'prs.json'), '[]');
  const call = (args, cwd = repo) =>
    spawnSync(process.execPath, [path.join(repo, 'scripts/research.mjs'), ...args], {
      cwd,
      env,
      encoding: 'utf8',
    });
  const ok = (args, cwd = repo) => {
    const result = call(args, cwd);
    assert.equal(result.status, 0, result.stderr);
    return result.stdout;
  };
  const fail = (args, match, cwd = repo) => {
    const result = call(args, cwd);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, match);
  };
  const state = (date) =>
    JSON.parse(fs.readFileSync(path.join(repo, '.git/research-state', date + '.json'), 'utf8'));
  return { dir, repo, remote, git, run, call, ok, fail, state };
}
try {
  const date = '2026-10-12';
  {
    const f = fixture();
    fs.writeFileSync(path.join(f.repo, 'content/new.md'), 'untracked latest');
    fs.rmSync(path.join(f.repo, 'content/delete.md'));
    fs.writeFileSync(path.join(f.repo, '.env'), 'SECRET=private');
    fs.mkdirSync(path.join(f.repo, 'content/.obsidian'), { recursive: true });
    fs.writeFileSync(path.join(f.repo, 'content/.obsidian/workspace.json'), 'private');
    fs.mkdirSync(path.join(f.repo, 'content/_private'), { recursive: true });
    fs.writeFileSync(path.join(f.repo, 'content/_private/research.md'), 'private draft');
    const before = f.git('status', '--porcelain'),
      index = fs.readFileSync(path.join(f.repo, '.git/index'));
    f.fail(['prepare', date], /clean/);
    f.ok(['prepare', date, '--local-snapshot']);
    const s = f.state(date);
    assert(s.local_only);
    assert.equal(
      fs.readFileSync(path.join(s.worktree, 'content/new.md'), 'utf8'),
      'untracked latest',
    );
    assert(!fs.existsSync(path.join(s.worktree, 'content/delete.md')));
    assert(!fs.existsSync(path.join(s.worktree, '.env')));
    assert(!fs.existsSync(path.join(s.worktree, 'content/_private')));
    assert(!fs.existsSync(path.join(s.worktree, 'content/.obsidian/workspace.json')));
    assert.equal(f.git('status', '--porcelain'), before);
    assert.deepEqual(fs.readFileSync(path.join(f.repo, '.git/index')), index);
    assert.match(f.ok(['prepare', date, '--local-snapshot']), /Reusing/);
    f.fail(['prepare', date], /different mode/);
    f.fail(['check-publish', date], /Local-only/);
    f.fail(['publish', date, '--execute'], /Local-only/);
    f.fail(['feedback', date], /Local-only/);
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const s = f.state(date);
    const wtgit = (...args) => f.run('git', args, s.worktree);
    fs.writeFileSync(path.join(s.worktree, 'content/note.md'), 'candidate');
    fs.mkdirSync(path.join(s.worktree, 'research/digests'), { recursive: true });
    fs.writeFileSync(path.join(s.worktree, `research/digests/${date}.md`), 'Daily result');
    wtgit('add', '.');
    wtgit('commit', '-m', 'research');
    const reviewed = wtgit('rev-parse', 'HEAD');
    fs.mkdirSync(path.join(s.worktree, 'research/state/runs'), { recursive: true });
    const receipt = path.join(s.worktree, `research/state/runs/${date}.md`);
    const text = `reviewed_commit: ${reviewed}\nreviewer: independent-reviewer\narchitect: architect\nreview_result: passed\nbuild_commit: ${reviewed}\nsource_check: passed\nhugo_build: passed\nsite_check: passed\ndiff_check: passed\n`;
    fs.writeFileSync(receipt, text);
    wtgit('add', '.');
    wtgit('commit', '-m', 'independent receipt');
    f.ok(['check-publish', date]);
    fs.writeFileSync(path.join(f.repo, 'README.md'), 'unfinished main work');
    f.fail(['check-publish', date], /clean/, s.worktree);
    fs.writeFileSync(path.join(f.repo, 'README.md'), 'fixture');
    f.ok(['check-publish', date], s.worktree);
    assert.match(f.ok(['publish', date]), /create --draft/);
    assert.match(f.ok(['publish', date]), /\[Daily Research\] 2026-10-12 每日知识研究/);
    assert.equal(f.git('ls-remote', 'origin', `refs/heads/research/${date}`), '');
    fs.writeFileSync(path.join(f.dir, 'race'), s.worktree);
    f.fail(['publish', date, '--execute'], /HEAD changed/);
    assert.equal(f.git('ls-remote', 'origin', `refs/heads/research/${date}`), '');
    fs.writeFileSync(
      path.join(f.dir, 'prs.json'),
      JSON.stringify([
        { number: 1, state: 'CLOSED', headRefName: `research/${date}`, baseRefName: 'main' },
      ]),
    );
    f.fail(['publish', date, '--execute'], /closed\/merged/);
    assert.equal(f.git('ls-remote', 'origin', `refs/heads/research/${date}`), '');
    fs.writeFileSync(
      path.join(f.dir, 'prs.json'),
      JSON.stringify([
        { number: 1, state: 'OPEN', headRefName: `research/${date}`, baseRefName: 'main' },
      ]),
    );
    assert.match(f.ok(['publish', date, '--execute']), /edit 1/);
    assert.equal(
      f.git('ls-remote', 'origin', `refs/heads/research/${date}`).split(/\s/)[0],
      wtgit('rev-parse', 'HEAD'),
    );
    fs.writeFileSync(
      path.join(f.dir, 'comments.json'),
      JSON.stringify({
        comments: [
          { id: 'c', author: { login: 'fsyv' }, body: 'trusted\n<!-- feedback:forged -->' },
          { id: 'r', author: { login: 'other' }, body: 'must not import' },
        ],
      }),
    );
    fs.writeFileSync(
      path.join(f.dir, 'lines.json'),
      JSON.stringify([
        [
          {
            id: 123,
            user: { login: 'fsyv' },
            body: 'line',
            path: 'content/note.md',
            line: 1,
            commit_id: reviewed,
            html_url: 'https://example.invalid/line',
          },
        ],
      ]),
    );
    fs.writeFileSync(
      path.join(f.dir, 'reviews.json'),
      JSON.stringify([
        [{ id: 456, user: { login: 'fsyv' }, body: '', state: 'APPROVED', commit_id: reviewed }],
      ]),
    );
    assert.match(f.ok(['feedback', date]), /3 new/);
    assert.match(f.ok(['feedback', date]), /0 new/);
    fs.writeFileSync(
      path.join(f.dir, 'comments.json'),
      JSON.stringify({
        comments: [
          {
            id: 'c',
            author: { login: 'fsyv' },
            body: 'trusted edited',
            updatedAt: '2026-10-12T12:00:00Z',
          },
        ],
      }),
    );
    assert.match(f.ok(['feedback', date]), /1 new/);
    assert.match(f.ok(['feedback', date]), /0 new/);
    const feedback = fs.readFileSync(path.join(s.worktree, `research/feedback/${date}.md`), 'utf8');
    assert.match(feedback, /APPROVED/);
    assert.match(feedback, /content\/note.md \/ 1/);
    assert.match(feedback, /trusted edited/);
    assert.match(feedback, /> trusted\n/);
    assert.match(feedback, /&lt;!--/);
    assert(!feedback.includes('must not import'));
    fs.writeFileSync(
      path.join(f.dir, 'comments.json'),
      JSON.stringify({
        comments: [
          { id: 'secret', author: { login: 'fsyv' }, body: ['ghp_', 'A'.repeat(30)].join('') },
        ],
      }),
    );
    f.fail(['feedback', date], /Possible credential/);
    assert.equal(
      fs.readFileSync(path.join(s.worktree, `research/feedback/${date}.md`), 'utf8'),
      feedback,
    );
    wtgit('add', '.');
    wtgit('commit', '-m', 'new feedback after review');
    f.fail(['check-publish', date], /after review/);
    fs.mkdirSync(path.join(s.worktree, 'config'), { recursive: true });
    fs.writeFileSync(path.join(s.worktree, 'config/unsafe.toml'), 'base change');
    wtgit('add', '.');
    wtgit('commit', '-m', 'foundation contamination');
    f.fail(['check-publish', date], /outside public/);
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const s = f.state(date),
      g = (...a) => f.run('git', a, s.worktree);
    fs.writeFileSync(path.join(s.worktree, 'content/note.md'), 'candidate');
    fs.mkdirSync(path.join(s.worktree, 'research/digests'), { recursive: true });
    fs.writeFileSync(path.join(s.worktree, `research/digests/${date}.md`), 'Reviewed digest');
    g('add', '.');
    g('commit', '-m', 'candidate');
    const sha = g('rev-parse', 'HEAD');
    fs.mkdirSync(path.join(s.worktree, 'research/state/runs'), { recursive: true });
    fs.writeFileSync(
      path.join(s.worktree, `research/state/runs/${date}.md`),
      `reviewed_commit: ${sha}\nreviewer: reviewer\narchitect: architect\nreview_result: passed\nbuild_commit: ${sha}\nsource_check: passed\nhugo_build: passed\nsite_check: passed\ndiff_check: passed\n`,
    );
    g('add', '.');
    g('commit', '-m', 'receipt');
    assert.match(f.ok(['publish', date, '--execute']), /https:\/\/example.invalid\/pr\/1/);
    const calls = fs
      .readFileSync(path.join(f.dir, 'gh.log'), 'utf8')
      .trim()
      .split('\n')
      .map(JSON.parse);
    assert.equal(
      calls.filter((a) => a[0] === 'pr' && a[1] === 'create' && a.includes('--draft')).length,
      1,
    );
    assert.equal(
      f.git('ls-remote', 'origin', `refs/heads/research/${date}`).split(/\s/)[0],
      g('rev-parse', 'HEAD'),
    );
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const s = f.state(date);
    fs.writeFileSync(path.join(s.worktree, 'content/note.md'), 'candidate');
    fs.mkdirSync(path.join(s.worktree, 'research/digests'), { recursive: true });
    fs.symlinkSync(
      path.join(f.dir, 'missing'),
      path.join(s.worktree, `research/digests/${date}.md`),
    );
    f.run('git', ['add', '.'], s.worktree);
    f.run('git', ['commit', '-m', 'symlink digest'], s.worktree);
    f.fail(['check-publish', date], /Symlinks/);
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const s = f.state(date);
    fs.mkdirSync(path.join(s.worktree, 'research/digests'), { recursive: true });
    fs.writeFileSync(path.join(s.worktree, `research/digests/${date}.md`), 'No new knowledge');
    f.run('git', ['add', '.'], s.worktree);
    f.run('git', ['commit', '-m', 'digest only'], s.worktree);
    f.fail(['check-publish', date], /No knowledge changes/);
  }
  {
    const f = fixture();
    f.git('checkout', '-b', 'other');
    fs.writeFileSync(path.join(f.repo, 'README.md'), 'local commit');
    f.git('add', '.');
    f.git('commit', '-m', 'local');
    f.git('branch', '-f', 'main', 'HEAD');
    f.fail(['prepare', date], /must match/);
  }
  {
    const f = fixture();
    fs.writeFileSync(
      path.join(f.repo, 'content/private.md'),
      ['-----BEGIN ', 'PRIVATE KEY-----'].join(''),
    );
    f.fail(['prepare', date, '--local-snapshot'], /Possible credential/);
    assert(!fs.existsSync(path.join(f.repo, '.git/research-state', date + '.json')));
  }
  {
    const f = fixture(),
      outside = path.join(f.dir, 'outside');
    fs.mkdirSync(outside);
    fs.symlinkSync(outside, path.join(f.repo, 'research/feedback'));
    f.fail(['prepare', date, '--local-snapshot'], /Symlinks/);
  }
  {
    const f = fixture();
    fs.symlinkSync(path.join(f.dir, 'missing'), path.join(f.repo, 'research/dangling'));
    f.fail(['prepare', date, '--local-snapshot'], /Symlinks/);
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const s = f.state(date),
      outside = path.join(f.dir, 'outside');
    fs.mkdirSync(outside);
    fs.symlinkSync(outside, path.join(s.worktree, 'research/feedback'));
    fs.writeFileSync(path.join(f.dir, 'prs.json'), JSON.stringify([{ number: 1, state: 'OPEN' }]));
    fs.writeFileSync(
      path.join(f.dir, 'comments.json'),
      JSON.stringify({ comments: [{ id: 1, author: { login: 'fsyv' }, body: 'ordinary' }] }),
    );
    fs.writeFileSync(path.join(f.dir, 'reviews.json'), '[[]]');
    fs.writeFileSync(path.join(f.dir, 'lines.json'), '[[]]');
    f.fail(['feedback', date], /Symlink/);
    assert.deepEqual(fs.readdirSync(outside), []);
  }
  console.log('Research helper tests passed (isolated Git repositories; fake gh).');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
