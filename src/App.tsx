import { useState } from "react";
import { marked } from "marked";
import "./App.css";
import type { Note } from "./types";

const notes: Note[] = [
  {
    id: 1,
    title: "React Basics",
    content: "# React Basics\n\nLearn components, props, and state management.",
    createdAt: "2026-04-22T10:00:00.000Z",
    updatedAt: "2026-04-22T10:00:00.000Z",
  },
  {
    id: 2,
    title: "TypeScript Notes",
    content:
      "## TypeScript Notes\n\nUnderstand **types**, interfaces, and type safety.",
    createdAt: "2026-04-22T10:00:00.000Z",
    updatedAt: "2026-04-22T10:00:00.000Z",
  },
  {
    id: 3,
    title: "Markdown Ideas",
    content: "### Markdown Ideas\n\n- headings\n- lists\n- preview content",
    createdAt: "2026-04-22T10:00:00.000Z",
    updatedAt: "2026-04-22T10:00:00.000Z",
  },
];

export default function App() {
  const [readyNotes, setNotes] = useState(notes);
  const [activeNoteId, setActiveNoteId] = useState<number | null>(notes[0].id);

  const [searchTerm, setSearchTerm] = useState("");

  const activeNote = notes.find((note) => note.id === activeNoteId);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value;
    const currentDate = new Date().toISOString();

    setNotes(
      readyNotes.map((note) => {
        if (note.id === activeNoteId) {
          return {
            ...note,
            title: newTitle,
            updatedAt: currentDate,
          };
        }

        return note;
      }),
    );
  }

  function handleContenChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newContent = event.target.value;
    const currentDate = new Date().toISOString();

    setNotes(
      readyNotes.map((note) => {
        if (note.id === activeNoteId) {
          return {
            ...note,
            content: newContent,
            updatedAt: currentDate,
          };
        }

        return note;
      }),
    );
  }

  function handleCreateNote() {
    const nextId = Math.max(...notes.map((note) => note.id), 0) + 1;
    const currentDate = new Date().toISOString();
    const newNote: Note = {
      id: nextId,
      title: "Untitled Note",
      content: "",
      createdAt: currentDate,
      updatedAt: currentDate,
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
    setSearchTerm("");
  }

  function handleDeleteNote() {
    if (activeNoteId === null) {
      return;
    }
    const updatedNotes = notes.filter((note) => note.id! === activeNoteId);
    setNotes(updatedNotes);
    if (updatedNotes.length > 0) {
      setActiveNoteId(updatedNotes[0].id);
    } else {
      setActiveNoteId(null);
    }
  }

  const normalizedSearchTerm = searchTerm.toLowerCase();
  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(normalizedSearchTerm) ||
      note.content.toLowerCase().includes(normalizedSearchTerm)
    );
  });

  const previewHtml = marked(activeNote?.content || "");
  const hasNoNotes = notes.length === 0;
  const hasNoSearchResults =
    filteredNotes.length === 0 && searchTerm.trim() !== "";
  const hasNoSelectedNote = !activeNote && notes.length > 0;

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="section-title">Notes</h2>
          <button className="new-note-button" onClick={handleCreateNote}>
            + New Note
          </button>
        </div>

        <label className="visually-hidden" htmlFor="search-notes">
          Search notes
        </label>
        <input
          id="search-notes"
          className="search-input"
          type="text"
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <div className="notes-list">
          {hasNoNotes ? (
            <div className="empty-message">
              No notes yet. Create your first note.
            </div>
          ) : hasNoSearchResults ? (
            <div className="empty-message">No notes match your search.</div>
          ) : (
            filteredNotes.map((note) => {
              const isActive = note.id === activeNoteId;

              return (
                <article
                  key={note.id}
                  className={isActive ? "note-card active" : "note-card"}
                  onClick={() => setActiveNoteId(note.id)}
                >
                  <h3 className="note-title">{note.title}</h3>
                  <p className="note-excerpt">
                    {note.content || "No content yet."}
                  </p>
                </article>
              );
            })
          )}
        </div>
      </aside>

      <main className="editor">
        <div className="editor-header">
          <h2 className="section-title">Editor</h2>
          <button
            className="delete-note-button"
            onClick={handleDeleteNote}
            disabled={activeNoteId === null}
          >
            Delete
          </button>
        </div>

        <div className="section-box">
          {hasNoNotes ? (
            <p>No notes available. Create a new note to start editing.</p>
          ) : hasNoSelectedNote ? (
            <p>No note selected.</p>
          ) : activeNote ? (
            <>
              <label className="visually-hidden" htmlFor="note-title">
                Note title
              </label>
              <input
                id="note-title"
                className="note-input"
                type="text"
                value={activeNote.title}
                onChange={handleTitleChange}
              />

              <label className="visually-hidden" htmlFor="note-content">
                Note content
              </label>
              <textarea
                id="note-content"
                className="note-textarea"
                value={activeNote.content}
                onChange={handleContenChange}
              />

              <p className="note-date">
                Last updated: {new Date(activeNote.updatedAt).toLocaleString()}
              </p>
            </>
          ) : null}
        </div>
      </main>

      <section className="preview">
        <h2 className="section-title">Preview</h2>
        <div className="section-box preview-content">
          {hasNoNotes ? (
            <p>No preview available because no notes exist yet.</p>
          ) : hasNoSelectedNote ? (
            <p>No preview available.</p>
          ) : activeNote ? (
            <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
          ) : null}
        </div>
      </section>
    </div>
  );
}
