# Araby Mobile Studio — Landing Page

Official landing page for **arabymobile.com** — a premium mobile-focused digital studio that creates Android apps, mobile wallpapers, Samsung themes, icon packs, and HTML5 games.

---

## What Is This

A fully static, professional landing page built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build tools, no backend. Deploys directly to GitHub Pages.

---

## Files Included

| File | Purpose |
|------|---------|
| `index.html` | Main page structure and content |
| `style.css` | All styles — colors, layout, animations, responsive |
| `script.js` | Navbar, scroll animations, mobile menu, form alert, counters |
| `README.md` | This file |
| `CNAME` | Custom domain binding (add when ready) |

---

## How to Deploy on GitHub Pages

### Option A — New Repository

1. Create a new GitHub repository (e.g. `arabymobile-landing`)
2. Upload all files to the `main` branch
3. Go to **Settings → Pages**
4. Under **Source**, select `Deploy from a branch`
5. Select branch `main` and folder `/` (root)
6. Click **Save**
7. Your site will be live at `https://yourusername.github.io/arabymobile-landing`

### Option B — Custom Domain (arabymobile.com)

1. Create a file named `CNAME` in the root of your repo with content:
   ```
   arabymobile.com
   ```
2. Add these DNS records at your domain registrar:

   | Type | Host | Value |
   |------|------|-------|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | yourusername.github.io |

3. In GitHub Pages settings, enter `arabymobile.com` as the custom domain
4. Enable **Enforce HTTPS** after DNS propagates (~30 min)

---

## How to Edit Text

Open `index.html` and find the section you want to edit. All content is clearly labeled with HTML comments like:

```html
<!-- ── HERO SECTION ── -->
<!-- ── PRODUCTS SECTION ── -->
<!-- ── CONTACT SECTION ── -->
```

Use `Ctrl+F` / `Cmd+F` to search for any text and replace it directly.

---

## How to Edit Colors

Open `style.css` and find the `:root` block at the top (~line 10):

```css
:root {
  --bg:          #070B14;   /* Main background */
  --bg-2:        #101827;   /* Secondary background */
  --bg-card:     #0D1625;   /* Card background */
  --cyan:        #00D4FF;   /* Primary accent (cyan) */
  --gold:        #F4B942;   /* Gold accent */
  --text:        #FFFFFF;   /* Main text */
  --text-muted:  #A7B0C0;   /* Muted text */
  --border:      rgba(255,255,255,0.09); /* Card borders */
}
```

Change any value to retheme the entire site instantly.

---

## How to Edit the Contact Email

1. In `index.html`, find:
   ```html
   contact@arabymobile.com
   ```
   Replace with your actual email in all places.

2. In `script.js`, find:
   ```js
   alert(`Thank you, ${name}!\n\nPlease contact us directly at:\ncontact@arabymobile.com`);
   ```
   Replace with your actual email.

---

## How to Add a Real Contact Form

The form currently shows a JS alert (no backend on GitHub Pages).

To add a real form, replace the submit handler in `script.js` with one of these:

### Formspree (free)
```js
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json' },
  body: new FormData(form),
});
```

### EmailJS (free tier)
Follow: https://www.emailjs.com/docs/

---

## How to Add Analytics

In `index.html`, find the analytics placeholder comment block in `<head>` and replace it with your analytics script:

```html
<!-- Cloudflare Web Analytics -->
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
  data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

---

## How to Add a Favicon

1. Generate your favicon at: https://realfavicongenerator.net
2. Add the files to your repo root
3. In `index.html`, find the favicon comment block and uncomment those lines

---

## How to Add Portfolio Images

In `index.html`, find the portfolio section. Each card has a `.portfolio-preview` div. Replace the CSS placeholder art with a real image:

```html
<div class="portfolio-preview">
  <img src="images/your-image.jpg" alt="Project name" style="width:100%;height:100%;object-fit:cover;" />
</div>
```

---

## Tech Stack

- **HTML5** — semantic markup
- **CSS3** — custom properties, Grid, Flexbox, animations
- **Vanilla JS** — IntersectionObserver, scroll events, form handling
- **Google Fonts** — Inter + Poppins
- **No dependencies** — zero npm, zero build step

---

## License

© 2026 Araby Mobile Studio. All rights reserved.
