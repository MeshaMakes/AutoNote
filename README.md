# AutoNote 📝
A minimalistic, local-first terminal CLI tool designed for frictionless quick-capture. Drop in short one-liners using prefixes (like `chore:`, `feat:`, or `fix:`) and watch them automatically timestamp, categorize, and format into organized Markdown documents.

Built to eliminate the friction of end-of-week reviews and standups by keeping a living record of what you've actually accomplished, right from your terminal.

# 🚀 Features
Quick-Capture CLI: Interactive prompting interface built for speed and ease of use.

Smart Categorization: Uses simple prefixes (e.g., `chore:`, `bug:`) to automatically route notes under the correct Markdown heading.

Local-First Reliability: Powered by a local SQLite cache for fast operations and offline support.

Automated Markdown Export: Aggregates your notes into structured .md documents ready for review or sharing.

# 🛠️ The Tech Stack
Language/Runtime: JavaScript / TypeScript, Bun

CLI Prompts: clack/prompts

Local Storage: bun:sqlite

# 🎯 MVP Scope
The core foundational release focuses on the absolute essentials for local capture:

- Interactive prompting interface

- Create and categorize new notes via prefix command handling

- List and manage existing notes (view, remove single note, clear all)

- Automatic .md file generation with structured heading sections

# 🗺️ Roadmap & Future Vision
Cloud Sync: Transitioning storage and state to the cloud for seamless cross-device availability.

Weekly Reports: Automated generation and downloading of consolidated weekly .md documents summarizing all uploaded information.

Configurable Settings: User-defined configuration options for custom download periods, formatting templates, and custom prefixes.

Fine-Tuning: Polishing the overall developer experience, command speed, and background synchronization.

# 📸 Screen Captures
<p><img width="414" height="126" alt="Screenshot 2026-10-29 113050" src="https://github.com/user-attachments/assets/45b7cd67-01a5-4e6e-aa15-b336ebfc5995" /></p>

<p><img width="355" height="101" alt="Screenshot 2026-10-29 113214" src="https://github.com/user-attachments/assets/88d2b9a0-e407-412c-a50a-b98d87a1c648" /></p>

<p><img width="374" height="228" alt="Screenshot 2026-10-29 113119" src="https://github.com/user-attachments/assets/16df6cbd-d283-47e3-a74e-21fa2af9039f" /></p>

# 📦 Getting Started (Coming Soon)

