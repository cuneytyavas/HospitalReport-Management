import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Group,
} from "@mantine/core";
import { useState } from "react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { createTechnician } from "../features/technicianSlice";
import toast from "react-hot-toast";

const CreateTechnician = () => {
  const dispatch: AppDispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    hospitalId: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    hospitalId: "",
  });

  const validateForm = () => {
    const newErrors: typeof errors = {
      name: "",
      surname: "",
      username: "",
      email: "",
      password: "",
      hospitalId: "",
    };

    if (formData.name.trim().length === 0) newErrors.name = "Ad gerekli!";
    if (formData.surname.trim().length === 0)
      newErrors.surname = "Soyad gerekli!";
    if (formData.username.trim().length < 3)
      newErrors.username = "Kullanıcı adı en az 3 karakter olmalı!";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Geçerli bir email giriniz!";
    if (formData.hospitalId.trim().length !== 7)
      newErrors.hospitalId = "Hastane ID 7 karakter olmalı!";
    if (formData.password.trim().length < 6)
      newErrors.password = "Şifre en az 6 karakter olmalı!";

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Formu kontrol edin!");
      return;
    }

    try {
      await dispatch(createTechnician(formData)).unwrap();
      toast.success("Laborant başarıyla oluşturuldu! 🎉");
      setFormData({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        hospitalId: "",
      });
    } catch (error) {
      console.error(error);
      toast.error("Laborant oluşturulurken bir hata oluştu!");
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
        Laborant Tanımla
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
            label="Ad"
            placeholder="Ad"
            required
            size="lg"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextInput
            label="Soyad"
            placeholder="Soyad"
            required
            size="lg"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            error={errors.surname}
          />
          <TextInput
            min={3}
            label="Kullanıcı Adı"
            placeholder="Kullanıcı Adı"
            required
            size="lg"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={errors.username}
          />
          <TextInput
            label="Email"
            placeholder="birisi@example.com"
            required
            size="lg"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextInput
            label="Hastane ID"
            placeholder="Hastane ID"
            required
            size="lg"
            name="hospitalId"
            value={formData.hospitalId}
            onChange={handleChange}
            error={errors.hospitalId}
          />
          <PasswordInput
            min={6}
            label="Şifre"
            placeholder="Şifreniz"
            required
            mt="md"
            size="lg"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Group
            mt="lg"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button type="submit" size="lg">
              Laborant oluştur
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateTechnician;
