import mongoose from "mongoose";

export const ConnectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
        throw new Error("MongoDB connection string is missing.");
    }

    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");
    }
};