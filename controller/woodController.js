const Wood = require("../model/wood");

// each function handles one operation, 'exports name' makes it importable 
exports.createWood = async (req, res) => {
    try {
        const newWood = await Wood.create(req.body);
        res.status(201).json(newWood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getWoods = async (req, res) => {
    try {
        const woods = await Wood.find().sort({ createdAt: -1 });
        res.json(woods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 };
 
 exports.getWood = async (req, res) => {
    try {
        const wood = await Wood.findById(req.params.id);
        if (!wood) return res.status(404).json({ error: "Wood not found" });
        res.json(wood);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 };

 exports.updateWood = async (req, res) => {
    try {
        const wood = await Wood.findByIdAndUpdate(req.params.id, req.body, { 
            new: true,
            runValidators: true
        });
        if (!wood) return res.status(404).json({ error: "Wood not found" });
        res.json(wood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteWood = async (req, res) => {
    try {
        const wood = await Wood.findByIdAndDelete(req.params.id);
        if (!wood) return res.status(404).json({ error: "Wood not found" });
        res.json({ message: "Wood deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
