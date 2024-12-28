import express from "express";
import User from "../models/user.model.js";
import Product from "../models/Product.model.js";

const router = express.Router();

router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const products = await Promise.all(user.cart.map(async (productId) => {
      return await Product.findById(productId);
    }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/:userId", async (req, res) => {
  try {
    // const {product}= req.body;
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart.push(req.body);
    await user.save();
    res.status(200).json({"message":"producet added","cart":user.cart});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/delete/:userId", async (req, res) => {
 const {id} = req.body;
 const user = await User.findById(req.params.userId);
 if (!user) {
   return res.status(404).json({ message: "User not found" });
 }
 const index = user.cart.indexOf(id);
 if (index === -1) {
   return res.status(404).json({ message: "Product not found in cart" });
 }
 user.cart.splice(index, 1);
 await user.save();
 res.status(200).json({ message: "Product removed from cart", cart: user.cart });
});
router.get("/clearcart/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.cart=[];
    await user.save();
    res.status(200).json({"message":"all products removed","cart":user.cart});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
