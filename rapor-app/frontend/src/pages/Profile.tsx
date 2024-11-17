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
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { updateTechnician } from "../features/technicianSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch: AppDispatch = useDispatch();
  const { authUser } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    username: authUser?.username || "",
    email: authUser?.email || "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors: typeof errors = {
      username: "",
      email: "",
      password: "",
    };

    if (formData.username.trim().length < 3)
      newErrors.username = "Kullanıcı adı en az 3 karakter olmalı!";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Geçerli bir email giriniz!";
    if (formData.password && formData.password.trim().length < 6)
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
      await dispatch(
        updateTechnician({ id: authUser?._id, updatedData: formData })
      ).unwrap();
      toast.success("Profil başarıyla güncellendi! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Profil güncellenirken bir hata oluştu!");
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
        Profil Bilgileri
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
          <PasswordInput
            label="Şifre"
            placeholder="Yeni şifre (opsiyonel)"
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
              Güncelle
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Profile;
