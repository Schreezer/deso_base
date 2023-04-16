// import React, { useEffect, useState } from "react";
// import ReactDOM from "react-dom";
// // import "./pp.css";
// import abi from "../poo.json";
// import { ethers } from "ethers";
// const getEthereumObject = () => window.ethereum;

// /*
//  * This function returns the first linked account found.
//  * If there is no account linked, it will return null.
//  */
// export const findMetaMaskAccount = async () => {
//   try {
//     const ethereum = getEthereumObject();

//     /*
//      * First make sure we have access to the Ethereum object.
//      */
//     if (!ethereum) {
//       console.error("Make sure you have Metamask!");
//       ReactDOM.render(<div className ="error" >Please get MetaMask wallet <a href="https://metamask.io">here</a></div>, document.getElementById("display"))
//       return null;
//     }

//     console.log("We have the Ethereum object", ethereum);
//     const accounts = await ethereum.request({ method: "eth_accounts" });

//     if (accounts.length !== 0) {
//       const account = accounts[0];
//       console.log("Found an authorized account:", account);
//       return account;
//     } else {
//       console.error("No authorized account found");
//       return null;
//     }
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };