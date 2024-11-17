import { AppShell, NavLink } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { logout } from "../features/authSlice";

const Navbar = ({ close }: any) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { authUser } = useSelector((state: RootState) => state.auth);
  const isAdmin = authUser?.role === "admin";
  const isTechnician = authUser?.role === "technician";

  return (
    <AppShell.Navbar p="md" style={{ gap: "10px" }}>
      <NavLink
        onClick={() => {
          navigate("/");
          close();
        }}
        label="Ana Sayfa"
      />
      <NavLink
        onClick={() => {
          navigate("/about");
          close();
        }}
        label="Hakkımızda"
      />
      {isAdmin && (
        <>
          <NavLink
            onClick={() => {
              navigate("/create-technician");
              close();
            }}
            label="Laborant Tanımla"
          />
          <NavLink
            onClick={() => {
              navigate("/employees");
              close();
            }}
            label="Tüm çalışanlar"
          />
        </>
      )}
      {isTechnician && (
        <>
          <NavLink
            onClick={() => {
              navigate("/create-record");
              close();
            }}
            label="Kayıt Oluştur"
          />
          <NavLink
            onClick={() => {
              navigate("/profile");
              close();
            }}
            label="Profilim"
          />
        </>
      )}
      {authUser ? (
        <NavLink
          onClick={() => {
            dispatch(logout());
            close();
          }}
          label="Çıkış Yap"
          color="red"
        />
      ) : (
        <NavLink
          onClick={() => {
            navigate("/login");
            close();
          }}
          label="Giriş Yap"
        />
      )}
    </AppShell.Navbar>
  );
};

export default Navbar;
