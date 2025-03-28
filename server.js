// import express from "express"
// import cors from "cors"
// import "dotenv/config"
// import connectDB from "./configs/mongodb.js"
// import educatorRouter from "./routes/educatorRoutes.js"
// import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js"
// import { clerkMiddleware } from "@clerk/express"
// import connectCloudinary from "./configs/cloudinary.js"
// import courseRouter from "./routes/courseRoute.js"
// import userRouter from "./routes/userRoute.js"
// import serverless from "serverless-http" 

// // Initialize Express
// const app = express()

// await connectDB()
// await connectCloudinary()

// // Middlewares
// app.use(cors())
// app.use(clerkMiddleware())



// // Routes
// app.get('/', (req, res) => res.send("API Working"))
// app.post('/clerk', express.json(), clerkWebhooks)
// app.use('/api/educator', express.json(), educatorRouter)
// app.use('/api/course', express.json(), courseRouter)
// app.use('/api/user', express.json(), userRouter)
// app.use('/stripe', express.raw({ type: 'application/json'}), stripeWebhooks)

// export const handler = serverless(app)

// // Port
// const PORT = process.env.PORT || 7000
// app.listen(PORT, () => {
//   console.log(`Server is running at ${PORT}`)
// })

// import express from "express";
// import cors from "cors";
// import "dotenv/config";  // Automatically loads environment variables
// import connectDB from "./configs/mongodb.js";
// import educatorRouter from "./routes/educatorRoutes.js";
// import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
// import { clerkMiddleware } from "@clerk/express";
// import connectCloudinary from "./configs/cloudinary.js";
// import courseRouter from "./routes/courseRoute.js";
// import userRouter from "./routes/userRoute.js";

// // Initialize Express
// const app = express();

// const startServer = async () => {
//   try {
//     await connectDB(); // This will work with ESM
//     await connectCloudinary();

//     // Middlewares
//     app.use(cors());
//     app.use(clerkMiddleware());

//     // Routes
//     app.get('/', (req, res) => res.send("API Working"));
//     app.post('/clerk', express.json(), clerkWebhooks);
//     app.use('/api/educator', express.json(), educatorRouter);
//     app.use('/api/course', express.json(), courseRouter);
//     app.use('/api/user', express.json(), userRouter);
//     app.use('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

//     // Port
//     const PORT = process.env.PORT || 7000;
//     app.listen(PORT, () => {
//       console.log(`Server is running at ${PORT}`);
//     });
//   } catch (err) {
//     console.error("Error starting server:", err);
//   }
// };

// // Start server
// startServer();

// export default app;  



import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhooks.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./configs/cloudinary.js";
import courseRouter from "./routes/courseRoute.js";
import userRouter from "./routes/userRoute.js";

// Initialize Express
const app = express();

// Middleware
app.use(cors()); // Allow CORS for all origins (or restrict as needed)
app.use(express.json()); // Parse JSON bodies for all routes
app.use(clerkMiddleware()); // Clerk authentication middleware

// Routes
app.get('/', (req, res) => res.send("API Working"));
app.post('/clerk', express.json(), clerkWebhooks);
app.use('/api/educator', educatorRouter);
app.use('/api/course', courseRouter);
app.use('/api/user', userRouter);
app.use('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    // Port
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();

export default app;
