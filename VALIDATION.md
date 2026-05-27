# Validation Document — Library Management System

## How to Run

1. Clone the repo:
   ```bash
   git clone https://github.com/BalajiRKB/Alt-life.git
   cd Alt-life
   ```

2. Copy env file:
   ```bash
   cp .env.example .env
   ```

3. Start everything:
   ```bash
   docker compose up --build
   ```

API runs at `http://localhost:3000`  
Dashboard UI at `http://localhost:3000`

---

## API Key

All API requests require this header:
```
x-api-key: mysecretapikey123
```

---

## API Testing

### 1. GET /book — List all books
```bash
curl http://localhost:3000/book -H "x-api-key: mysecretapikey123"
```
![get-all-books](https://raw.githubusercontent.com/BalajiRKB/Alt-life/main/screenshots/get-all-book.png)

---

### 2. GET /book/1 — Get book by ID
```bash
curl http://localhost:3000/book/1 -H "x-api-key: mysecretapikey123"
```
![get-book-by-id](https://raw.githubusercontent.com/BalajiRKB/Alt-life/main/screenshots/get-book-by-id.png)

---

### 3. GET /member — List all members
```bash
curl http://localhost:3000/member -H "x-api-key: mysecretapikey123"
```
![get-all-members](https://raw.githubusercontent.com/BalajiRKB/Alt-life/main/screenshots/get-all-members.png)

---

### 4. POST /member — Create new member
```bash
curl -X POST http://localhost:3000/member \
  -H "x-api-key: mysecretapikey123" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@email.com"}'
```
![post-member](https://raw.githubusercontent.com/BalajiRKB/Alt-life/main/screenshots/post-member.png)  
Status: 201 Created

---

### 5. PUT /member/:id — Update member
```bash
curl -X PUT http://localhost:3000/member/6 \
  -H "x-api-key: mysecretapikey123" \
  -H "Content-Type: application/json" \
  -d '{"phone":"9000000001","address":"Chennai, TN"}'
```
![put-member](https://raw.githubusercontent.com/BalajiRKB/Alt-life/main/screenshots/put-member.png)  
Status: 200 OK

---

### 6. GET /issuance — List all issuances
```bash
curl http://localhost:3000/issuance -H "x-api-key: mysecretapikey123"
```
![get-all-issuances](https://raw.githubusercontent.com/BalajiRKB/Alt-life/main/screenshots/get-all-issuances.png)  
Returns issuance records joined with member name and book title.

---

### 7. Unauthorized request — No API key
```bash
curl http://localhost:3000/book
```
![unauthorized](https://raw.githubusercontent.com/BalajiRKB/Alt-life/main/screenshots/unauthorized.png)  
Status: 401 Unauthorized

---

## SQL Query Results

Queries were run inside the PostgreSQL container:
```bash
docker exec -it alt-life-db-1 psql -U libadmin -d libmgmt
```

---

### Query 1 — Books never borrowed
```sql
SELECT b.title AS "Book Name", b.author AS "Author"
FROM books b
LEFT JOIN issuances i ON b.id = i.book_id
WHERE i.id IS NULL;
```
![query-1](https://raw.githubusercontent.com/BalajiRKB/Alt-life/main/screenshots/query-1.png)  
Result: 4 books — The Alchemist, Deep Work, Sapiens, Design Patterns

---

### Query 2 — Outstanding books on a given date
```sql
SELECT m.name AS "Member Name", b.title AS "Book Name",
  i.issued_date AS "Issued Date", i.target_return_date AS "Target Return Date",
  b.author AS "Author"
FROM issuances i
JOIN members m ON i.member_id = m.id
JOIN books b ON i.book_id = b.id
WHERE i.status = 'issued'
  AND i.issued_date <= '2026-05-27'
  AND (i.actual_return_date IS NULL OR i.actual_return_date > '2026-05-27');
```
![query-2](https://raw.githubusercontent.com/BalajiRKB/Alt-life/main/screenshots/query-2.png)  
Result: 4 rows with member, book, and date details

---

### Query 3 — Top 10 most borrowed books
```sql
SELECT b.title AS "Book Name", COUNT(i.id) AS "# of times borrowed",
  COUNT(DISTINCT i.member_id) AS "# of Members that borrowed"
FROM books b
JOIN issuances i ON b.id = i.book_id
GROUP BY b.id, b.title
ORDER BY COUNT(i.id) DESC
LIMIT 10;
```
![query-3](https://raw.githubusercontent.com/BalajiRKB/Alt-life/main/screenshots/query-3.png)  
Result: The Pragmatic Programmer (3x), Clean Code (2x), Atomic Habits (2x)

---

## Dashboard UI

Accessible at `http://localhost:3000`

- Pick any date → click Check
- Shows all members with books not yet returned on that date
- Overdue rows are highlighted in red

![dashboard](https://raw.githubusercontent.com/BalajiRKB/Alt-life/main/screenshots/dashboard.png)

---

## AI Disclosure

Parts of this project were AI-assisted — specifically the initial code structure, route setup, and SQL query formation. All logic has been reviewed, understood, and can be explained and modified by the developer. The implementation was verified manually by running each API endpoint and SQL query against live data.
