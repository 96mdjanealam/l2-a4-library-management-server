# 📚 Library Management

A RESTful API built with **Node.js**, **Express**, and **MongoDB** using **TypeScript**, designed to manage books and borrowing records for a simple library system.

## 🧩 Introduction

This API allows for the creation, retrieval, update, and deletion (CRUD) of books and tracking of borrowed books with quantity summaries. Built with **Express v5**, it connects to MongoDB using **Mongoose** and is structured with modular routing and model files.

---

## 🚀 Features

* 📘 Add, view, update, and delete books
* 📈 Borrow book copies and track borrow records
* 🧮 Aggregate borrow statistics per book
* 🔍 Filter and sort books with query parameters
* ✅ Built using TypeScript

---

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/96mdjanealam/l2-a3-express-mongoose.git
cd l2-a3-express-mongoose

# Install dependencies
npm install
```

---

## ▶️ Usage

To start the development server:

```bash
npm run dev
```

To build the TypeScript project:

```bash
npm run build
```

---

## 📡 API Endpoints

### 📘 Books

#### `POST https://l2-a3-express-mongoose.vercel.app/api/books`

Create a new book.

```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

#### `GET https://l2-a3-express-mongoose.vercel.app/api/books`

Retrieve all books. Supports query parameters:

* `filter` — genre
* `sortBy` — field name (e.g., `title`)
* `sort` — `asc` or `desc`
* `limit` — number of results

#### `GET https://l2-a3-express-mongoose.vercel.app/api/books/:bookId`

Retrieve a single book by ID.

#### `PUT https://l2-a3-express-mongoose.vercel.app/api/books/:bookId`

Update book details. If `copies > 0`, `available` is automatically set to `true`.

```json
{
  "copies": 50
}
```

#### `DELETE https://l2-a3-express-mongoose.vercel.app/api/books/:bookId`

Delete a book by ID.

---

### 🔄 Borrow

#### `POST https://l2-a3-express-mongoose.vercel.app/api/borrow`

Borrow book copies.

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

Checks for available copies before allowing borrowing.

#### `GET https://l2-a3-express-mongoose.vercel.app/api/borrow`

Returns aggregated borrow data:

```json
{
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
        {
            "totalQuantity": 20,
            "book": {
                "title": "The earth book",
                "isbn": "9780553380162"
            }
        },
        {
            "totalQuantity": 7,
            "book": {
                "title": "The Theory of Everything",
                "isbn": "9780553380163"
            }
        }
    ]
}
```

---

## 📦 Dependencies

### Runtime

* **express** `^5.1.0`
* **mongoose** `^8.16.0`

### Dev

* **typescript** `^5.8.3`
* **ts-node-dev** `^2.0.0`
* **@types/express** `^5.0.3`
* **@eslint/js**, **typescript-eslint**

---

## 📜 Development Scripts

```bash
npm run dev     # Run in development with ts-node-dev
npm run build   # Compile TypeScript to JS
```