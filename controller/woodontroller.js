const wood =require("../model/wood");

//eachfuncution handles one operation, 'exports name' makes it importable 
exports.createWood = async (req, res) => {
    try {
        const newWood = await wood.create(req.body);
        res.status(201).json(Wood);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getWoods = async (req, res) => {
    const woods = await wood.find().sort({ createdAt: -1 });
    res.json(woods);
 };
 
 exports.getWood = async (req, res) => {
    const wood = await wood.findById(req.params.id);
    if (!wood) return res.status(404).json({ error: "Wood not found" });
    res.json(wood);
 };

 exports.updateWood = async (req, res) => {
    const wood = await wood.findByIdAndUpdate(req.params.id, req.body, { 
    new: true,
    runValidators: true
 });
 if (!wood) return res.status(404).json({ error: "Wood not found" });
 res.json(wood);
};

exports.deleteWood = async (req, res) => {
    const wood = await wood.findByIdAndDelete(req.params.id);
    if (!wood) return res.status(404).json({ error: "Wood not found" });
    res.json({ message: "Wood deleted successfully" });
};