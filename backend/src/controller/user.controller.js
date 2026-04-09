let users = []; 
let userIdCounter = 1;
export async function registerUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please provide all fields" });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }
    const newUser = { id: userIdCounter++, name, email, password };
    users.push(newUser);

    return res.status(201).json({ message: "User registered successfully", user: newUser });
};

export async function getUser(req, res) {
  res.status(200).json({ message: "Get  all user endpoint", users });
    res.status(200).json({ message: "Get user endpoint", users });
};

export async function updateUser(req, res) {
    const{ id } = req.params;
    const { name, email, password } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    
    res.status(200).json({ message: "Updated user endpoint", user });
};

export async  function deleteUser(req, res) {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    users.splice(userIndex, 1);
    res.status(200).json({ message: "Deleted user endpoint" });
};