import { model, Schema, Document } from "mongoose";
import { IBook } from "../interfaces/book.interface";

interface IBookDocument extends IBook, Document {
  updateAvailability(): void;
}

const bookSchema = new Schema<IBookDocument>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      required: true,
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true },
    available: { type: Boolean, default: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
};

bookSchema.pre("save", function (next) {
  this.updateAvailability();
  next();
});


export const Book = model<IBookDocument>("Book", bookSchema);
