import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { ResearchReport } from "@shared/schema";
import bcrypt from "bcrypt";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { emailOrId, password } = req.body;

      if (!emailOrId || !password) {
        return res.status(400).json({ message: "Email/Research ID and password are required" });
      }

      // Try to find user by email first, then by username
      let user = await storage.getUserByEmail(emailOrId);
      if (!user) {
        user = await storage.getUserByUsername(emailOrId);
      }

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const storedPassword = user.password ?? "";
      let isValidPassword = false;

      if (storedPassword.startsWith("$2")) {
        isValidPassword = await bcrypt.compare(password, storedPassword);
      } else {
        isValidPassword = storedPassword === password;
      }

      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Return user data (excluding password)
      const { password: _, ...userWithoutPassword } = user.toObject();
      res.json({
        user: userWithoutPassword,
        message: "Login successful"
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const { fullName, email, password, mobileNumber, role, department, country } = req.body;

      if (!fullName || !email || !password) {
        return res.status(400).json({ message: "Full name, email, and password are required" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists" });
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      const newUser = await storage.createUser({
        username: email, // Use email as username for now
        password: hashedPassword,
        fullName,
        email,
        mobileNumber,
        role,
        department,
        country,
      });

      // Return user data (excluding password)
      const { password: _, ...userWithoutPassword } = newUser.toObject();
      res.status(201).json({
        user: userWithoutPassword,
        message: "Registration successful"
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/research/upload", async (req, res) => {
    try {
      const { files, uploaderName, uploaderEmail } = req.body;

      if (!Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ message: "No files provided" });
      }

      const report = await ResearchReport.create({
        files,
        uploaderName,
        uploaderEmail,
      });

      res.status(201).json({
        id: report._id,
        message: "Upload saved to research database",
      });
    } catch (error) {
      console.error("Research upload error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  return httpServer;
}
