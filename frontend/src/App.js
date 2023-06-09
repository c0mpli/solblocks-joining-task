import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Addresses from "./pages/Addresses";
import Settings from "./pages/Settings";
import { useAuthContext } from "./hooks/useAuthContext";
import { useEffect, useState } from "react";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("theme")));
  const { user } = useAuthContext();
  const toggleTheme = () => {
    const temp = theme === "light" ? "dark" : "light";
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", JSON.stringify(temp));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
