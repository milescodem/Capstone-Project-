
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

async function createAdmin() {
  try {
    // Make sure the required settings exist.
    const { ADMIN_USERNAME, ADMIN_EMAIL, ADMIN_PASSWORD, JWT_SECRET } =
      process.env;

    if (!ADMIN_USERNAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
      throw new Error(
        "Missing settings in server/.env. Check your admin username, email, password, and JWT_SECRET."
      );
    }

    // Connect to your Physical Therapy database.
    await mongoose.connect("mongodb://localhost:27017/ClientsDB");

    // Avoid creating the same admin account twice.
    const existingAdmin = await Admin.findOne({
      $or: [
        { userName: ADMIN_USERNAME },
        { email: ADMIN_EMAIL.toLowerCase() },
      ],
    });

    if (existingAdmin) {
      console.log(
        "An admin with this username or email already exists."
      );
      return;
    }

    // Hash the password before saving it.
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    await Admin.create({
      userName: ADMIN_USERNAME,
      email: ADMIN_EMAIL.toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin account created successfully!");
    console.log("Username:", ADMIN_USERNAME);
    console.log("You can now sign in using your admin credentials.");
  } catch (error) {
    console.error("Could not create admin account:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();