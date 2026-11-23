# Personal portfolio

One-page portfolio for **Lucas Mirija Razafimanantsoa**, built from `prompt.md` with a night-sky and lantern-glow direction.

Static HTML, CSS and two small JavaScript files. No framework, no build step, no runtime dependencies.

## Preview

From this folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

The page uses a canvas star field in the hero, frosted-glass panels, self-hosted fonts and a local portrait. It works without JavaScript; the copy-email buttons fall back to the mail links and the hero keeps its night gradient, with the canvas simply left blank.

## Files

```text
index.html              the page
404.html                matching not-found page
css/style.css           palette, glass, layout and responsive rules
js/sky.js               hero star field, 30fps cap, reduced-motion aware
js/main.js              copy-email buttons with clipboard fallback
assets/self.jpg         portrait, 1000x1250
assets/self-600.jpg     smaller portrait for mobile and small screens
assets/fonts/           STIX Two Text + IBM Plex Sans, self-hosted
assets/favicon.svg      star/lantern mark
resume.pdf              download target for the hero CTA
netlify.toml            publish config, security headers and caching
robots.txt
```

`prompt.md` and the original `self.jpeg` are local source material and are ignored by Git. The optimised portrait used by the page is `assets/self.jpg`.

## Design notes

- **Palette:** `#0B1226` night base, `#16244A` starlit navy, `#E8A24B` lantern glow, `#F2C57C` warming amber, `#EAF0FA` moonlit text, `#8DA2C0` misty slate.
- **Type:** STIX Two Text for display and mathematical emphasis, IBM Plex Sans for body and UI. Both are self-hosted, so no requests go to Google Fonts at runtime.
- **Glass:** surfaces use low-opacity navy gradients, gold-tinted borders and `backdrop-filter`. Hierarchy changes through blur, border strength and panel size, not one repeated card style.
- **Motion:** the star canvas is the ambient moment; the portrait has one slow lantern breathing pulse; only the in-progress project status has an ember pulse. `prefers-reduced-motion` draws a static sky and stops all animation.
- **Contact:** both email addresses are copyable. The phone number uses tabular figures.

## Before publishing

- [ ] **Reconcile the education history.** `prompt.md` says “BSc. in Fundamental Mathematics, Université d’Antananarivo (2023–2024)”. The current `resume.pdf` instead lists “BSc. in Mathematics and Structures, University of Antananarivo, 2019–2022”. The page follows `prompt.md`. Update the resume or the page before sharing both together.
- [ ] **Update the resume’s work section.** The current PDF lists private mathematics tutoring but not the current ICT Teacher role at Vision Valley School. The portfolio presents the teaching role as current.
- [ ] Confirm the “I teach ICT at a primary school” line and the Vision Valley School description.
- [ ] Add a canonical URL, `og:url` and an `og:image` once the domain is known. There is a comment in `index.html` marking the spot.
- [ ] Decide whether the Report Filler side of the classroom platform should be described publicly.
- [ ] Test the page on a phone and with a keyboard.
- [ ] Check the resume download opens the intended file.

## Deploy to Netlify

Not deployed yet.

1. Push this folder to a Git repository.
2. In Netlify, choose **Add new project → Import an existing project**.
3. Netlify reads `netlify.toml`; leave the build command empty and keep the publish directory as `.`.
4. Deploy.

Every push to the production branch redeploys. Dragging the folder onto <https://app.netlify.com/drop> also works, but Git is cleaner because ignored source files stay out of the deploy.

## Notes

- STIX Two Text and IBM Plex Sans are licensed under the SIL Open Font License.
- The canvas is confined to the hero. It caps device pixel ratio at 2, redraws at roughly 30fps, pauses when the tab is hidden and stops when the hero scrolls out of view.
- The portrait was cropped from `self.jpeg` to a 4:5 frame and compressed for the web.
