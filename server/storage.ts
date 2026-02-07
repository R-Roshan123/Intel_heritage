import { type IUser, User, type InsertUser } from "@shared/schema";
import connectToDatabase from "./database";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<IUser | null>;
  getUserByUsername(username: string): Promise<IUser | null>;
  getUserByEmail(email: string): Promise<IUser | null>;
  createUser(user: InsertUser): Promise<IUser>;
}

export class MongoStorage implements IStorage {
  constructor() {
    // Connect to database when storage is initialized
    connectToDatabase().catch(console.error);
  }

  async getUser(id: string): Promise<IUser | null> {
    await connectToDatabase();
    return User.findById(id);
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    await connectToDatabase();
    return User.findOne({ username });
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    await connectToDatabase();
    return User.findOne({ email });
  }

  async createUser(insertUser: InsertUser): Promise<IUser> {
    await connectToDatabase();
    const user = new User(insertUser);
    return user.save();
  }
}

export const storage = new MongoStorage();
