const mongoose = require('mongoose');
const Producto = require('./models/Product'); // Asegúrate de que el modelo Producto esté bien configurado

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://mongo:zfqAspGFwCJDMFbuAxwxosaHfPSFgHxG@autorack.proxy.rlwy.net:35310', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión:', error);
  }
};

const insertarProductos = async () => {
  const productos = [
    { name: 'Galleta de Chocolate', price: 3000, description: 'Deliciosa galleta con trozos de chocolate' },
    { name: 'Galleta de Banano', price: 3000, description: 'Deliciosa galleta con trozos de chocolate y sabor a banano' },
  ];

  try {
    await Producto.insertMany(productos);
    console.log('Productos insertados correctamente');
  } catch (error) {
    console.error('Error al insertar productos:', error);
  }
};

connectDB().then(() => insertarProductos());
