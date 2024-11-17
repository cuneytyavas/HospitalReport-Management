import { generateTokenAndSetCookie } from "../customFunctions/generateToken.js";
import User from "../models/user.model.js";
import Technician from "../models/technician.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Lütfen tüm alanları doldurunuz." });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Kullanıcı adı uygun değil." });
    }

    const userCount = await User.countDocuments();
    const role = userCount === 0 ? "admin" : "user";

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    if (newUser) {
      await newUser.save();
      generateTokenAndSetCookie(res, newUser._id);
    }

    return res
      .status(201)
      .json({ message: "Kullanıcı başarıyla oluşturuldu." });
  } catch (error) {
    console.error("Error in register function:", error);
    res
      .status(500)
      .json({ message: "Kullanıcı oluşturulurken bir hata oluştu.", error });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Lütfen tüm alanları doldurunuz." });
    }

    const user = await User.findOne({ username });
    const technician = await Technician.findOne({ username });

    if (!user && !technician) {
      return res
        .status(401)
        .json({ message: "Geçersiz kullanıcı adı veya şifre." });
    }

    const isPwCorrect = user
      ? await bcrypt.compare(password, user.password)
      : technician
      ? await bcrypt.compare(password, technician.password)
      : false;

    if (!isPwCorrect) {
      return res
        .status(401)
        .json({ message: "Geçersiz kullanıcı adı veya şifre." });
    }

    generateTokenAndSetCookie(res, user ? user._id : technician._id);
    res.status(200).json({ message: "Giriş başarılı." });
  } catch (error) {
    console.error("Error in login function:", error);
    res
      .status(500)
      .json({ message: "Giriş yapılırken bir hata oluştu.", error });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Çıkış yapıldı." });
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const technicianUser = await Technician.findById(req.userId);

    if (!user && !technicianUser) {
      return res
        .status(404)
        .json({ message: "Kullanıcı veya teknisyen bulunamadı." });
    }

    if (technicianUser) {
      return res.status(200).json({
        _id: technicianUser._id,
        username: technicianUser.username,
        email: technicianUser.email,
        role: technicianUser.role,
      });
    }

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in getCurrentUser function:", error);
    res
      .status(500)
      .json({ message: "Kullanıcı bilgisi alınırken bir hata oluştu.", error });
  }
};
