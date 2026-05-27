-- SQL Queries for Library Management System

-- Query 1: Books that have never been borrowed
-- Returns: Book Name, Author
SELECT
  b.title AS "Book Name",
  b.author AS "Author"
FROM books b
LEFT JOIN issuances i ON b.id = i.book_id
WHERE i.id IS NULL;


-- Query 2: Outstanding books at any given point in time
-- Replace '2026-05-27' with any date to check outstanding books on that day
-- Returns: Member Name, Book Name, Issued Date, Target Return Date, Author
SELECT
  m.name AS "Member Name",
  b.title AS "Book Name",
  i.issued_date AS "Issued Date",
  i.target_return_date AS "Target Return Date",
  b.author AS "Author"
FROM issuances i
JOIN members m ON i.member_id = m.id
JOIN books b ON i.book_id = b.id
WHERE i.status = 'issued'
  AND i.issued_date <= '2026-05-27'
  AND (i.actual_return_date IS NULL OR i.actual_return_date > '2026-05-27');


-- Query 3: Top 10 most borrowed books
-- Returns: Book Name, # of times borrowed, # of members that borrowed
SELECT
  b.title AS "Book Name",
  COUNT(i.id) AS "# of times borrowed",
  COUNT(DISTINCT i.member_id) AS "# of Members that borrowed"
FROM books b
JOIN issuances i ON b.id = i.book_id
GROUP BY b.id, b.title
ORDER BY COUNT(i.id) DESC
LIMIT 10;
