import "@mantine/core/styles.css";
import "./App.css";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import RouterSwitcher from "./components/RouterSwitcher";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./features/authSlice";
import { useLocation } from "react-router-dom";

function App() {
  const [opened, { close, toggle }] = useDisclosure();
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch, location]);

  return (
    <div className="App">
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <Header toggle={toggle} opened={opened} />

        <Navbar close={close} opened={opened} />

        <AppShell.Main>
          <RouterSwitcher />
        </AppShell.Main>
      </AppShell>
    </div>
  );
}

export default App;
