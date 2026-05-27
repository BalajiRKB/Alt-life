-- Sample data for Library Management System

INSERT INTO members (name, email, phone, address, membership_date) VALUES
  ('Arun Kumar', 'arun.kumar@email.com', '9876543210', '12 Anna Nagar, Chennai', '2024-01-10'),
  ('Priya Shankar', 'priya.shankar@email.com', '9123456780', '45 Gandhi Road, Coimbatore', '2024-02-15'),
  ('Rahul Mehta', 'rahul.mehta@email.com', '9988776655', '8 MG Road, Bangalore', '2024-03-01'),
  ('Sneha Reddy', 'sneha.reddy@email.com', '9871234560', '22 Jubilee Hills, Hyderabad', '2024-04-05'),
  ('Vikram Nair', 'vikram.nair@email.com', '9765432109', '3 Marine Drive, Kochi', '2024-05-20');

INSERT INTO books (title, author, isbn, genre, total_copies, available_copies) VALUES
  ('The Pragmatic Programmer', 'David Thomas', '978-0135957059', 'Technology', 3, 2),
  ('Clean Code', 'Robert C. Martin', '978-0132350884', 'Technology', 2, 1),
  ('Sapiens', 'Yuval Noah Harari', '978-0062316097', 'History', 4, 4),
  ('Atomic Habits', 'James Clear', '978-0735211292', 'Self Help', 3, 2),
  ('The Alchemist', 'Paulo Coelho', '978-0062315007', 'Fiction', 5, 5),
  ('Deep Work', 'Cal Newport', '978-1455586691', 'Self Help', 2, 2),
  ('Design Patterns', 'Gang of Four', '978-0201633610', 'Technology', 2, 2);

INSERT INTO issuances (member_id, book_id, issued_date, target_return_date, actual_return_date, status) VALUES
  (1, 1, '2026-04-01', '2026-04-15', '2026-04-14', 'returned'),
  (2, 2, '2026-04-10', '2026-04-24', NULL, 'issued'),
  (3, 4, '2026-05-01', '2026-05-15', '2026-05-14', 'returned'),
  (1, 4, '2026-05-10', '2026-05-24', NULL, 'issued'),
  (4, 1, '2026-05-12', '2026-05-26', NULL, 'issued'),
  (2, 1, '2026-03-01', '2026-03-15', '2026-03-14', 'returned'),
  (5, 2, '2026-03-20', '2026-04-03', '2026-04-02', 'returned');
