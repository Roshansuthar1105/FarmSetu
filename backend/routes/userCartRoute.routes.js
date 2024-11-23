import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/:userId", async (req, res) => {
  try {
    const {id}= req.body;
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // const index = user.cart.indexOf(id);
    // if (index !== -1) {
    //   user.cart.splice(index, 1);
    // } else {
    //   user.cart.push(id);
    // }
    user.cart.push(id);
    user.save();
    res.status(200).json({"message":"producet added","cart":user.cart});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
