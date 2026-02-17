#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

function arg(name, fallback = null) {
  const i = process.argv.indexOf(name);
  if (i >= 0 && i + 1 < process.argv.length) return process.argv[i + 1];
  return fallback;
}

function has(name) {
  return process.argv.includes(name);
}

async function main() {
  const prompt = arg('--prompt') || process.argv.slice(2).filter((x) => !x.startsWith('--')).join(' ').trim();
  if (!prompt) {
    console.error('Usage: node scripts/gen-avatar.mjs --prompt "..." [--n 5] [--size 1024x1024] [--out outputs/avatars] [--model gpt-image-1]');
    process.exit(1);
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Missing OPENAI_API_KEY environment variable.');
    process.exit(1);
  }

  const n = Number(arg('--n', '1'));
  const size = arg('--size', '1024x1024');
  const outDir = arg('--out', 'outputs/avatars');
  const model = arg('--model', 'gpt-image-1');
  const quality = arg('--quality', 'high');
  const background = arg('--background', 'auto');
  const format = arg('--format', 'png');

  await fs.mkdir(outDir, { recursive: true });

  const body = {
    model,
    prompt,
    size,
    n,
    quality,
    background,
    output_format: format
  };

  const res = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`OpenAI Images API error: ${res.status} ${text}`);
    process.exit(1);
  }

  const json = await res.json();
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');

  if (!Array.isArray(json.data) || json.data.length === 0) {
    console.error('No images returned.');
    process.exit(1);
  }

  const paths = [];
  for (let i = 0; i < json.data.length; i++) {
    const item = json.data[i];
    if (!item.b64_json) continue;
    const buf = Buffer.from(item.b64_json, 'base64');
    const file = path.join(outDir, `igor-avatar-${stamp}-${String(i + 1).padStart(2, '0')}.${format}`);
    await fs.writeFile(file, buf);
    paths.push(file);
  }

  if (has('--print-revised') && json.data?.[0]?.revised_prompt) {
    console.log('Revised prompt:', json.data[0].revised_prompt);
  }

  console.log('Generated files:');
  for (const p of paths) console.log(p);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
