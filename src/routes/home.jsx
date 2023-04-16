import abi from "..//poo.json";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
const getEthereumObject = () => window.ethereum;

export const Home = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xc2d8Ae1EF720FCeFa0368253548c4Fc7f06094d4";
  const contractABI = abi.abi;
  const [allWaves, setAllWaves] = useState([]);
  const getAllQuestions = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        const questions = await wavePortalContract.getAllCards();
        let wavesCleaned = [];
        questions.forEach(wave => {
          wavesCleaned.push({
            Questioner: wave.querrier,
            timestamp: new Date(wave.timestamp * 1000),
            Question: wave.question,
            Bounty: wave.bounty
          });
        });
        wavesCleaned.reverse();
        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }
  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  

  };

  function Display_waves(props){
    return(
      props.value.map((wave, index) => {
      
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
           
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
           
        
    
      })
    ) }

  return (
    <>
    <div >
      {/* <h1>Welcome to D Quester</h1> */}
      {/* <p>
        This is a simple example app that demonstrates how to use{" "}
        <a
          href="https://www.npmjs.com/package/deso-protocol"
          target="_blank"
          rel="noopener noreferrer"
        >
          deso-protocol
        </a>
      </p> */}
      <Display_waves value= {allWaves} />
    </div>
    </>
  );
};
