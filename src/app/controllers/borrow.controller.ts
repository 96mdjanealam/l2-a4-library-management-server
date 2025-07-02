import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity } = req.body;

    const bookToBorrow = await Book.findById(bookId);

    if (!bookToBorrow) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
      return;
    }

    if (bookToBorrow.copies < quantity) {
      res.status(409).json({
        success: false,
        message: "Not enough copies available",
      });
      return;
    }

    bookToBorrow.copies -= quantity;
    bookToBorrow.updateAvailability();
    await bookToBorrow.save();

    const borrow = await Borrow.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Operation failed",
      error,
    });
  }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $unwind: "$bookInfo",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookInfo.title",
            isbn: "$bookInfo.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed books summary",
      error,
    });
  }
});
