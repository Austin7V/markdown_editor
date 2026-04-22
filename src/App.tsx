import "./App.css";

export default function App() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="section-title">Notes</h2>
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
