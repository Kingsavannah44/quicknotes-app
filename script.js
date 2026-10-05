/* ── QuickNotes — script.js ──────────────────────────── */

// ── Element references ──────────────────────────────────
const noteForm      = document.querySelector('#note-form');
const noteInput     = document.querySelector('#note-input');
const noteCategory  = document.querySelector('#note-category');
const errorMessage  = document.querySelector('#error-message');
const searchInput   = document.querySelector('#search-input');
const notesList     = document.querySelector('#notes-list');
const noteCount     = document.querySelector('#note-count');
const clearAllBtn   = document.querySelector('#clear-all-btn');

// ── State ───────────────────────────────────────────────
// Each note: { id, text, category, createdAt }
let notes = [];

// ── Date formatting ─────────────────────────────────────
function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year:   'numeric',
    month:  'short',
    day:    'numeric',
    hour:   '2-digit',
    minute: '2-digit',
  });
}

// ── Count message ───────────────────────────────────────
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (notes.length === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
  clearAllBtn.style.display = notes.length > 0 ? 'inline-block' : 'none';
}

// ── Render ──────────────────────────────────────────────
function render() {
  // Clear the list safely (no innerHTML)
  while (notesList.firstChild) {
    notesList.removeChild(notesList.firstChild);
  }

  notes.forEach(note => {
    const li = document.createElement('li');
    li.className = `category-${note.category}`;
    li.dataset.id = note.id;

    // Header row: note text + delete button
    const header = document.createElement('div');
    header.className = 'note-header';

    const textSpan = document.createElement('span');
    textSpan.className = 'note-text';
    textSpan.textContent = note.text; // never innerHTML

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.setAttribute('aria-label', 'Delete note');
    deleteBtn.addEventListener('click', () => deleteNote(note.id));

    header.appendChild(textSpan);
    header.appendChild(deleteBtn);

    // Meta row: category label + date
    const meta = document.createElement('div');
    meta.className = 'note-meta';

    const categoryLabel = document.createElement('span');
    categoryLabel.className = 'note-category-label';
    categoryLabel.textContent = note.category;

    const dateSpan = document.createElement('span');
    dateSpan.className = 'note-date';
    dateSpan.textContent = formatDate(note.createdAt);

    meta.appendChild(categoryLabel);
    meta.appendChild(dateSpan);

    li.appendChild(header);
    li.appendChild(meta);
    notesList.appendChild(li);
  });

  updateCount();
}

// ── Add note ────────────────────────────────────────────
function addNote(text, category) {
  const note = {
    id:        Date.now().toString(),
    text:      text,
    category:  category,
    createdAt: new Date().toISOString(),
  };
  notes.unshift(note); // newest first
  render();
}

// ── Delete note ─────────────────────────────────────────
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  render();
}

// ── Clear All button (bonus) ────────────────────────────
clearAllBtn.addEventListener('click', () => {
  if (notes.length === 0) return;
  if (confirm('Delete all notes?')) {
    notes = [];
    render();
  }
});

// ── Form submission ─────────────────────────────────────
noteForm.addEventListener('submit', event => {
  event.preventDefault();

  const text     = noteInput.value.trim();
  const category = noteCategory.value;

  // Validation
  if (text.length === 0) {
    errorMessage.textContent = 'Please type a note first.';
    noteInput.focus();
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    noteInput.focus();
    return;
  }

  // Clear any previous error
  errorMessage.textContent = '';

  addNote(text, category);
  noteInput.value = '';
  noteInput.focus();
});

// ── Boot ────────────────────────────────────────────────
render();
