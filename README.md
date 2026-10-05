# QuickNotes

QuickNotes is a lightweight, browser-based note-taking app that lets you capture, categorise, and search your thoughts instantly — no account or internet connection required. Notes are saved directly in your browser's localStorage so they survive page refreshes and are always there when you come back.

## Features

- **Add notes** with a title-free text input and choose a category (Personal, Work, or Study)
- **Category colour coding** — each category has a distinct left-border accent and pill label
- **Validation** — empty notes and notes over 200 characters are rejected with a clear error message
- **Delete** individual notes with a single click
- **Clear All** — wipe every note at once after a confirmation prompt
- **Live search** — filter notes in real time as you type; shows a friendly message when nothing matches
- **Accurate note count** — "no notes yet", "1 note", or "N notes" phrasing
- **Persistent storage** — notes are saved to and loaded from `localStorage` automatically
- **Responsive layout** — form controls stack vertically on screens 600 px or narrower

## How to Run Locally

No build step is needed — it's plain HTML, CSS, and JavaScript.

1. Clone or download the repository:
   ```bash
   git clone https://github.com/<your-username>/quicknotes-app.git
   ```
2. Open the `quicknotes-app` folder.
3. Double-click `index.html`, or right-click it and choose **Open with → your browser**.

That's it. The app runs entirely in the browser.

## What I Learned

- **DOM manipulation without `innerHTML`** — building every note card with `createElement` and `textContent` keeps user-supplied text from being parsed as HTML, which prevents XSS vulnerabilities.
- **`localStorage` with JSON serialisation** — using `JSON.stringify` to save and `JSON.parse` to restore an array of objects means complex state persists across sessions with almost no extra code.
- **Flexbox for responsive forms** — wrapping form controls in a `display: flex; flex-wrap: wrap` container lets them sit side-by-side on wide screens and stack gracefully on narrow ones without a separate layout system.
- **Live filtering without a library** — listening to the `input` event on the search box and re-running `render()` each time gives instant, smooth filtering using only vanilla JavaScript.
- **Accessible markup habits** — pairing every `<input>` with a `<label for="">`, adding `aria-live` regions for dynamic content, and writing descriptive `aria-label` attributes on icon-only buttons make the app usable with screen readers from day one.
