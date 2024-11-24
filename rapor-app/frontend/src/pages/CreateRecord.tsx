import { useState } from "react";
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
import { AppDispatch } from "../store";
import { RootState } from "../store";
import { createRecord } from "../features/recordSlice";
import { CreateRecordType } from "../types/recordTypes";
import Compressor from "compressorjs";
import toast from "react-hot-toast";

const CreateRecord = () => {
  const dispatch: AppDispatch = useDispatch();
  const { authUser } = useSelector((state: RootState) => state.auth);
  const { isLoading, error } = useSelector((state: RootState) => state.record);

  const [formError, setFormError] = useState<string>("");
  const [formData, setFormData] = useState<CreateRecordType>({
    fileNumber: "",
    patientName: "",
    patientSurname: "",
    patientTcId: "",
    diagnosticTitle: "",
    diagnosticDetails: "",
    recordImg: "",
    technician: "",
  });

  const validateInput = (name: string, value: string) => {
    switch (name) {
      case "fileNumber":
        if (value.length < 5)
          return "Dosya numarası en az 5 karakter olmalıdır.";
        break;
      case "patientName":
        if (value.length < 2) return "Hasta adı en az 2 karakter olmalıdır.";
        break;
      case "patientSurname":
        if (value.length < 2) return "Hasta soyadı en az 2 karakter olmalıdır.";
        break;
      case "patientTcId":
        if (value.length !== 11)
          return "TC Kimlik Numarası 11 haneli olmalıdır.";
        break;
      case "diagnosticTitle":
        if (value.length < 2 || value.length > 30)
          return "Tanı başlığı 2-30 karakter arasında olmalıdır.";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const error = validateInput(name, value);
    setFormError(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.recordImg) {
      setFormError("Lütfen bir fotoğraf yükleyin.");
      return;
    }
    try {
      const res = await dispatch(
        createRecord({ ...formData, technician: authUser?.email })
      );
      if (!res.payload) {
        toast.error("Rapor oluşturulamadı." + error);

        return;
      } else {
        toast.success("Rapor başarıyla oluşturuldu.");
      }
    } catch (error) {
      toast.error(error as string);
    }
  };

  const handleFileChange = (file: File | null) => {
    if (!file) {
      setFormError("Herhangi bir dosya seçiniz.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Dosya boyutu 5MB'dan büyük olamaz.");
      return;
    }

    new Compressor(file, {
      quality: 0.5,
      success(result) {
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onloadend = () => {
          setFormData({ ...formData, recordImg: reader.result as string });
        };
      },
      error(err) {
        console.error(err.message);
        setFormError("Dosya sıkıştırma hatası: " + err.message);
      },
    });
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
        Yeni Rapor Oluştur
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
            required
            size="lg"
            name="fileNumber"
            value={formData.fileNumber}
            onChange={handleChange}
            error={
              formError &&
              formData.fileNumber &&
              formError.includes("Dosya numarası")
            }
          />
          <TextInput
            label="Hasta Adı"
            placeholder="Hasta Adı"
            required
            size="lg"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            error={
              formError &&
              formData.patientName &&
              formError.includes("Hasta adı")
            }
          />
          <TextInput
            label="Hasta Soyadı"
            placeholder="Hasta Soyadı"
            required
            size="lg"
            name="patientSurname"
            value={formData.patientSurname}
            onChange={handleChange}
            error={
              formError &&
              formData.patientSurname &&
              formError.includes("Hasta soyadı")
            }
          />
          <TextInput
            label="Hasta TC Kimlik No"
            placeholder="Hasta TC Kimlik No"
            required
            size="lg"
            name="patientTcId"
            value={formData.patientTcId}
            onChange={handleChange}
            error={
              formError &&
              formData.patientTcId &&
              formError.includes("TC Kimlik Numarası")
            }
          />
          <TextInput
            label="Tanı Başlığı"
            placeholder="Tanı Başlığı"
            required
            size="lg"
            name="diagnosticTitle"
            value={formData.diagnosticTitle}
            onChange={handleChange}
            error={
              formError &&
              formData.diagnosticTitle &&
              formError.includes("Tanı başlığı")
            }
          />
          <Textarea
            label="Tanı Detayları"
            placeholder="Tanı Detayları"
            required
            size="lg"
            name="diagnosticDetails"
            value={formData.diagnosticDetails}
            onChange={handleChange}
          />
          <FileInput
            label="Fotoğraf"
            placeholder="Fotoğraf seçiniz"
            required
            onChange={handleFileChange}
            error={formError}
          />

          <Button
            type="submit"
            size="md"
            style={{ width: "100%", marginTop: 20 }}
            disabled={isLoading}
          >
            Rapor Oluştur
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateRecord;
