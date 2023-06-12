import React from "react";
import Sidebar from "../components/Sidebar";
import ProfileHeader from "../components/ProfileHeader";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import Web3 from "web3";
import "./styles/Addresses.css";
function Addresses() {
  const { user } = useAuthContext();
  const [userAddressData, setUserAddressData] = React.useState(null);
  const [addressIndex, setAddressIndex] = React.useState(0);
  const [address, setAddress] = React.useState(null);

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
    //fetchAddressDetails();
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
                      Account Balance:{" "}
                      {userAddressData.settings.balance
                        ? ` ${Web3.utils.fromWei(address.balance, "ether")} Eth`
                        : "Turned off"}
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
                                    Web3.utils.fromWei(
                                      transaction.value,
                                      "ether"
                                    )
                                  ).toFixed(3)} Eth`}</td>
                                  <td>{` ${parseFloat(
                                    Web3.utils.fromWei(
                                      transaction.gasPrice *
                                        transaction.gasUsed,
                                      "ether"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addresses;
