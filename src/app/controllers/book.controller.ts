import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

// Post a book
bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      Message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error,
    });
  }
});

// Get all books
bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    const query: any = {};
    if (filter) {
      query.genre = filter;
    }

    const sortField = sortBy || "createdAt";
    const sortDirection = sort === "desc" ? -1 : 1;
    const sortOption: { [key: string]: 1 | -1 } = {
      [sortField as string]: sortDirection,
    };

    const resultLimit = limit ? parseInt(limit as string, 10) : 10;

    const books = await Book.find(query).sort(sortOption).limit(resultLimit);

    res.status(200).json({
      success: true,
      Message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Cannot retrieve books",
      success: false,
      error,
    });
  }
});

// Get a book by Id
bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      Message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Cannot retrieve book",
      success: false,
      error,
    });
  }
});

// Update a book by Id
bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updateData = req.body;

    if (updateData.copies > 0) {
      updateData.available = true;
    }

    const book = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      Message: "Book updated successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Cannot update book",
      success: false,
      error,
    });
  }
});

// Delete a book by Id
bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findByIdAndDelete(bookId, { new: true });

    res.status(200).json({
      success: true,
      Message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Cannot delete book",
      success: false,
      error,
    });
  }
});
