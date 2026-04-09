let users = []; 

export async function registerUser(req, res) {
    const { name, email, password } = req.body;

    // 1️⃣ Check all fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    // 2️⃣ Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Add new user to array
    const newUser = { name, email, password };
    users.push(newUser);

    // 4️⃣ Send 201 response
    return res.status(201).json({ message: "User registered successfully", user: newUser });
};

export async function getUser(req, res) {
    res.status(200).json({ message: "Get user endpoint", users });
};

export async function updateUser(req, res) {
    res.status(200).json({ message: "Update user endpoint" });
};