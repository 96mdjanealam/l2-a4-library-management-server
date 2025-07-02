"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
// Post a book
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.create(req.body);
        res.status(201).json({
            success: true,
            Message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error,
        });
    }
}));
// Get all books
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        const sortField = sortBy || "createdAt";
        const sortDirection = sort === "desc" ? -1 : 1;
        const sortOption = {
            [sortField]: sortDirection,
        };
        const resultLimit = limit ? parseInt(limit, 10) : 10;
        const books = yield book_model_1.Book.find(query).sort(sortOption).limit(resultLimit);
        res.status(200).json({
            success: true,
            Message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Cannot retrieve books",
            success: false,
            error,
        });
    }
}));
// Get a book by Id
exports.bookRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            Message: "Book retrieved successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Cannot retrieve book",
            success: false,
            error,
        });
    }
}));
// Update a book by Id
exports.bookRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updateData = req.body;
        if (updateData.copies > 0) {
            updateData.available = true;
        }
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, updateData, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            success: true,
            Message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Cannot update book",
            success: false,
            error,
        });
    }
}));
// Delete a book by Id
exports.bookRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findByIdAndDelete(bookId, { new: true });
        res.status(200).json({
            success: true,
            Message: "Book deleted successfully",
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Cannot delete book",
            success: false,
            error,
        });
    }
}));
