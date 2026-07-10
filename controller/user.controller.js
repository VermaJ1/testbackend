const user =require("../model/user");

//eachfuncution handles one operation, 'exports name' makes it importable 
exports.createUser = async (req, res) => {
    try {
        const newUser = await user.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    const users = await user.find().sort({ createdAt: -1 });
    res.json(users);
 };
 
 exports.getUser = async (req, res) => {
    const user = await user.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
 };

 exports.updateUser = async (req, res) => {
    const user = await user.findByIdAndUpdate(req.params.id, req.body, { 
    new: true,
    runValidators: true
 });
 if (!user) return res.status(404).json({ error: "User not found" });
 res.json(user);
};

exports.deleteUser = async (req, res) => {
    const user = await user.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "user deleted successfully" });
};