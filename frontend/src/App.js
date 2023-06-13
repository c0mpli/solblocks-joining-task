import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Addresses from "./pages/Addresses";
import Settings from "./pages/Settings";
import { useAuthContext } from "./hooks/useAuthContext";
import { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Signup from "./pages/Signup";

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
      <div className="App" id={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Login />} />
            <Route
              path="/addressdetails"
              element={user ? <Addresses /> : <Login />}
            />
            <Route path="/settings" element={user ? <Settings /> : <Login />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Login />}
            />
            <Route path="/signup" element={user ? <Dashboard /> : <Signup />} />
            <Route path="/login" element={user ? <Dashboard /> : <Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
