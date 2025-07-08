const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
const getConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conexión a MongoDB Atlas exitosa");
    console.log("🧩 Base de datos conectada a:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error);
    process.exit(1); // Detiene el servidor si no conecta
  }
};

getConnection();

// Rutas principales
app.use("/api/tipos", require("./routes/tipoRoute"));
app.use("/api/categorias", require("./routes/categoriaRoute"));
app.use("/api/proveedores", require("./routes/proveedorRoute"));
app.use("/api/menus", require("./routes/menuRoute"));
app.use("/api/alimentos", require("./routes/alimentoRoute"));
app.use("/api/usuarios", require("./routes/usuarioRoutes")); // Registro/Login/CRUD
app.use("/api/auth", require("./routes/authRoutes"));        // Recuperar/Reset password

// Ruta básica de prueba
app.get("/", (req, res) => {
  res.send("✅ API funcionando correctamente");
});

// Puerto del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
});
