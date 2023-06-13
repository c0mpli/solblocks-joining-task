import React from "react";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import "./styles/Addresses.css";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";
import useWeiToEth from "../hooks/useWeiToEth";
function Addresses() {
  const { user } = useAuthContext();
  const [userAddressData, setUserAddressData] = React.useState(null);
  const { state } = useLocation();
  const [addressIndex, setAddressIndex] = React.useState(
    state ? state.address : 0
  );
  const [address, setAddress] = React.useState(null);
  const { WeiToEth } = useWeiToEth();

  const getAddressDetails = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/user/get-address-details?user=${user?.id}`,
        {
          headers: { token: user?.token },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUserAddressData(response.data);
        setAddress(response.data.data[addressIndex]);
      });
  };

  const handleChange = (e) => {
    setAddressIndex(e.target.value);
    setAddress(userAddressData?.data[e.target.value]);
  };

  React.useEffect(() => {
    getAddressDetails();
  }, []);
  return (
    <div className="AppGlass2">
      <Sidebar />
      <div className="ContentWrapper">
        <ProfileHeader title={"Address Details"} />
        <div className="AppGlass3">
          <div>
            {address && (
              <>
                <section className="AddressTopBarWrapper">
                  <div className="AccountNameWrapper">
                    <h3>Account: </h3>
                    <select
                      value={addressIndex}
                      onChange={(e) => handleChange(e)}
                    >
                      {userAddressData?.data?.map((address, index) => {
                        return (
                          <option value={index}>{address.address.name}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div>
                    <h3>
                      Balance:{" "}
                      <span className="addressBalance">
                        {userAddressData.settings.balance
                          ? ` ${WeiToEth(address.balance)} Eth`
                          : "Turned off"}
                      </span>
                    </h3>
                  </div>
                </section>
                <div className="transactions-wrapper">
                  <h3>Transactions</h3>
                  {userAddressData.settings.transactions ? (
                    <div className="transactions-container">
                      {userAddressData.settings.transactions ? (
                        <table>
                          <thead>
                            <tr>
                              <th>Txn Hash</th>
                              <th>Block</th>
                              <th>From</th>
                              <th>To</th>
                              <th>Value</th>
                              <th>Txn Fee</th>
                            </tr>
                          </thead>
                          <tbody>
                            {address.transactions?.map((transaction, index) => {
                              return (
                                <tr key={index}>
                                  <td>{transaction.hash}</td>
                                  <td>{transaction.blockNumber}</td>
                                  <td>{transaction.from}</td>
                                  <td>{transaction.to}</td>
                                  <td>{` ${parseFloat(
                                    WeiToEth(transaction.value)
                                  ).toFixed(3)} Eth`}</td>
                                  <td>{` ${parseFloat(
                                    WeiToEth(
                                      transaction.gasPrice * transaction.gasUsed
                                    )
                                  ).toFixed(8)} Eth`}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        "Turned off"
                      )}
                    </div>
                  ) : (
                    <h3>Turned off</h3>
                  )}
                </div>
              </>
            )}
            {!address && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addresses;
