const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const router = express.Router();

// Agregar al carrito
router.post('/add', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const user = await User.findById(userId).populate('cart.product');
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    const existingItem = user.cart.find((item) => item.product._id.equals(productId));
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ver carrito
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('cart.product');
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un producto del carrito
router.delete('/remove', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const user = await User.findById(userId);
    user.cart = user.cart.filter((item) => !item.product.equals(productId));
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
