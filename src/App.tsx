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
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="section-title">Notes</h2>

        <div className="notes-list">
          {notes.map((note) => (
            <article key={note.id} className="note-card">
              <h3 className="note-Title">{note.title}</h3>
              <p className="note-excerpt">{note.content}</p>
            </article>
          ))}
        </div>

        <div className="section-box">
          <p>Notes list will appear here.</p>
        </div>
      </aside>

      <main className="editor">
        <h2 className="section-title">Editor</h2>
        <div className="section-box">
          <p>Selected note content will apppear herre.</p>
        </div>
      </main>

      <section className="preview">
        <h2 className="section-title">Preview</h2>
        <div className="section-box">
          <p>Markdown preview will appear here.</p>
        </div>
      </section>
    </div>
  );
}
