import { useEffect, useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Paper,
  Title,
  Container,
  FileInput,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { UpdateRecordType } from "../types/recordTypes";
import Compressor from "compressorjs";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { updateRecord } from "../features/recordSlice";
import { fetchRecordById } from "../features/recordSlice";

const UpdateRecordPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const { record } = useSelector((state: RootState) => state.record);
  const typedRecord = record as UpdateRecordType;

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fileNumber: typedRecord?.fileNumber || "",
    patientName: typedRecord?.patientName || "",
    patientSurname: typedRecord?.patientSurname || "",
    patientTcId: typedRecord?.patientTcId || "",
    diagnosticTitle: typedRecord?.diagnosticTitle || "",
    diagnosticDetails: typedRecord?.diagnosticDetails || "",
    recordImg: "",
  });

  useEffect(() => {
    dispatch(fetchRecordById(id as string)).unwrap();
  }, [dispatch, id]);

  const validateInput = (name: string, value: string): string => {
    if (!value) return "";

    switch (name) {
      case "fileNumber":
        return value.length < 6
          ? "Dosya numarası en az 6 karakter olmalıdır."
          : "";
      case "patientName":
        return value.length < 2 ? "Hasta adı en az 2 karakter olmalıdır." : "";
      case "patientSurname":
        return value.length < 2
          ? "Hasta soyadı en az 2 karakter olmalıdır."
          : "";
      case "patientTcId":
        return value.length !== 11
          ? "TC Kimlik Numarası 11 haneli olmalıdır."
          : "";
      case "diagnosticTitle":
        return value.length < 2 || value.length > 30
          ? "Tanı başlığı 2-30 karakter arasında olmalıdır."
          : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const error = validateInput(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setFormErrors((prev) => ({ ...prev, recordImg: "" }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormErrors((prev) => ({
        ...prev,
        recordImg: "Dosya boyutu 5MB'dan büyük olamaz.",
      }));
      return;
    }

    new Compressor(file, {
      quality: 0.5,
      success(result) {
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            recordImg: reader.result as string,
          }));
        };
      },
      error(err) {
        console.error(err.message);
        setFormErrors((prev) => ({
          ...prev,
          recordImg: "Dosya sıkıştırma hatası: " + err.message,
        }));
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const updatedData = Object.fromEntries(
        Object.entries(formData).filter(([_, value]) => value !== "")
      );

      await dispatch(updateRecord({ id: id as string, updatedData })).unwrap();
      toast.success("Kayıt başarıyla güncellendi.");
    } catch (error) {
      console.error("Error updating record:", error);
      toast.error("Kayıt güncellenirken bir hata oluştu.");
    }
  };

  return (
    <Container
      size={480}
      my={100}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Title style={{ textAlign: "center", fontSize: 32, fontWeight: 900 }}>
        Rapor Güncelle
      </Title>

      <Paper
        withBorder
        shadow="md"
        p={40}
        mt={20}
        radius="md"
        style={{ width: "100%" }}
      >
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Dosya Numarası"
            placeholder="Dosya Numarası"
            size="lg"
            name="fileNumber"
            value={formData.fileNumber}
            onChange={handleChange}
            error={formErrors.fileNumber}
          />
          <TextInput
            label="Hasta Adı"
            placeholder="Hasta Adı"
            size="lg"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            error={formErrors.patientName}
          />
          <TextInput
            label="Hasta Soyadı"
            placeholder="Hasta Soyadı"
            size="lg"
            name="patientSurname"
            value={formData.patientSurname}
            onChange={handleChange}
            error={formErrors.patientSurname}
          />
          <TextInput
            label="Hasta TC Kimlik No"
            placeholder="Hasta TC Kimlik No"
            size="lg"
            name="patientTcId"
            value={formData.patientTcId}
            onChange={handleChange}
            error={formErrors.patientTcId}
          />
          <TextInput
            label="Tanı Başlığı"
            placeholder="Tanı Başlığı"
            size="lg"
            name="diagnosticTitle"
            value={formData.diagnosticTitle}
            onChange={handleChange}
            error={formErrors.diagnosticTitle}
          />
          <Textarea
            label="Tanı Detayları"
            placeholder="Tanı Detayları"
            size="lg"
            name="diagnosticDetails"
            value={formData.diagnosticDetails}
            onChange={handleChange}
          />
          <FileInput
            label="Fotoğraf"
            placeholder="Fotoğraf seçiniz"
            onChange={handleFileChange}
            error={formErrors.recordImg}
          />

          <Button
            type="submit"
            size="md"
            style={{ width: "100%", marginTop: 20 }}
          >
            Rapor Güncelle
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateRecordPage;
