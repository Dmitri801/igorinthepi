# OpenAI Images API Setup (Igor Avatar Generator)

## 1) Set API key

```bash
export OPENAI_API_KEY="<your_openai_api_key>"
```

To persist on this machine (bash):

```bash
echo 'export OPENAI_API_KEY="<your_openai_api_key>"' >> ~/.bashrc
source ~/.bashrc
```

## 2) Generate avatars

```bash
node scripts/gen-avatar.mjs --prompt "Cinematic portrait of Igor, super-intelligent gorilla, tech-noir, square avatar" --n 5 --size 1024x1024
```

Outputs are saved under:

- `outputs/avatars/`

## 3) Optional flags

- `--model gpt-image-1`
- `--quality high|medium|low`
- `--background auto|transparent|opaque`
- `--format png|jpeg|webp`
- `--out <dir>`

Example:

```bash
node scripts/gen-avatar.mjs --prompt "Minimalist geometric Igor gorilla logo, black + teal, no text" --n 4 --format png --out outputs/avatars/minimal
```
