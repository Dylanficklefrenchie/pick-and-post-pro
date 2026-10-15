# PICK & POST PRO — publishing

Permanent app URL: https://app.ficklefrenchiecoffeeclub.com/ (GitHub Pages custom domain; the old https://dylanficklefrenchie.github.io/pick-and-post-pro/… links 301-redirect here, keeping path and ?ref=)
Repo: https://github.com/Dylanficklefrenchie/pick-and-post-pro (GitHub Pages, branch `main`, folder `/`)

## Publish changes in one step

After editing captions/images in a character project and running its `python3 build.py` (or let the script do it):

```
REBUILD_SOURCES=1 /workspace/pickpost-pages-tools/redeploy.sh "Describe the change"
```

This rebuilds this folder from the sources and pushes to `main`; GitHub Pages republishes in about a minute.
Without `REBUILD_SOURCES=1` it copies each project's existing `site/` as-is. Add `--no-push` to build and commit locally only, or `--build-only` to build into `/workspace/pickpost-pages-staged` (no git at all) and preview with `cd /workspace/pickpost-pages-staged && python3 -m http.server 8765`.

Sources copied:
- `index.html`, `characters.json` ← `/workspace/pickpost-app-preview/` (the swipe picker)
- `pages/winston` ← `/workspace/pickpost-lifequotes/site`
- `pages/poppy` ← `/workspace/pickpost-lifequotes-poppy/site`
- `pages/zorro` ← `/workspace/pickpost-lifequotes-zorro/site`
- `pages/penelope` ← `/workspace/pickpost-lifequotes-penelope/site`
- `pages/reginald` ← `/workspace/pickpost-lifequotes-reginald/site`
- `pages/wheelie` ← `/workspace/pickpost-lifequotes-wheelie/site`
- `welcome/index.html` ← `/workspace/pickpost-welcome-preview/index.html` (older Page 1 preview, unchanged by the v3 rollout)
- THEME v3 LIVE (Dylan approved 10 Oct 2026 10:22 AM ET): `theme.css` + `fonts/` (Cinzel, EB Garamond, OFL) at the site root ← `/workspace/pickpost-theme/site/`; root `index.html` is the themed BRAND picker (no affiliate/referral step)
- AFFILIATE MODE LIVE (build approved 12:45 PM, wording approved by Dylan 1:00 PM ET, 10 Oct 2026): `affiliate/` ← `/workspace/pickpost-affiliate/` (Page 1 `index.html`, `picker/index.html`, `affiliate-config.js` = ALL affiliate wording, `affiliate-core.js`, `affiliate-mode.js/.css`). `affiliate/picker/characters.json` is generated from the root list; `affiliate/pages/<key>/` is generated from the built brand page (`<base href>` to `pages/<key>/` + the affiliate scripts), so captions have ONE source. Caption = `#ad` + brand caption + blank line + `Shop the Royal Court ☕ link in my bio`. Wheelie Roast hidden for affiliates (`showInPicker:false`).
- Welcome-email app link: `https://app.ficklefrenchiecoffeeclub.com/affiliate/?ref={{affiliate.ref_code}}` (old github.io link still redirects) (saves `https://ficklefrenchiecoffeeclub.com/?ref=CODE` automatically). Hidden reset: `/affiliate/?reset=1`.
- `affiliate-preview/…` = redirects only (retired preview; keeps `?ref=`). Previous non-affiliate-mode /affiliate/ sources: `/workspace/pickpost-affiliate.v1-pre-affiliate-mode/`.
- Brand app (root + `pages/<key>/`) never loads the affiliate files: no link, no #ad, no footer.
- `pages/theme-pages.css` ← `/workspace/pickpost-theme/pages/theme-pages.css` (character pages restyle: colours/fonts only; each template links `../theme-pages.css`)
- Revert copies: `/workspace/pickpost-theme/rollout/backup-pre-rollout-20261010-1030/` (pre-rollout sources, tests, redeploy.sh); live state before rollout = git commit 349839a
- `theme-preview/` ← `/workspace/pickpost-theme/site/` (branding PREVIEW: Page 2 picker at `theme-preview/`, Page 1 at `theme-preview/welcome/`; own `characters.json` with optional `title`, paths relative to `theme-preview/`; Open Sans self-hosted in `theme-preview/fonts/`, OFL)

## Tales From Bellamere Court (episode series) — STAGED 14 Oct 2026, not live until Dylan approves
- `/episodes/` (brand) and `/affiliate/episodes/` (affiliate, generated: same page + `<base>` + affiliate-config/core, so captions get `#ad` + the same footer) ← `/workspace/pickpost-episodes/site/`
- Add an episode: put the .mp4 (unaltered) and a cover .jpg in `site/media/`, append one entry to `site/episodes.json` (`number`, `title`, `video`, `cover`, `captions` [{`label`, `main`, `text`}]), run the script. The build checks the video is byte-identical (sha256).
- 14 Oct 2026 (Dylan approved): episode page has a one-tap POST THIS VIDEO button (loads the video, copies Caption 1, opens the phone share sheet like the image pages; falls back to a normal download). Captions capped at Instagram's 5 hashtags; affiliates get #ad + the first 4 (`limitTags` in episodes.js). Edited directly in this repo — the /workspace sources are out of date, do not run redeploy.sh over it.
- Both pickers show one "📖 Tales From Bellamere Court ›" link under the Choose button.

## Add a character

1. Build its page as `/workspace/<project>/site/`.
2. Add one entry to `/workspace/pickpost-app-preview/characters.json`: `{"name": ..., "portrait": "pages/<key>/img/<file>.jpg", "page": "pages/<key>/"}`.
3. Add `[<key>]=<project>` to the `SRC` list in `/workspace/pickpost-pages-tools/redeploy.sh`, then run it.

The picker's count, arrows and swipe follow `characters.json` automatically.

All paths are relative, so the site works at the domain root and under any subpath. The build writes `CNAME` (app.ficklefrenchiecoffeeclub.com) so a publish never drops the custom domain. No manifest or service worker exists (none to update). `.nojekyll` makes Pages serve the files unchanged.
The script checks before publishing: no absolute paths, every portrait/page/image exists, and no .py/.log/.sh/.png files are included.
