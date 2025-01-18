import mongoose from "mongoose";

// export const ConnectDB = async () => {
//     const MONGODB_URI = process.env.MONGODB_URI;

//     if (!MONGODB_URI) {
//         throw new Error("MongoDB connection string is missing.");
//     }

//     if (mongoose.connection.readyState === 0) {
//         await mongoose.connect(MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log("Connected to MongoDB");
//     }
// };

// export const ConnectDB = async () => {

//     const MONGODB_URI = process.env.MONGODB_URI;

//     await mongoose.connect(MONGODB_URI);
//     console.log("DB Connected");
// }

export const ConnectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;

    if (!MONGODB_URI) {
       // console.log("MongoDB connection string is missing.");
        throw new Error("MongoDB connection string is missing.");
    }

    console.log("Checking MongoDB connection...");
    if (mongoose.connection.readyState === 0) {
        console.log("Attempting to connect to MongoDB...");
        try {
            await mongoose.connect(MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            //console.log("Connected to MongoDB successfully.");
        } catch (error) {
            //console.error("Error connecting to MongoDB:", error.message);
            throw error;
        }
    } else {
        //console.log("MongoDB is already connected.");
    }
};