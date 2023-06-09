import React from "react";
import ProfileImage from "../imgs/img1.png";
import Switch from "react-switch";
import { useTheme } from "../context/ThemeContext";
import "./styles/ProfileHeader.css";
import { useAuthContext } from "../hooks/useAuthContext";

function ProfileHeader(props) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuthContext();
  return (
    <div className="AppGlass3 ProfileHeader">
      <div className="HeaderContent">
        <h1>{props.title}</h1>
        <Switch
          onChange={toggleTheme}
          checked={theme === "dark"}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor={"#FFB800"}
          offColor={"#8B8A8F"}
        />
      </div>
      <div
        className="profile"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <img src={ProfileImage} style={{ height: "2rem", width: "2rem" }} />
        <div className="profile-info">
          <h2>{user?.email}</h2>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
