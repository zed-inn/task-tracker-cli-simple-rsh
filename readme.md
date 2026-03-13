# Task Tracker CLI (Clean Architecture Edition)

A command-line interface (CLI) application to track and manage tasks.

This project was built as a solution to the [roadmap.sh Task Tracker project](https://roadmap.sh/projects/task-tracker). However, rather than writing a single procedural script, this project was deliberately over-engineered into a strict **Clean Architecture Monorepo** to practice advanced system design, Domain-Driven Design (DDD), and CQRS principles.

## Significance & Architecture

While a simple task tracker does not strictly require an isolated domain layer, this project serves as a proving ground for enterprise architectural patterns:

- **Violent Decoupling:** The core domain (`packages/core`) is a pure state machine with zero infrastructure dependencies. It does not know the file system exists.
- **CQRS Implementation:** Read operations (`TaskQuery`) and write operations (`TaskRepository`) are strictly separated.
- **Defensive Value Objects:** Every piece of data entering the domain is validated through strict Value Objects (`TaskDescription`, `TaskStatus`), making invalid state mathematically impossible.
- **Infrastructure Adapter:** The CLI application (`apps/cli`) acts merely as an infrastructure delivery mechanism, mapping terminal commands to core Use Cases and handling the raw JSON file storage.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd task-tracker-cli
```

2. Install dependencies (from the root of the monorepo):

```bash
npm install
```

3. Build the core and CLI packages:

```bash
npm run build --workspaces
```

4. Initialize the data file:

```bash
cd apps/cli
npm run build
bash scripts/cr-tasks.sh
```

## Usage

Run the CLI directly using Node from the `apps/cli` directory:

```bash
# Adding a new task
node dist/server.js add "Buy groceries"

# Updating a task description (e.g., ID 1)
node dist/server.js update 1 "Buy groceries and cook dinner"

# Deleting a task (e.g., ID 1)
node dist/server.js delete 1

# Marking a task as in progress or done
node dist/server.js mark-in-progress 1
node dist/server.js mark-done 1

# Listing all tasks
node dist/server.js list

# Listing tasks by status
node dist/server.js list done
node dist/server.js list todo
node dist/server.js list in-progress
```

## Limitations & Tradeoffs

To strictly apply Clean Architecture, some deliberate tradeoffs were made against the original roadmap.sh constraints:

1. **Use of External Libraries:** The roadmap suggests using zero external libraries. This project uses `zod` for strict structural validation at the infrastructure boundary and `uuid` (though later refactored to sequential IDs). This was a deliberate choice to prioritize robust architectural boundaries over zero-dependency constraints.
2. **$O(N)$ File Operations:** Because the JSON file acts as a database, every mutation requires reading the entire file into memory, modifying the array, and writing the entire file back to disk. This is highly inefficient for large datasets but perfectly isolates the domain from the persistence mechanism.
3. **No File Locking:** The current `fs/promises` implementation does not use `fcntl` or `.lock` files. Rapid concurrent CLI commands could theoretically cause race conditions leading to data corruption.

## 🔗 Links

- **Project Page**: [roadmap.sh/projects/task-tracker](https://roadmap.sh/projects/task-tracker)
