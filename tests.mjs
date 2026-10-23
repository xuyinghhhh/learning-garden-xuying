import assert from 'node:assert/strict';
import {parseNote,build} from './build.mjs';
import {readFile,writeFile,unlink} from 'node:fs/promises';
const parse=body=>parseNote('---\n{"title":"测试","date":"2026-10-23"}\n---\n'+body,'test');
assert.match(parse('| A | B |\n|---|---|\n|甲|乙|').html,/<table>/);
assert.doesNotMatch(parse('<script>alert(1)</script>').html,/<script>/);
assert.doesNotMatch(parse('[x](javascript:alert%281%29)').html,/href=/);
assert.match(parse('![图片](uploads/a.png)').html,/src="uploads\/a.png"/);
await writeFile('content/notes/test-draft.md','---\n{"title":"不公开","date":"2026-10-23","draft":true}\n---\n秘密');
try{await build();assert.ok(!JSON.parse(await readFile('dist/notes.json')).some(n=>n.id==='test-draft'));}finally{await unlink('content/notes/test-draft.md')}
console.log('PASS: table, HTML escaping, unsafe links, image, draft exclusion');
