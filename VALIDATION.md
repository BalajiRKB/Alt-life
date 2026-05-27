# Validation Document

## How to Run

1. Clone the repo
2. Copy `.env.example` to `.env` and fill in values
3. Run:

```bash
docker compose up --build
```

The database schema and seed data load automatically on first startup.

## API Key

All API requests require the header:
```
x-api-key: <your API_KEY from .env>
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /member | List all members |
| GET | /member/:id | Get member by ID |
| POST | /member | Create member |
| PUT | /member/:id | Update member |
| GET | /book | List all books |
| GET | /book/:id | Get book by ID |
| POST | /book | Create book |
| PUT | /book/:id | Update book |
| GET | /issuance | List all issuances |
| GET | /issuance/:id | Get issuance by ID |
| POST | /issuance | Create issuance |
| PUT | /issuance/:id | Update issuance |

## Testing

_Screenshots and test results will be added after running the application._

## AI Disclosure

Parts of this project were AI-assisted (code structure and SQL queries). All logic has been reviewed, understood, and is explainable by the developer.
