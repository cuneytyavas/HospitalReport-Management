import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Group,
  Anchor,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/authSlice";
import { useForm } from "@mantine/form";
import { useState } from "react";

type ErrorType = string | { message: string };

const Register = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { error } = useSelector((state: RootState) => state.auth);
  const [localError, setLocalError] = useState<ErrorType | null>(null);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },

    validate: {
      username: (value) =>
        value.length < 3 ? "Kullanıcı adı en az 3 karakter olmalıdır" : null,
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value)
          ? null
          : "Geçerli bir email adresi giriniz",
      password: (value) =>
        value.length < 6 ? "Şifre en az 6 karakter olmalıdır" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLocalError(null);
    try {
      await dispatch(register(values)).unwrap();
      navigate("/");
    } catch (err) {
      if (typeof err === "string") {
        setLocalError(err);
      } else if (err && typeof err === "object" && "message" in err) {
        setLocalError((err as { message: string }).message);
      } else {
        setLocalError("Bilinmeyen bir hata oluştu.");
      }
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
      <Title style={{ fontSize: 32, fontWeight: 900, marginBottom: 20 }}>
        Kayıt Ol
      </Title>

      <Paper
        withBorder
        shadow="md"
        p={40}
        radius="md"
        style={{ width: "100%" }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            name="username"
            label="Kullanıcı Adı"
            placeholder="Kullanıcı Adı"
            size="lg"
            required
            {...form.getInputProps("username")}
          />
          <TextInput
            name="email"
            label="Email"
            placeholder="birisi@example.com"
            size="lg"
            required
            mt="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            name="password"
            label="Şifre"
            placeholder="Şifreniz"
            size="lg"
            required
            mt="md"
            {...form.getInputProps("password")}
          />

          <Group mt="xl" style={{ justifyContent: "space-between" }}>
            <Anchor
              component={Link}
              to="/login"
              size="sm"
              style={{ textDecoration: "none" }}
            >
              Hesabınız zaten var mı? Giriş Yap
            </Anchor>
            <Button type="submit" size="lg">
              Kayıt Ol
            </Button>
          </Group>
          {(localError || error) && (
            <p style={{ color: "red", marginTop: "10px" }}>
              {typeof localError === "string"
                ? localError
                : (localError as { message: string })?.message ||
                  error ||
                  "Hata oluştu."}
            </p>
          )}
        </form>
      </Paper>
    </Container>
  );
};

export default Register;
