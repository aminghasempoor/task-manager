# Task Manager

A full-stack task management app built to demonstrate a modern TypeScript stack. Create, update, and delete tasks with animated UI and end-to-end type safety.

## Stack

| Package | Role |
|---|---|
| Next.js | App framework — routing, SSR, API routes |
| PostgreSQL | Database |
| Drizzle ORM | Type-safe database queries and migrations |
| oRPC | Type-safe API layer between client and server |
| Zod | Runtime input validation |
| TanStack Query | Server state, caching, and mutations |
| shadcn/ui | UI component library |
| Framer Motion | Animations |
| TypeScript | End-to-end type safety |

---

## Prerequisites

Make sure you have these installed before starting:

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/) — `npm install -g pnpm`
- [PostgreSQL](https://www.postgresql.org/) v14 or higher

### Install PostgreSQL (if not already installed)

**Ubuntu / Debian:**
```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**macOS (Homebrew):**
```bash
brew install postgresql@16
brew services start postgresql@16
```

**Windows:**
Download the installer from [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/aminghasempoor/task-manager.git
cd task-manager
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Create the database

Connect to PostgreSQL and create the database:

```bash
sudo -u postgres psql
```

Inside the psql shell:

```sql
CREATE DATABASE task_manager;
ALTER USER postgres PASSWORD 'your_password';
\q
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/task_manager
```

Replace `your_password` with the password you set in the previous step.

### 5. Run database migrations

This creates the `tasks` table in your database:

```bash
pnpm db:migrate
```

### 6. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Commands

```bash
# Generate a new migration after changing schema
pnpm db:generate

# Apply pending migrations to the database
pnpm db:migrate

# Open Drizzle Studio — visual database browser at localhost:4983
pnpm db:studio
```

---

## Project Structure

```
src/
├── app/
│   ├── api/[[...rest]]/
│   │   └── route.ts          # oRPC HTTP handler — single entry point for all API calls
│   ├── layout.tsx             # Root layout with TanStack Query provider
│   ├── page.tsx               # Main page
│   └── providers.tsx          # QueryClientProvider wrapper
├── components/
│   ├── ui/                    # shadcn/ui components (auto-generated)
│   ├── AddTaskDialog.tsx      # Dialog for creating tasks
│   ├── StatusBadge.tsx        # Colored status indicator
│   ├── TaskCard.tsx           # Individual task row with animations
│   └── TaskList.tsx           # Animated list of tasks
├── db/
│   ├── index.ts               # Drizzle database connection
│   └── schema.ts              # Table definitions + inferred TypeScript types
├── hooks/
│   └── useTasks.ts            # useTaskList, useCreateTask, useUpdateTask, useDeleteTask
├── lib/
│   └── query-client.ts        # TanStack QueryClient configuration
├── orpc/
│   ├── client.ts              # oRPC client for the browser
│   ├── query-client.ts        # oRPC + TanStack Query integration
│   └── router.ts              # All API procedures (list, create, update, delete)
└── validators/
    └── task.ts                # Zod schemas for API input validation
```

---

## How It Works

When you create a task, here is the full journey:

```
1. You fill in the form and click Create
2. useCreateTask() calls mutate({ title, status })
3. TanStack Query triggers the mutation
4. oRPC client sends POST /api/task/create
5. Next.js routes the request to [[...rest]]/route.ts
6. oRPC matches the path to router.task.create
7. Zod validates the input — rejects bad data before it touches the DB
8. Drizzle runs: INSERT INTO tasks (...) RETURNING *
9. PostgreSQL stores the row and returns it
10. oRPC sends the typed response back to the client
11. TanStack Query invalidates the task list cache
12. useTaskList() refetches automatically
13. The new task animates into the list via Framer Motion
```

---

## Troubleshooting

**`DATABASE_URL` not found / connection refused**

Make sure PostgreSQL is running:
```bash
sudo systemctl status postgresql     # Linux
brew services list | grep postgresql  # macOS
```

**`dotenv-cli: not found`**

Run `pnpm install` to ensure all dev dependencies are installed. If the error persists:
```bash
pnpm add -D dotenv-cli
```

**Migration fails with "role does not exist"**

Your PostgreSQL user might differ from `postgres`. Check available users:
```bash
sudo -u postgres psql -c "\du"
```

Update the `DATABASE_URL` in `.env` to match your username.

**Port 5432 already in use**

Another PostgreSQL instance may be running. Check with:
```bash
sudo lsof -i :5432
```

---

## License

MIT