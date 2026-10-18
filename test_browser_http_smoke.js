const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const path = require('node:path');
const fs = require('node:fs');
const root = __dirname;
const port = 32000 + (process.pid % 20000);
const child = spawn(process.execPath, ['server.js'], {
  cwd: root,
  env: { ...process.env, PORT: String(port), DATA_DIR: path.join(root, '.test-browser-smoke-data') },
  stdio: 'ignore'
});
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  try {
    let response;
    for (let i = 0; i < 40; i++) {
      try { response = await fetch(`http://127.0.0.1:${port}/`); break; }
      catch { await wait(100); }
    }
    assert.ok(response, 'server should start and answer HTTP');
    assert.equal(response.status, 200, 'main page returns HTTP 200');
    assert.match(response.headers.get('content-type') || '', /text\/html/i);
    const html = await response.text();
    assert.ok(html.length > 100_000, 'main game HTML is served in full');
    for (const id of ['advance', 'country', 'tier', 'group', 'cash', 'wages', 'week']) {
      assert.ok(html.includes(`id="${id}"`), `main page contains #${id}`);
    }
    assert.match(html, /<script[\s\S]*?\/script>/i, 'inline application script is present');
    const auth = await fetch(`http://127.0.0.1:${port}/web-auth.js`);
    assert.equal(auth.status, 200, 'web-auth.js is served');
    assert.match(auth.headers.get('content-type') || '', /javascript/i);
    const authJs = await auth.text();
    assert.ok(authJs.length > 100, 'web-auth.js response is non-empty');
    console.log('Browser HTTP smoke: PASS (page, core controls, and web-auth asset served).');
    console.log('Note: this is an HTTP/static smoke test, not proof of successful interactive browser rendering.');
  } catch (error) {
    console.error('Browser HTTP smoke: FAIL');
    console.error(error);
    process.exitCode = 1;
  } finally {
    child.kill('SIGTERM');
    try { fs.rmSync(path.join(root, '.test-browser-smoke-data'), { recursive: true, force: true }); } catch {}
  }
})();
