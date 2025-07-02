
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect('mongodb+srv://admin-user_1:NLU5jvUzDJlmsKsD@cluster0.mqmjq.mongodb.net/library-app?retryWrites=true&w=majority&appName=Cluster0');
    server = app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
