import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import "./styles/Settings.css";
import Loader from "../components/Loader";
function Settings() {
  const { user } = useAuthContext();
  const [settings, setSettings] = React.useState(null);
  const settingsData = [
    {
      title: "View Balance",
      name: "balance",
      value: true,
    },
    {
      title: "View Transactions",
      name: "transactions",
      value: true,
    },
  ];
  const handleSave = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/user/update-settings`,
        {
          balance: settings.balance,
          transactions: settings.transactions,
          user: user?.id,
        },
        {
          headers: { token: user?.token },
        }
      )
      .then((response) => {
        alert("Settings Updated");
        setSettings(response.data);
        getSettings();
      });
  };

  const getSettings = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user/get-settings?user=${user?.id}`,
        {
          headers: { token: user?.token },
        }
      )
      .then((response) => {
        console.log(response.data);
        setSettings(response.data);
      });
  };

  React.useEffect(() => {
    getSettings();
  }, []);
  return (
    <div className="AppGlass2">
      <Sidebar />
      <div className="ContentWrapper">
        <ProfileHeader title={"Settings"} />
        <div className="AppGlass3">
          <div className="SettingsWrapper">
            <h2>Data storage settings</h2>
            {settings &&
              settingsData.map((item, index) => {
                return (
                  <div key={index} className="settingsInputWrapper">
                    <input
                      type="checkbox"
                      name={item.name}
                      checked={settings[item.name]}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          [e.target.name]: e.target.checked,
                        })
                      }
                    />
                    <label>{item.title}</label>
                  </div>
                );
              })}
            {!settings && <Loader />}
            <button className="standard-button" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
