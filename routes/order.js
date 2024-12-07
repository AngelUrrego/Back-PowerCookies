const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const router = express.Router();

// Crear pedido
router.post('/', async (req, res) => {
  const { userId, address, phone } = req.body;
  try {
    const user = await User.findById(userId).populate('cart.product');
    if (user.cart.length === 0) return res.status(400).json({ message: 'El carrito está vacío' });

    const totalPrice = user.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const newOrder = new Order({
      user: userId,
      products: user.cart,
      totalPrice,
      address,
      phone,
    });

    await newOrder.save();
    user.cart = [];
    await user.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
