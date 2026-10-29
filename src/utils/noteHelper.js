import { Database } from "bun:sqlite";
import { file, write } from "bun";
import { getPendingNotes } from "./cacheHelpers";

const filePath = "TempNoteHolder.md";
const localNotes = new Database(`${import.meta.dir}/../../note-cache.sqlite`);

const headerMapping = {
  "chore:": "# Chores",
  "ticket:": "# Tickets",
  "mentor:": "# Mentoring",
};

const addTextToSection = async (noteObj, lines) => {
  const targetHeaderKey = Object.keys(headerMapping).find((key) => noteObj.rawNote.startsWith(key));
  const headerIndex = lines.findIndex((line) => line.trim() === headerMapping[targetHeaderKey]);

  if (headerIndex !== -1) {
    const formattedNote = `- ${noteObj.rawNote.replaceAll(
      targetHeaderKey,
      "",
    )} - ${new Date(noteObj.createdAt).toLocaleString("en-US", { timeZone: "America/Antigua" })}`;
    lines.splice(headerIndex + 1, 0, formattedNote.trim());

    const updatedContent = lines.join("\n");
    await write(filePath, updatedContent);
    localNotes.prepare("UPDATE notes SET status = $newValue WHERE id = $id").run({
      $newValue: "UPDATED",
      $id: noteObj.id,
    });
  }
};

const noteHelper = async () => {
  const content = await file(filePath).text();
  const lines = content.split(/\r?\n/);
  const pendingNotes = getPendingNotes();
  console.log({ pendingNotes })

  pendingNotes.map((note) => {
    addTextToSection(note, lines);
  });
};

noteHelper();
