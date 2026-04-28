const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config({ path: ".env.local" });
require("dotenv").config();

// Load routes
const users = require("./src/routes/users");
const products = require("./src/routes/product");
const categories = require("./src/routes/categoryRoutes");
const likes = require("./src/routes/likes");
const comment = require("./src/routes/comments");
const userinfoRoutes = require('./src/routes/userinfo');
const cartRoutes = require('./src/routes/cart');
const ordersRoutes = require('./src/routes/orders');
const Deals = require('./src/routes/deals');
const googleRoutes = require('./src/routes/googleRoute');
const dashboard = require('./src/routes/dashboard');

const app = express();

// Middleware
const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json({ limit: '500mb' }));

// MongoDB Connection
const mongoUrl = process.env.MONGO_URI;
mongoose.set("strictQuery", true);
if (!mongoUrl) {
  throw new Error("Missing required environment variable: MONGO_URI");
}

mongoose
  .connect(mongoUrl)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/users", users);
app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/api/likes", likes); // Assuming you have a likes route
app.use("/api/comments", comment); // Assuming you have a comments route
app.use("/api/userinfo", userinfoRoutes); // User info route
app.use("/api/cart", cartRoutes); // Cart route
app.use("/api/orders", ordersRoutes); // Orders route
app.use("/api/deals", Deals); // Deals route
app.use("/api/users/google-login", googleRoutes); // Google login route
app.use("/api/dashboard", dashboard); // Dashboard route

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));