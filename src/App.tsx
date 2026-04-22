import { useState } from "react";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const notes: Note[] = [
  {
    id: 1,
    title: "React Basics",
    content: "Learn components, props, and state management",
  },
  {
    id: 2,
    title: "TypeScript Notes",
    content: "Understand types, interfaces and type safety",
  },
  {
    id: 3,
    title: "Markdown Ideas",
    content: "Test headings, lists and formatted preview content",
  },
];

export default function App() {
  const [activeNoteId, setActiveNoteId] = useState(notes[0].id);

  const activeNote = notes.find((note) => note.id === activeNoteId);

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="section-title">Notes</h2>

        <div className="notes-list">
          {notes.map((note) => {
            const isActive = note.id === activeNoteId;

            return (
              <article
                key={note.id}
                className={isActive ? "note-card active" : "note-card"}
                onClick={() => setActiveNoteId(note.id)}
              >
                <h3 className="note-title">{note.title}</h3>
                <p className="note-excerpt">{note.content}</p>
              </article>
            );
          })}
        </div>
      </aside>

      <main className="editor">
        <h2 className="section-title">Editor</h2>
        <div className="section-box">
          <h3 className="content-title">{activeNote?.title}</h3>
          <p>{activeNote?.content}</p>
        </div>
      </main>

      <section className="preview">
        <h2 className="section-title">Preview</h2>
        <div className="section-box">
          <h3 className="content-title">{activeNote?.title}</h3>
          <p>{activeNote?.content}</p>
        </div>
      </section>
    </div>
  );
}
