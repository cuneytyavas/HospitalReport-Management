import Record from "../models/record.model.js";
import Technician from "../models/technician.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createRecord = async (req, res) => {
  try {
    const reqEmployee = await Technician.findById(req.userId);

    const {
      fileNumber,
      patientName,
      patientSurname,
      patientTcId,
      diagnosticTitle,
      diagnosticDetails,
      recordImg,
    } = req.body;
    if (
      !fileNumber ||
      !patientName ||
      !patientSurname ||
      !patientTcId ||
      !diagnosticTitle ||
      !diagnosticDetails ||
      !recordImg
    ) {
      return res.status(400).json({ message: "Lütfen tüm alanları doldurun." });
    }

    const existingRecord = await Record.findOne({ fileNumber });
    if (existingRecord) {
      return res
        .status(400)
        .json({ message: "Bu dosya numarası zaten mevcut." });
    }

    const uploadedResponse = await cloudinary.uploader.upload(recordImg, {
      folder: "hospital-record-app",
    });
    const img = uploadedResponse.secure_url;

    const newRecord = new Record({
      fileNumber,
      patientName,
      patientSurname,
      patientTcId,
      diagnosticTitle,
      diagnosticDetails,
      recordImg: img,
      technician: reqEmployee._id,
    });

    if (newRecord) {
      await newRecord.save();
      reqEmployee.records.push(newRecord._id);
      await reqEmployee.save();
      res.status(201).json(newRecord);
    }
  } catch (error) {
    console.log("Error in createRecord:", error);
    res.status(500).json({ message: "Bir hata oluştu.", error });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const { recordImg: newRecordImg, ...inputs } = req.body;

    const oldRecord = await Record.findById(req.params.id);
    if (!oldRecord) {
      return res.status(404).json({ message: "Kayıt bulunamadı." });
    }

    let updatedRecordImg = oldRecord.recordImg;

    if (newRecordImg) {
      const oldPublicId = oldRecord.recordImg.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`hospital-record-app/${oldPublicId}`);

      const uploadedResponse = await cloudinary.uploader.upload(newRecordImg, {
        folder: "hospital-record-app",
      });
      updatedRecordImg = uploadedResponse.secure_url;
    }

    Object.keys(inputs).forEach((key) => {
      if (!inputs[key]) {
        delete inputs[key];
      }
    });

    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...inputs,
          recordImg: updatedRecordImg,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error("Error in updateRecord:", error);
    res.status(500).json({ message: "Bir hata oluştu.", error });
  }
};

export const getAllRecords = async (req, res) => {
  try {
    const {
      patientName,
      patientSurname,
      patientTcId,
      technicianName,
      technicianSurname,
      oldest,
      newest,
    } = req.query;

    const query = {};

    if (patientName) query.patientName = { $regex: patientName, $options: "i" };
    if (patientSurname)
      query.patientSurname = { $regex: patientSurname, $options: "i" };
    if (patientTcId) query.patientTcId = { $regex: patientTcId, $options: "i" };

    let sort = {};
    if (newest) sort = { date: -1 };
    else if (oldest) sort = { date: 1 };
    else sort = { date: -1 };

    const records = await Record.find(query)
      .populate({
        path: "technician",
        select: "name surname",
        match: {
          ...(technicianName && {
            name: { $regex: technicianName, $options: "i" },
          }),
          ...(technicianSurname && {
            surname: { $regex: technicianSurname, $options: "i" },
          }),
        },
      })
      .sort(sort)
      .exec();

    const filteredRecords = records.filter(
      (record) => record.technician !== null
    );
    if (filteredRecords.length === 0) return res.status(200).json([]);

    res.status(200).json(filteredRecords);
  } catch (error) {
    console.error("Error in getAllRecords:", error);
    res.status(500).json({ message: "Error while fetching records.", error });
  }
};

export const getRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id).populate("technician");
    if (!record) {
      return res.status(404).json({ message: "Kayıt bulunamadı." });
    }
    res.status(200).json(record);
  } catch (error) {
    console.error("Error in getRecord:", error);
    res.status(500).json({ message: "Bir hata oluştu.", error });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ message: "Kayıt bulunamadı." });
    }
    res.status(200).json({ message: "Kayıt başarıyla silindi." });
  } catch (error) {
    console.error("Error in deleteRecord:", error);
    res.status(500).json({ message: "Bir hata oluştu.", error });
  }
};
