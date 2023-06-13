import React, { useEffect, useState } from "react";
import "./Cards.css";
import Card from "../Card/Card";
import axios from "axios";

const Cards = () => {
  const [totalSupplyEth, setTotalSupplyEth] = useState("loading...");
  const [ethPrice, setEthPrice] = useState("loading...");

  function getTotalSupplyEth() {
    axios
      .get(
        `https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=1FREZSJA6ECQE5B6CZRXXPXU4DC3NPDA9W}`
      )
      .then((response) => {
        setTotalSupplyEth(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getEthPrice() {
    axios
      .get(
        `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=1FREZSJA6ECQE5B6CZRXXPXU4DC3NPDA9W}`
      )
      .then((response) => {
        setEthPrice(response.data.result.ethusd);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    const intervalCall = setInterval(async () => {
      getTotalSupplyEth();
      getEthPrice();
    }, 2000);
    return () => {
      // clean up
      clearInterval(intervalCall);
    };
  }, []);
  return (
    <>
      <div className="Cards">
        <div className="parentContainer">
          <Card title="Total Eth Supply" value={totalSupplyEth} />
        </div>
        <div className="parentContainer">
          <Card title="ETH Price" value={`$${ethPrice}`} />
        </div>
      </div>
    </>
  );
};

export default Cards;
