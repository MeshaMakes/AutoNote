import { Database } from "bun:sqlite";

const localNotes = new Database(`${import.meta.dir}/../../note-cache.sqlite`);

export const listNotes = () => {
  return localNotes.query("SELECT * FROM notes").all();
};

export const getPendingNotes = () => {
  return localNotes.query("SELECT * FROM notes WHERE status = 'PENDING'").all();
};

export const removeNote = (id) => {
  return localNotes.prepare("DELETE FROM notes WHERE id = ?").run(id);
};

export const removeAllNotes = () => {
  return localNotes.run("DELETE FROM notes");
};

export const saveNote = (input) => {
  return localNotes
    .prepare("INSERT INTO notes (id, rawNote, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)")
    .run(Bun.randomUUIDv7(), input, "PENDING", Date.now(), Date.now());
};
