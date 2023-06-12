import axios from "axios";

function usefetchAddressDetails() {
  const fetchAddressDetails = async (userId, userToken) => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/user/fetch-address-details`,
        {
          user: userId,
        },
        {
          headers: { token: userToken },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  };
  return { fetchAddressDetails };
}

export default usefetchAddressDetails;
