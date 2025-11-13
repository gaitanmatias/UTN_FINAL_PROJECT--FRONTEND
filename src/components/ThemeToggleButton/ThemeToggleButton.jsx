import { useTheme } from "../../context/ThemeContext";
import { ICONS } from "../../constants/icons";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="navbar__theme-toggle-btn"
      aria-label="Cambiar tema"
    >
      {theme === "light" ? ICONS.darkMode : ICONS.lightMode}
    </button>
  );
};

export default ThemeToggleButton;
