import * as p from "@clack/prompts";
import chalk from "chalk";
import { Database } from "bun:sqlite";
import { saveNote, listNotes, removeNote, removeAllNotes } from "./utils/cacheHelpers";

const localNotes = new Database("note-cache.sqlite", { create: true });
localNotes.run(`
  CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      rawNote TEXT,
      status TEXT,
      createdAt INTEGER,
      updatedAt INTEGER
    )
  `);

const handleCommand = async (input) => {
  const [cmd, arg] = input.split(" ");
  const notesList = listNotes();
  switch (cmd) {
    case "~ls":
      if (notesList.length === 0) {
        console.log(chalk.gray("No notes yet"));
      } else {
        console.log(chalk.cyan("All notes"));
        notesList.forEach(({ rawNote }, i) => console.log(`[${i}]: ${rawNote}`));
      }
      return "~";
    case "~del":
      removeNote(notesList[arg].id);
      console.log(chalk.red.dim(`Removed entry ${arg}`));
      return "~";
    case "~empty":
      removeAllNotes();
      console.log(chalk.red.dim(`Removed all entries`));
      return "~";
    case "~clear":
      console.clear();
      return "~";
    case "~help":
      console.table({
        "~ls": "Lists all notes",
        "~del": "Deletes a specific note; ~del 0",
        "~empty": "Deletes all notes",
        "~clear": "Clears console",
        "~help": "Lists all commands",
      });
      return "~";
    default:
      return "~";
  }
};

const handleNewNote = (input) => {
  saveNote(input);

  Bun.spawn({
    cmd: ["bun", "run", "src/utils/noteHelper.js"],
    stdio: ["ignore", "ignore", "ignore"],
  });
};

const handler = async () => {
  console.clear();
  p.intro(chalk.yellow.bold("AutoNote"));

  while (true) {
    const userInput = await p.text({
      message: chalk.green("Whatcha got for me?"),
      placeholder: "Try typing ~help",
      validate: (val) => {
        if (!val || val.trim().length === 0) {
          return "Need to type something";
        }
      },
    });

    if (p.isCancel(userInput) || userInput.trim().toLowerCase() === "exit") {
      const confirmExit = await p.confirm({
        message: "Done for today?",
      });

      if (confirmExit || p.isCancel(confirmExit)) {
        p.outro(chalk.blue.bold("All notes secured"));
        process.exit(0);
      }

      console.clear();
      continue;
    }

    await handleCommand(userInput.trim().toLowerCase());
    if (userInput.trim().startsWith("~")) {
      // If it was a command, skip the note saving flow and loop back for more input
      continue;
    }

    const loader = p.spinner();
    loader.start("Uploading note...");
    handleNewNote(userInput);
    await Bun.sleep(500);
    loader.stop("Done");
    console.clear();
  }
};

handler();
