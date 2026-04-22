import { useState } from "react";
import "./App.css";
import { marked } from "marked";

type Note = {
  id: number;
  title: string;
  content: string;
};

const notes: Note[] = [
  {
    id: 1,
    title: "React Basics",
    content: "# React Basics\n\nLearn components, props, and state management.",
  },
  {
    id: 2,
    title: "TypeScript Notes",
    content:
      "## TypeScript Notes\n\nUnderstand **types**, interfaces, and type safety.",
  },
  {
    id: 3,
    title: "Markdown Ideas",
    content: "### Markdown Ideas\n\n- headings\n- lists\n- preview content",
  },
];

export default function App() {
  const [readyNotes, setNotes] = useState(notes);
  const [activeNoteId, setActiveNoteId] = useState(notes[0].id);

  const activeNote = notes.find((note) => note.id === activeNoteId);

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value;

    setNotes(
      readyNotes.map((note) => {
        if (note.id === activeNoteId) {
          return {
            ...note,
            title: newTitle,
          };
        }

        return note;
      }),
    );
  }

  function handleContenChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newContent = event.target.value;

    setNotes(
      readyNotes.map((note) => {
        if (note.id === activeNoteId) {
          return {
            ...note,
            content: newContent,
          };
        }
        return note;
      }),
    );
  }

  function handleCreateNote() {
    const nextId = Math.max(...notes.map((note) => note.id), 0) + 1;
    const newNote: Note = {
      id: nextId,
      title: "Untitled Note",
      content: "",
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  }

  const previewHtml = marked(activeNote?.content || "");

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="section-title">Notes</h2>
        <div className="notes-list">
          <button className="new-note-button" onClick={handleCreateNote}>
            + New Note
          </button>

          {notes.map((note) => {
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
          })}
        </div>
      </aside>

      <main className="editor">
        <h2 className="section-title">Editor</h2>
        <div className="section-box">
          <input
            className="note-input"
            type="text"
            value={activeNote?.title || ""}
            onChange={handleTitleChange}
          />
          <textarea
            className="note-textarea"
            value={activeNote?.content || ""}
            onChange={handleContenChange}
          />
        </div>
      </main>

      <section className="preview">
        <h2 className="section-title">Preview</h2>
        <div
          className="section-box preview-content"
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      </section>
    </div>
  );
}
