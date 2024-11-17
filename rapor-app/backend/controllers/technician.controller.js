import Technician from "../models/technician.model.js";
import bcrypt from "bcryptjs";

export const createTechnician = async (req, res) => {
  try {
    const { name, surname, username, email, password, hospitalId } = req.body;

    if (!name || !surname || !username || !email || !password || !hospitalId) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
    }

    const existingUsername = await Technician.findOne({
      username,
    });
    const existingHospitalId = await Technician.findOne({
      hospitalId,
    });
    if (existingUsername || existingHospitalId) {
      return res.status(400).json({
        message: "Bu kullanıcı adı veya HastaneId zaten kullanılıyor.",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await Technician.create({
      name,
      surname,
      username,
      email,
      password: hashedPassword,
      hospitalId,
    });

    res.status(201).json({ message: "Teknisyen başarı ile oluşturuldu." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTechnician = async (req, res) => {
  try {
    const { password, ...inputs } = req.body;

    const existingTechnician = await Technician.findById(req.params.id);
    if (!existingTechnician) {
      return res.status(404).json({ message: "Teknisyen bulunamadı." });
    }

    if (req.userId.toString() !== existingTechnician._id.toString()) {
      return res
        .status(403)
        .json({ message: "Bu işlemi yapmaya yetkiniz yok." });
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      inputs.password = hashedPassword;
    }

    const updatedTechnician = await Technician.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...inputs,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedTechnician);
  } catch (error) {
    console.error("Error in updateTechnician:", error);
    res
      .status(500)
      .json({ message: "Teknisyen güncellenirken bir hata oluştu.", error });
  }
};

export const deleteTechnician = async (req, res) => {
  try {
    await Technician.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Teknisyen başarı ile silindi." });
  } catch (error) {
    console.log("Error in deleteTechnician:", error);
    res
      .status(500)
      .json({ message: "Teknisyen silinirken bir hata oluştu.", error });
  }
};

export const getAllTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find();
    if (technicians.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(technicians);
  } catch (error) {
    console.log("Error in getAllTechnicians:", error);
    res
      .status(500)
      .json({ message: "Teknisyenler getirilirken bir hata oluştu.", error });
  }
};
export const getTechnician = async (req, res) => {
  try {
    const technician = await Technician.findById(req.params.id);
    if (!technician) {
      return res.status(404).json({ message: "Teknisyen bulunamadı." });
    }
    res.status(200).json(technician);
  } catch (error) {
    console.log("Error in getTechnician:", error);
    res
      .status(500)
      .json({ message: "Teknisyen getirilirken bir hata oluştu.", error });
  }
};
