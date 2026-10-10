# PICK & POST PRO — publishing

Permanent app URL: https://dylanficklefrenchie.github.io/pick-and-post-pro/
Repo: https://github.com/Dylanficklefrenchie/pick-and-post-pro (GitHub Pages, branch `main`, folder `/`)

## Publish changes in one step

After editing captions/images in a character project and running its `python3 build.py` (or let the script do it):

```
REBUILD_SOURCES=1 /workspace/pickpost-pages-tools/redeploy.sh "Describe the change"
```

This rebuilds this folder from the sources and pushes to `main`; GitHub Pages republishes in about a minute.
Without `REBUILD_SOURCES=1` it copies each project's existing `site/` as-is. Add `--no-push` to build and check locally only.

Sources copied:
- `index.html`, `characters.json` ← `/workspace/pickpost-app-preview/` (the swipe picker)
- `pages/winston` ← `/workspace/pickpost-lifequotes/site`
- `pages/poppy` ← `/workspace/pickpost-lifequotes-poppy/site`
- `pages/zorro` ← `/workspace/pickpost-lifequotes-zorro/site`
- `pages/penelope` ← `/workspace/pickpost-lifequotes-penelope/site`
- `pages/reginald` ← `/workspace/pickpost-lifequotes-reginald/site`
- `pages/wheelie` ← `/workspace/pickpost-lifequotes-wheelie/site`
- `welcome/index.html` ← `/workspace/pickpost-welcome-preview/index.html` (Page 1 welcome / first-time setup PREVIEW; the root `index.html` is still the picker)

## Add a character

1. Build its page as `/workspace/<project>/site/`.
2. Add one entry to `/workspace/pickpost-app-preview/characters.json`: `{"name": ..., "portrait": "pages/<key>/img/<file>.jpg", "page": "pages/<key>/"}`.
3. Add `[<key>]=<project>` to the `SRC` list in `/workspace/pickpost-pages-tools/redeploy.sh`, then run it.

The picker's count, arrows and swipe follow `characters.json` automatically.

All paths are relative, so the site works under the `/pick-and-post-pro/` subpath. `.nojekyll` makes Pages serve the files unchanged.
The script checks before publishing: no absolute paths, every portrait/page/image exists, and no .py/.log/.sh/.png files are included.
