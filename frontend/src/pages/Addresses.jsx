import React from "react";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

function Addresses() {
  const { user } = useAuthContext();
  const getAddressDetails = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/user/get-address-details`,
        {
          user: user?.id,
        },
        {
          headers: { token: user?.token },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  React.useEffect(() => {
    getAddressDetails();
  }, []);

  return (
    <div className="AppGlass2">
      <Sidebar />
      <div className="ContentWrapper">
        <ProfileHeader title={"Address Details"} />
        <div className="AppGlass3"></div>
      </div>
    </div>
  );
}

export default Addresses;
