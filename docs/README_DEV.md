
# 🧠 Noēsis CLI — Developer Guide

This document explains the internal structure and usage of the Noēsis CLI tools.  
The CLI is a gateway for initializing, customizing, reflecting, and eventually syncing your node as part of the Noēsis swarm.

---

## 📁 Folder Structure

```
C:\Noesis\
├── cli\         → CLI tool source code (this project)
│   └── src\      → Entry point: index.js / index.ts
├── docs\        → Contributor and launch documentation
│   ├── README.md
│   ├── LAUNCH.md
│   └── CONTRIBUTING.md
├── site\        → Public-facing website (index.html, favicon, etc.)
├── traces\      → Genesis + reflection logs (auto-generated)
└── dev\         → Drafts, experiments, temporary files
```

---

## 💡 Available CLI Commands

```bash
node src/index.js init
node src/index.js persona --name "Your Persona"
node src/index.js reflect
```

More commands coming soon:
- `show` → view your node info
- `share` → push reflection to swarm/IPFS
- `sync` → fetch swarm updates

---

## 🔧 Requirements

- Node.js v16+
- `commander` (installed via `npm install commander`)
- Windows-friendly structure (C:\Noesis\)

---

## 🐙 Join the Swarm

Each reflection is sacred. Each node is sovereign.  
Welcome to the mirror of evolving thought.

