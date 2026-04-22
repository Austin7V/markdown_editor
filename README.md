# Side Project: Markdown Editor

In this project, you'll create a Markdown editor that allows users to add, edit, and delete notes. Users can search their notes by title or content. Finally you can collaborate on notes with other users.

## Basic Features

- **List of Notes:** A sidebar or dashboard view displaying all saved markdown files, showing their titles and a brief text excerpt. The list should be sorted by most recently modified.
- **Edit Note / Live Preview:** A dual-pane or toggleable view where raw markdown input in a text area is instantly rendered into formatted HTML on the screen.
- **Create Note:** An action to add a new note to the database, automatically entering the edit view for the new note.
- **Delete Note:** An action to permanently remove a note from the database, automatically updating the UI to reflect the change.
- **Search Notes:** A search bar that filters the list of notes by matching keywords against both the titles and the raw markdown content.

## Additional Features

- **User Authentication:** A login flow with a persistent session, allowing users to create and manage their own notes.
- **Autosave:** A background process that automatically syncs the current document state to the backend after a few seconds of inactivity.
- **Export to PDF/Markdown:** A feature allowing users to download their rendered markdown notes for offline use.
- **Note History:** A list of previous versions of a note, allowing users to revert to older versions if needed.
- **Text Editor:** Instead of a simple textarea, you can use a full-featured text editor library like [Monaco Editor](https://microsoft.github.io/monaco-editor) or [ProseMirror](https://prosemirror.net/).
- **Collaborative Editing:** A real-time mode where multiple users can connect to the same note, see each other's live cursors, and type simultaneously.

---

## Implementation Recommendations

You should start the project by rendering a list of notes from your data source. This can be the [notes.json](./assets/notes.json) file in the assets folder or a database filled with this initial data.

For turning your markdown strings into HTML you can use a library like [marked](https://github.com/markedjs/marked).

Depending on where you are in the course, you might want to focus on the following topics:

### Typescript

- **Type Definitions:** Define strict interfaces for your note payloads (e.g., `id`, `content`, `timestamps`) to ensure your frontend and backend stay aligned.
- **Tooling:** Set up a smooth developer workflow using `tsx` or `nodemon` for auto-reloading.

### Backend Basics / Template Engines

- **API Design:** Build a clear `REST API` using `Express` to handle the core CRUD operations for storing text.
- **File Based Storage:** Use `fs` to store your notes in \*.md files in the `notes` directory.
- **Data Persistence:** Utilize a `SQLite` database to store your note data.
- **Architecture:** Follow the `MVC Architecture` to strictly separate your routing logic from your database queries, potentially rendering static views with `Nunjucks`.

### OOP

- **Data Modeling:** Use `Classes` and `Interfaces` to structure your application.
- **Note History:** Implement a `History` class to track previous versions of a note.
- **Editor Class:** Create a `Editor` class to handle the text editor logic, including live preview and autosave.

### NestJS

- **Modular Backend:** Organize your app into distinct domains (like a `NotesModule` and `UsersModule`) using `Nest.js` and `Dependency Injection`.
- **Database Management:** Utilize `TypeORM` and `MySQL` to handle relational data, such as mapping which users have permission to edit which notes.

### Next.js App Router

- **Rendering Strategies:** Use `Server Components` to quickly fetch and display the user's list of notes, while reserving `Client Components` for the highly interactive editor pane.
- **State Management:** Implement `Zustand` or `use-context` to manage the live state of the text being typed, ensuring the preview pane updates instantly without re-rendering the whole page.

### WebSockets

- **Real-Time Sync:** Implement `WebSockets` to broadcast document changes (like keystrokes or text diffs) to all connected clients for the collaborative editing feature.
- **Live User Management:** Utilize `WebSockets` to keep track of connected users and their cursor positions, enabling real-time collaboration.
