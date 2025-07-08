const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔐 Extraer rol desde token (si existe)
const getUsuarioDesdeToken = (req) => {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET || "secreto");
  } catch {
    return null;
  }
};

// 🔐 Registrar usuario
exports.registrarUsuario = async (req, res) => {
  try {
    const { nombres, email, password } = req.body;
    let { rol } = req.body; // puede venir como admin o usuario desde el frontend

    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Si es el primer usuario en el sistema, será admin automáticamente
    const totalUsuarios = await Usuario.countDocuments();

    if (totalUsuarios === 0) {
      rol = "admin";
    } else {
      const usuarioToken = getUsuarioDesdeToken(req);
      // Si no hay token o el rol no es admin, forzar como usuario
      if (!usuarioToken || usuarioToken.rol !== "admin") {
        rol = "usuario";
      }
    }

    const nuevoUsuario = new Usuario({
      nombres,
      email,
      password: hashedPassword,
      rol,
    });

    await nuevoUsuario.save();

    res.status(201).json({ msg: "✅ Usuario creado con éxito" });
  } catch (error) {
    console.error("❌ Error al registrar:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// 🔐 Login de usuario
exports.loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    if (usuario.estado !== "Activo") {
      return res.status(403).json({ msg: "Usuario inactivo. Contacte al administrador." });
    }

    const match = await bcrypt.compare(password, usuario.password);
    if (!match) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      {
        uid: usuario._id,
        email: usuario.email,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "1h" }
    );

    res.json({
      usuario: {
        _id: usuario._id,
        nombres: usuario.nombres,
        email: usuario.email,
        rol: usuario.rol,
        access_token: token,
      },
    });
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// 🔐 Listar todos los usuarios (solo admin)
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarioToken = getUsuarioDesdeToken(req);

    if (!usuarioToken || usuarioToken.rol !== "admin") {
      return res.status(403).json({ msg: "Acceso denegado: solo admin puede ver usuarios." });
    }

    const usuarios = await Usuario.find().select("-password"); // excluye contraseñas
    res.json(usuarios);
  } catch (error) {
    console.error("❌ Error al listar usuarios:", error);
    res.status(500).json({ msg: "Error en el servidor al listar usuarios" });
  }
};



exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombres, email, password, rol } = req.body;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    usuario.nombres = nombres || usuario.nombres;
    usuario.email = email || usuario.email;
    usuario.rol = rol || usuario.rol;

    if (password) {
      if (password.length < 7) {
        return res.status(400).json({ msg: "Contraseña debe tener mínimo 7 caracteres" });
      }
      usuario.password = await bcrypt.hash(password, 10);
    }

    await usuario.save();

    res.json({ msg: "✅ Usuario actualizado correctamente" });
  } catch (error) {
    console.error("❌ Error al actualizar usuario:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};



exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    await usuario.deleteOne(); // También puedes usar Usuario.findByIdAndDelete(id)

    res.json({ msg: "✅ Usuario eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar usuario:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

