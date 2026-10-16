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
function write(base, file, text) {
  fs.mkdirSync(path.dirname(path.join(base, file)), { recursive: true });
  fs.writeFileSync(path.join(base, file), text);
}
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
  })) write(repo, name, text);
  git('add', '.');
  git('commit', '-m', 'foundation');
  git('remote', 'add', 'origin', remote);
  git('push', '-u', 'origin', 'main');
  write(bin, 'gh', `#!/usr/bin/env node
const fs=require('fs'),cp=require('child_process'),p=process.env.GH_TEST_DIR,a=process.argv.slice(2);
fs.appendFileSync(p+'/gh.log',JSON.stringify(a)+'\\n');
const get=k=>a[a.indexOf(k)+1],prs=()=>JSON.parse(fs.readFileSync(p+'/prs.json','utf8'));
if(a[0]==='pr'&&a[1]==='list'){
  if(fs.existsSync(p+'/race')){cp.execFileSync('git',['commit','--allow-empty','-m','concurrent change'],{cwd:fs.readFileSync(p+'/race','utf8')});fs.unlinkSync(p+'/race');}
  console.log(JSON.stringify(prs().filter(x=>!x.headRefName||x.headRefName===get('--head'))));
}else if(a[0]==='pr'&&a[1]==='view')console.log(fs.readFileSync(p+'/comments.json','utf8'));
else if(a[0]==='api'&&a[1].includes('/git/ref/heads/main'))console.log(cp.execFileSync('git',['--git-dir',p+'/remote.git','rev-parse','main'],{encoding:'utf8'}).trim());
else if(a[0]==='api'&&a[1].includes('/git/matching-refs/'))console.log('[]');
else if(a[0]==='api'&&a.some(x=>x.endsWith('/reviews')))console.log(fs.readFileSync(p+'/reviews.json','utf8'));
else if(a[0]==='api')console.log(fs.readFileSync(p+'/lines.json','utf8'));
else if(a[0]==='pr'&&['create','edit'].includes(a[1])){
  fs.copyFileSync(get('--body-file'),p+'/gh.body');
  const list=prs();
  if(a[1]==='create'){const n=list.length+1;list.push({number:n,state:'OPEN',url:'https://example.invalid/pr/'+n,headRefName:get('--head')});fs.writeFileSync(p+'/prs.json',JSON.stringify(list));}
  console.log('https://example.invalid/pr/'+(a[1]==='edit'?a[2]:list.length));
}else throw Error('Unexpected gh call: '+a.join(' '));`);
  fs.chmodSync(path.join(bin, 'gh'), 0o755);
  write(dir, 'prs.json', '[]');
  write(dir, 'comments.json', '{"comments":[]}');
  write(dir, 'reviews.json', '[[]]');
  write(dir, 'lines.json', '[[]]');
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
    assert.notEqual(result.status, 0, result.stdout);
    assert.match(result.stderr, match);
  };
  const state = (date) => JSON.parse(fs.readFileSync(path.join(
    repo, '.git/research-state', date ? `local/${date}.json` : 'active.json',
  ), 'utf8'));
  const advance = (file, text) => {
    const upstream = path.join(dir, 'upstream');
    if (!fs.existsSync(upstream)) git('worktree', 'add', '--detach', upstream, 'origin/main');
    write(upstream, file, text);
    run('git', ['add', '.'], upstream);
    run('git', ['commit', '-m', 'upstream main change'], upstream);
    run('git', ['push', 'origin', 'HEAD:main'], upstream);
    return run('git', ['rev-parse', 'HEAD'], upstream);
  };
  const calls = () => fs.readFileSync(path.join(dir, 'gh.log'), 'utf8').trim().split('\n').map(JSON.parse);
  return { dir, repo, remote, git, run, call, ok, fail, state, advance, calls };
}
function commit(f, s, message) {
  f.run('git', ['add', '.'], s.worktree);
  f.run('git', ['commit', '-m', message], s.worktree);
  return f.run('git', ['rev-parse', 'HEAD'], s.worktree);
}
function candidate(f, s, date) {
  write(s.worktree, `content/note-${date}.md`, `Candidate ${date}`);
  write(s.worktree, `research/digests/${date}.md`, `Daily result ${date}: long digest text`);
  write(s.worktree, 'research/review.md', `# 待审清单\n\n${date}+A1 候选理解。见 [晨报](digests/${date}.md)。\n`);
  const ledger = path.join(s.worktree, 'research/state/ledger.md');
  write(s.worktree, 'research/state/ledger.md',
    (fs.existsSync(ledger) ? fs.readFileSync(ledger, 'utf8') : '') + `${date}+A1\n`);
  return commit(f, s, 'research candidate');
}
function attest(f, s, date, reviewed = f.run('git', ['rev-parse', 'HEAD'], s.worktree)) {
  write(s.worktree, `research/state/runs/${date}.md`,
    `reviewed_commit: ${reviewed}\nreviewer: independent-reviewer\narchitect: architect\nreview_result: passed\nbuild_commit: ${reviewed}\nsource_check: passed\nhugo_build: passed\nsite_check: passed\ndiff_check: passed\n`);
  commit(f, s, 'independent receipt');
  return reviewed;
}
try {
  const date = '2026-10-12', next = '2026-10-13';
  {
    const f = fixture();
    write(f.repo, 'content/new.md', 'untracked latest');
    fs.rmSync(path.join(f.repo, 'content/delete.md'));
    write(f.repo, '.env', 'SECRET=private');
    write(f.repo, 'content/.obsidian/workspace.json', 'private');
    write(f.repo, 'content/_private/research.md', 'private draft');
    const before = f.git('status', '--porcelain'),
      index = fs.readFileSync(path.join(f.repo, '.git/index')),
      main = f.git('rev-parse', 'main');
    f.ok(['prepare', date, '--local-snapshot']);
    const snapshot = f.state(date);
    assert(snapshot.local_only);
    assert.equal(snapshot.branch, `local-snapshot/${date}`);
    assert.equal(fs.readFileSync(path.join(snapshot.worktree, 'content/new.md'), 'utf8'), 'untracked latest');
    for (const file of ['content/delete.md', '.env', 'content/_private', 'content/.obsidian/workspace.json'])
      assert(!fs.existsSync(path.join(snapshot.worktree, file)));
    assert.match(f.ok(['prepare', date, '--local-snapshot']), /Reusing/);
    for (const args of [['check-publish', date], ['publish', date, '--execute'], ['feedback', date]])
      f.fail([...args, '--local-snapshot'], /Local-only/);
    // Formal and local work can coexist, and the formal basis excludes uncommitted primary edits.
    f.ok(['prepare', date]);
    const s = f.state();
    assert(!s.local_only);
    assert(!fs.existsSync(path.join(s.worktree, 'content/new.md')));
    assert.equal(f.git('status', '--porcelain'), before);
    assert.deepEqual(fs.readFileSync(path.join(f.repo, '.git/index')), index);
    assert.equal(f.git('rev-parse', 'main'), main);
    // Changing a local snapshot's metadata cannot make its ancestry public.
    const statefile = path.join(f.repo, '.git/research-state/active.json');
    write(f.repo, '.git/research-state/active.json', JSON.stringify({ ...snapshot, local_only: false }));
    f.fail(['check-publish', date], /permanently local-only/);
    assert(fs.existsSync(statefile));
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const first = f.state();
    assert.equal(first.started, date);
    assert.equal(first.branch, `research/batch-${date}`);
    assert.equal(path.basename(first.worktree), `batch-${date}`);
    candidate(f, first, date);
    attest(f, first, date);
    f.ok(['check-publish', date]);
    assert.match(f.ok(['publish', date]), /create --draft/);
    assert.match(f.ok(['publish', date]), /\[Research Review\] 2026-10-12起 知识研究待审/);
    assert.equal(f.git('ls-remote', 'origin', `refs/heads/${first.branch}`), '');
    fs.writeFileSync(path.join(f.dir, 'race'), first.worktree);
    f.fail(['publish', date, '--execute'], /HEAD changed/);
    assert.equal(f.git('ls-remote', 'origin', `refs/heads/${first.branch}`), '');
    f.ok(['publish', date, '--execute']);
    assert.equal(fs.readFileSync(path.join(f.dir, 'gh.body'), 'utf8'),
      fs.readFileSync(path.join(first.worktree, 'research/review.md'), 'utf8'));
    assert(!fs.readFileSync(path.join(f.dir, 'gh.body'), 'utf8').includes('long digest text'));
    assert.match(f.ok(['prepare', next], first.worktree), /Reusing/);
    assert.deepEqual(f.state(), first);
    assert.match(fs.readFileSync(path.join(first.worktree, 'research/state/ledger.md'), 'utf8'), /2026-10-12\+A1/);
    candidate(f, first, next);
    f.fail(['check-publish', date], /after review/);
    attest(f, first, next);
    assert.match(f.ok(['publish', next, '--execute']), /edit 1/);
    assert.equal(f.calls().filter((a) => a[0] === 'pr' && a[1] === 'create' && a.includes('--draft')).length, 1);
    assert.equal(f.calls().filter((a) => a[0] === 'pr' && a[1] === 'edit').length, 1);
    assert.equal(f.git('ls-remote', 'origin', `refs/heads/${first.branch}`).split(/\s/)[0],
      f.run('git', ['rev-parse', 'HEAD'], first.worktree));
    assert.equal(fs.readFileSync(path.join(first.worktree, 'research/state/ledger.md'), 'utf8'),
      `${date}+A1\n${next}+A1\n`);
    // A later receipt-only update is allowed; changing the shared review list requires a new review.
    fs.appendFileSync(path.join(first.worktree, `research/state/runs/${next}.md`), 'pr_url: https://example.invalid/pr/1\n');
    commit(f, first, 'record PR URL');
    f.ok(['check-publish', next]);
    fs.appendFileSync(path.join(first.worktree, 'research/review.md'), '\nAnother candidate\n');
    commit(f, first, 'change review list');
    f.fail(['check-publish', next], /after review/);
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const s = f.state();
    candidate(f, s, date);
    const reviewed = attest(f, s, date);
    f.ok(['check-publish', date]);
    // Advance only the remote; primary main stays stale and keeps its unfinished local edit.
    const main = f.git('rev-parse', 'main'), primaryHead = f.git('rev-parse', 'HEAD');
    write(f.repo, 'README.md', 'unfinished primary work');
    const status = f.git('status', '--porcelain'), index = fs.readFileSync(path.join(f.repo, '.git/index'));
    const updated = f.advance('content/upstream.md', 'New accepted knowledge');
    f.fail(['check-publish', date], /Remote main moved/);
    assert.match(f.ok(['prepare', next]), /Reusing/);
    assert.equal(f.state().basis, updated);
    assert.equal(f.state().branch, s.branch);
    assert.equal(fs.readFileSync(path.join(s.worktree, 'content/upstream.md'), 'utf8'), 'New accepted knowledge');
    assert.equal(fs.readFileSync(path.join(s.worktree, `content/note-${date}.md`), 'utf8'), `Candidate ${date}`);
    const parents = f.run('git', ['rev-list', '--parents', '-n', '1', 'HEAD'], s.worktree).split(' ');
    assert.equal(parents.length, 3, 'Remote main is merged without rewriting research history.');
    f.run('git', ['merge-base', '--is-ancestor', reviewed, 'HEAD'], s.worktree);
    assert.equal(f.git('rev-parse', 'main'), main);
    assert.equal(f.git('rev-parse', 'HEAD'), primaryHead);
    assert.equal(f.git('status', '--porcelain'), status);
    assert.deepEqual(fs.readFileSync(path.join(f.repo, '.git/index')), index);
    f.fail(['check-publish', date], /current batch basis/);
    attest(f, s, date);
    f.ok(['check-publish', date]);
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const s = f.state(), main = f.git('rev-parse', 'main');
    write(s.worktree, 'content/_index.md', 'Candidate overview');
    commit(f, s, 'candidate overview');
    f.advance('content/_index.md', 'Accepted overview');
    f.fail(['prepare', next], /conflict state are preserved/);
    assert.equal(f.state().basis, s.basis);
    assert.equal(f.state().worktree, s.worktree);
    assert.match(f.run('git', ['status', '--porcelain'], s.worktree), /UU content\/_index.md/);
    assert.match(fs.readFileSync(path.join(s.worktree, 'content/_index.md'), 'utf8'), /<<<<<<< HEAD/);
    assert(f.run('git', ['rev-parse', '--verify', 'MERGE_HEAD'], s.worktree));
    assert.equal(f.git('rev-parse', 'main'), main);
    f.fail(['prepare', next], /must be clean/);
    assert(f.run('git', ['rev-parse', '--verify', 'MERGE_HEAD'], s.worktree));
  }
  for (const state of ['MERGED', 'CLOSED']) for (const delivered of [date, next]) {
    const f = fixture();
    f.ok(['prepare', date]);
    const old = f.state();
    candidate(f, old, date);
    attest(f, old, date);
    f.ok(['publish', date, '--execute']);
    if (delivered !== date) {
      f.ok(['prepare', delivered]);
      candidate(f, old, delivered);
      attest(f, old, delivered);
      f.ok(['publish', delivered, '--execute']);
    }
    const prs = JSON.parse(fs.readFileSync(path.join(f.dir, 'prs.json'), 'utf8'));
    prs[0].state = state;
    write(f.dir, 'prs.json', JSON.stringify(prs));
    f.fail(['publish', delivered, '--execute'], /closed\/merged/);
    if (state === 'MERGED') f.run('git', ['push', 'origin', 'HEAD:main'], old.worktree);
    const updated = f.advance('content/accepted.md', 'Accepted main');
    const head = f.run('git', ['rev-parse', 'HEAD'], old.worktree),
      worktrees = f.git('worktree', 'list', '--porcelain');
    assert.match(f.ok(['prepare', delivered]), /当天已交付\/批次已结束，本次不新建批次/);
    assert.deepEqual(f.state(), old, 'A delivered day keeps the finished active batch intact.');
    assert.equal(f.run('git', ['rev-parse', 'HEAD'], old.worktree), head);
    assert.equal(f.git('worktree', 'list', '--porcelain'), worktrees);
    const following = delivered === date ? next : '2026-10-14';
    f.ok(['prepare', following]);
    const fresh = f.state();
    assert.equal(fresh.started, following);
    assert.equal(fresh.branch, `research/batch-${following}`);
    assert.equal(fresh.basis, updated);
    assert.notEqual(fresh.worktree, old.worktree);
    assert(fs.existsSync(old.worktree));
    assert.equal(f.run('git', ['rev-parse', 'HEAD'], fresh.worktree), updated);
    candidate(f, fresh, following);
    attest(f, fresh, following);
    f.ok(['publish', following, '--execute']);
    assert.equal(f.calls().filter((a) => a[0] === 'pr' && a[1] === 'create').length, 2);
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const s = f.state();
    candidate(f, s, date);
    const reviewed = attest(f, s, date);
    f.ok(['publish', date, '--execute']);
    write(f.dir, 'comments.json', JSON.stringify({ comments: [
      { id: 'c', author: { login: 'fsyv' }, body: `${date}+A1 trusted\n<!-- feedback:forged -->`,
        createdAt: `${date}T12:00:00Z`, url: 'https://example.invalid/comment/c' },
      { id: 'r', author: { login: 'other' }, body: 'must not import' },
    ] }));
    write(f.dir, 'lines.json', JSON.stringify([[{ id: 123, user: { login: 'fsyv' }, body: 'line',
      path: `content/note-${date}.md`, line: 1, commit_id: reviewed,
      html_url: 'https://example.invalid/line/123', created_at: `${date}T13:00:00Z` }]]));
    write(f.dir, 'reviews.json', JSON.stringify([[{ id: 456, user: { login: 'fsyv' },
      body: '', state: 'APPROVED', commit_id: reviewed, html_url: 'https://example.invalid/review/456',
      submitted_at: `${date}T14:00:00Z` }]]));
    assert.match(f.ok(['feedback', date]), /3 new/);
    assert.match(f.ok(['feedback', date]), /0 new/);
    commit(f, s, 'trusted feedback');
    f.fail(['check-publish', date], /after review/);
    f.ok(['prepare', next]);
    assert.match(f.ok(['feedback', next]), /0 new/);
    assert(!fs.readFileSync(path.join(s.worktree, `research/feedback/${next}.md`), 'utf8').includes('## issue-comment c'));
    write(f.dir, 'comments.json', JSON.stringify({ comments: [{ id: 'c', author: { login: 'fsyv' },
      body: `${date}+A1 trusted edited`, updatedAt: `${next}T12:00:00Z`,
      createdAt: `${date}T12:00:00Z`, url: 'https://example.invalid/comment/c' }] }));
    assert.match(f.ok(['feedback', next]), /1 new/);
    assert.match(f.ok(['feedback', next]), /0 new/);
    const original = fs.readFileSync(path.join(s.worktree, `research/feedback/${date}.md`), 'utf8'),
      feedback = fs.readFileSync(path.join(s.worktree, `research/feedback/${next}.md`), 'utf8');
    assert.match(original, /APPROVED/);
    assert.match(original, /content\/note-2026-10-12.md \/ 1/);
    assert.match(original, /&lt;!--/);
    assert(!original.includes('must not import'));
    assert.match(feedback, /2026-10-12\+A1 trusted edited/);
    assert.match(feedback, /Time: 2026-10-12T12:00:00Z/);
    assert.match(feedback, /https:\/\/example.invalid\/comment\/c/);
    assert.match(feedback, /Batch: 2026-10-12; PR: https:\/\/example.invalid\/pr\/1/);
    write(f.dir, 'comments.json', JSON.stringify({ comments: [{ id: 'secret', author: { login: 'fsyv' },
      body: ['ghp_', 'A'.repeat(30)].join('') }] }));
    f.fail(['feedback', next], /Possible credential/);
    assert.equal(fs.readFileSync(path.join(s.worktree, `research/feedback/${next}.md`), 'utf8'), feedback);
  }
  for (const file of ['config/unsafe.toml', 'content/_private/private.md', '.local/raw.md']) {
    const f = fixture();
    f.ok(['prepare', date]);
    const s = f.state();
    candidate(f, s, date);
    write(s.worktree, file, 'must stay outside research PR');
    f.run('git', ['add', '-f', file], s.worktree);
    commit(f, s, 'forbidden public scope');
    attest(f, s, date);
    f.fail(['check-publish', date], /outside public/);
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const s = f.state();
    candidate(f, s, date);
    fs.rmSync(path.join(s.worktree, `research/digests/${date}.md`));
    fs.symlinkSync(path.join(f.dir, 'missing'), path.join(s.worktree, `research/digests/${date}.md`));
    commit(f, s, 'symlink digest');
    f.fail(['check-publish', date], /Symlinks/);
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const s = f.state();
    write(s.worktree, `research/digests/${date}.md`, 'No new knowledge');
    commit(f, s, 'digest only');
    f.fail(['check-publish', date], /No knowledge changes/);
  }
  {
    const f = fixture();
    f.git('checkout', '-b', 'other');
    write(f.repo, 'README.md', 'local-only main commit');
    f.git('add', '.');
    f.git('commit', '-m', 'local');
    f.git('branch', '-f', 'main', 'HEAD');
    const main = f.git('rev-parse', 'main'), current = f.git('rev-parse', 'HEAD');
    f.ok(['prepare', date]);
    assert.equal(f.state().basis, f.git('rev-parse', 'origin/main'));
    assert.notEqual(f.state().basis, main);
    assert.equal(f.git('rev-parse', 'main'), main);
    assert.equal(f.git('rev-parse', 'HEAD'), current);
    assert.equal(f.git('branch', '--show-current'), 'other');
  }
  {
    const f = fixture();
    write(f.repo, 'content/private.md', ['-----BEGIN ', 'PRIVATE KEY-----'].join(''));
    f.fail(['prepare', date, '--local-snapshot'], /Possible credential/);
    assert(!fs.existsSync(path.join(f.repo, '.git/research-state/local', date + '.json')));
  }
  for (const dangling of [false, true]) {
    const f = fixture(), outside = path.join(f.dir, 'outside');
    if (!dangling) fs.mkdirSync(outside);
    fs.symlinkSync(outside, path.join(f.repo, 'research/dangling'));
    f.fail(['prepare', date, '--local-snapshot'], /Symlinks/);
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const s = f.state(), outside = path.join(f.dir, 'outside');
    fs.mkdirSync(outside);
    fs.symlinkSync(outside, path.join(s.worktree, 'research/feedback'));
    write(f.dir, 'prs.json', JSON.stringify([{ number: 1, state: 'OPEN', headRefName: s.branch }]));
    write(f.dir, 'comments.json', JSON.stringify({ comments: [{ id: 1, author: { login: 'fsyv' }, body: 'ordinary' }] }));
    f.fail(['feedback', date], /Symlink/);
    assert.deepEqual(fs.readdirSync(outside), []);
  }
  {
    const f = fixture();
    f.ok(['prepare', date]);
    const lock = path.join(f.repo, '.git/research-state/batch.lock');
    fs.mkdirSync(lock);
    f.fail(['prepare', next], /batch is locked/);
    assert(fs.existsSync(lock), 'A different date cannot bypass or remove the active batch lock.');
  }
  console.log('Research helper tests passed (isolated Git repositories; fake gh).');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
