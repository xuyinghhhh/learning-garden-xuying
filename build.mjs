import {readdir, readFile, mkdir, cp, writeFile} from 'node:fs/promises';
import {Marked} from './vendor/marked.mjs';
import {fileURLToPath} from 'node:url';
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const safe = href => !/^[\s\S]*[\u0000-\u001f]/.test(href) && !/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href) || /^https?:\/\//i.test(href);
const md = new Marked({renderer:{html({text}){return escape(text)},link({href,tokens}){const text=this.parser.parseInline(tokens);return safe(href)?`<a href="${escape(href)}" rel="noopener noreferrer">${text}</a>`:text},image({href,text}){return safe(href)?`<img src="${escape(href)}" alt="${escape(text)}" loading="lazy">`:escape(text)}}});
export function parseNote(source,id){const m=source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);if(!m)throw Error(`Invalid metadata: ${id}`);const meta=JSON.parse(m[1]);if(!meta.title||!/^\d{4}-\d{2}-\d{2}$/.test(meta.date))throw Error('Missing title/date');return {...meta,id,body:m[2],html:md.parse(m[2])};}
export async function build(){await mkdir('dist',{recursive:true});await cp('public','dist',{recursive:true});const notes=[];for(const name of await readdir('content/notes')){if(name.endsWith('.md')){const n=parseNote(await readFile(`content/notes/${name}`,'utf8'),name.slice(0,-3));if(!n.draft)notes.push(n)}}notes.sort((a,b)=>b.date.localeCompare(a.date));await writeFile('dist/notes.json',JSON.stringify(notes));console.log(`Built ${notes.length} published notes.`)}
if(process.argv[1]===fileURLToPath(import.meta.url))await build();
