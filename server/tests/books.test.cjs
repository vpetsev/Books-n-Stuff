const test = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../app');

async function withServer(Books, run) {
    const server = createApp({ Books }).listen(0, '127.0.0.1');
    await new Promise(resolve => server.once('listening', resolve));
    const post = (route, data) => fetch(`http://127.0.0.1:${server.address().port}/${route}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), signal: AbortSignal.timeout(1000)
    });
    try { await run(post); } finally { await new Promise(resolve => server.close(resolve)); }
}

test('add and update return responses after successful persistence', async () => {
    const stored = [];
    await withServer({
        create: async data => { stored.push(data); return { id: 7, ...data }; },
        update: async data => { stored[0] = data; return [1]; }
    }, async post => {
        const created = await post('add-book', { title: 'First', author: 'Writer' });
        assert.equal(created.status, 201);
        assert.equal((await created.json()).id, 7);
        assert.equal(stored[0].publisher, 'Writer');
        const updated = await post('update-book', { id: 7, title: 'Revised' });
        assert.equal(updated.status, 200);
        assert.deepEqual(await updated.json(), { updated: 1 });
        assert.equal(stored[0].title, 'Revised');
    });
});

test('database rejection returns an error instead of hanging', async () => {
    await withServer({ create: async () => { throw new Error('database unavailable'); } }, async post => {
        const response = await post('add-book', { title: 'First' });
        assert.equal(response.status, 500);
        assert.ok((await response.json()).error);
    });
});
