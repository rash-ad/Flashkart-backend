
import { users, userId } from "../controller/user.controller.js";

import jwt from "jsonwebtoken";

// REGISTER USER
export function registerUser(req, res) {
  const { name, email, password } = req.body;

  // check fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }

  // check duplicate user
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // create user
  const newUser = {
    id: userId++,
    name,
    email,
    password // (plain for now - OK for learning only)
  };

  users.push(newUser);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    }
  });
}

// LOGIN USER + JWT TOKEN
export function loginUser(req, res) {
  const { email, password } = req.body;
 const cleanEmail = email.trim().toLowerCase();

  console.log("LOGIN REQUEST:", req.body); // DEBUG
  console.log("CURRENT USERS:", users);    // DEBUG
  // find user
  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // create token
  const token = jwt.sign(
    { id: user.id, email: user.email },
    "secretkey", // (for learning only)
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
}