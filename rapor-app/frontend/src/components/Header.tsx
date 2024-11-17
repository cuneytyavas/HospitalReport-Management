import {
  AppShell,
  Burger,
  Button,
  Flex,
  useComputedColorScheme,
  useMantineColorScheme,
  Text,
} from "@mantine/core";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = ({ toggle, opened }: any) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "light" ? "dark" : "light");
  };

  return (
    <AppShell.Header
      style={{
        backgroundColor: computedColorScheme === "dark" ? "#1A1B1E" : "#F5F5F5",
        borderBottom: `1px solid ${
          computedColorScheme === "dark" ? "#2C2E33" : "#E0E0E0"
        }`,
        boxShadow:
          computedColorScheme === "dark"
            ? "0 1px 3px rgba(0, 0, 0, 0.3)"
            : "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        style={{
          padding: "0 20px",
          height: "100%",
        }}
      >
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

        <Text
          size="lg"
          style={{
            color: computedColorScheme === "dark" ? "#f0f0f0" : "#333",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Hastane Rapor
        </Text>

        <Button
          size="sm"
          variant="subtle"
          onClick={toggleColorScheme}
          style={{
            color: computedColorScheme === "dark" ? "#FFC107" : "#3F51B5",
            padding: "8px",
          }}
        >
          {computedColorScheme === "dark" ? (
            <FaSun size={18} />
          ) : (
            <FaMoon size={18} />
          )}
        </Button>
      </Flex>
    </AppShell.Header>
  );
};

export default Header;
