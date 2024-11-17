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
import { login } from "../features/authSlice";
import { toast } from "react-hot-toast";
import { useForm } from "@mantine/form";
import { useState } from "react";

type ErrorType = string | { message: string };

const Login = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [localError, setLocalError] = useState<ErrorType | null>(null);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) =>
        value.trim().length < 3
          ? "Kullanıcı adı en az 3 karakter olmalıdır"
          : null,
      password: (value) =>
        value.trim().length < 6 ? "Şifre en az 6 karakter olmalıdır" : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setLocalError(null);
    try {
      await dispatch(login(values)).unwrap();
      toast.success("Giriş başarılı");
      navigate("/");
    } catch (err) {
      if (typeof err === "string") {
        setLocalError(err);
      } else if (err && typeof err === "object" && "message" in err) {
        setLocalError((err as { message: string }).message);
      } else {
        setLocalError("Bilinmeyen bir hata oluştu.");
      }
      toast.error("Giriş başarısız: " + (localError || "Hata oluştu."));
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
        Welcome back!
      </Title>

      <Paper
        withBorder
        shadow="md"
        p={40}
        mt={20}
        radius="md"
        style={{ width: "100%" }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            name="username"
            label="Kullanıcı adı"
            placeholder="Kullanıcı adınız"
            required
            size="lg"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            name="password"
            label="Şifre"
            placeholder="Şifreniz"
            required
            mt="md"
            size="lg"
            {...form.getInputProps("password")}
          />

          <Group
            mt="lg"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Link to="/register">
              <Anchor component="button" type="button" size="sm">
                Hesabınız yok mu? Kayıt olun.
              </Anchor>
            </Link>
            <Button type="submit" size="lg" loading={isLoading}>
              Giriş Yap
            </Button>
          </Group>
          {(localError || error) && (
            <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>
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

export default Login;
