# Library Management System

A simple REST API for managing a library - members, books, and book issuances.

Built with Node.js, Express, PostgreSQL, and Docker.

## Getting Started

```bash
cp .env.example .env
# edit .env with your values
docker compose up --build
```

API runs at `http://localhost:3000`

## API Key

Pass `x-api-key` header with every request.

## Entities

- **Member** - library members
- **Book** - books in the library
- **Issuance** - records of books issued to members

## SQL Queries

See `queries.sql` for:
1. Books never borrowed
2. Outstanding books on a given date
3. Top 10 most borrowed books
