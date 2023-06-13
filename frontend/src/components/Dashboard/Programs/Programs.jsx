import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import deleteIcon from "../../../imgs/delete.png";
import "./Programs.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loader from "../../Loader";
import usefetchAddressDetails from "../../../hooks/useFetchAddressDetails";
function Programs() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [programs, setPrograms] = useState();
  const { fetchAddressDetails } = usefetchAddressDetails();

  function getAddresses() {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user/addresses?user=${user?.id}`,
        {
          headers: { token: user?.token },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPrograms(response.data);
      });
  }
  function handleDelete(index) {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/user/delete-address`,
        {
          index: index,
          user: user?.id,
        },
        { headers: { token: user?.token } }
      )
      .then((response) => {
        fetchAddressDetails(user?.id, user?.token);
        alert("Delted Successfully");
        getAddresses();
      });
  }
  useEffect(() => {
    getAddresses();
  }, []);

  return (
    <div className="Programs">
      <div>
        {!programs && <Loader />}
        {programs?.map((item, key) => {
          return (
            <div className="card" key={key}>
              <div className="card-top">
                <h1>{item.name}</h1>
              </div>
              <div className="card-bottom">
                <p>{item.description}</p>
                <button
                  onClick={() =>
                    navigate("/addressdetails", { state: { address: key } })
                  }
                >
                  View Details
                </button>
                <button
                  className="deleteButton"
                  onClick={(e) => handleDelete(key)}
                >
                  <img
                    src={deleteIcon}
                    style={{
                      height: "1.5rem",
                      width: "1.5rem",
                      paddingBottom: "0.3rem",
                    }}
                  />
                </button>
              </div>
            </div>
          );
        })}
        {programs?.length === 0 && (
          <div className="card-top">
            <p>No addresses. Add some to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Programs;
