import { identity } from "deso-protocol";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts";
import { getDisplayName } from "../helpers";
import React, { useEffect, useState, useContext, createContext } from "react";
import MyContext from './MyContext';
import newContext from "../routes/new";
// get ethereum object
const getEthereumObject = () => window.ethereum;
// const MyContext = createContext();
// export const { currentAccount, setCurrentAccount }= useState(null);
export const Nav = () => {
  const {currentAccount, setCurrentAccount} = useContext(newContext);
  const [currentUser, setCurrentUser] = useState("knkn");
  const [isLoading, setIsLoading] = useState(false);



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
      console.log(currentAccount);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };
  return(
    // <MyContext.Provider value={{currentAccount,}>
    <div id="sidebar">
    
          <h1>D Quester</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search contacts"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            <form method="post">
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            <ul>
              <li>
                {/* <a href={`/contacts/1`}>Your Name</a> */}
                <a href={`/`}>Home</a>
              </li>
              {/* <li>
           
                <a href={`/Profile`}></a>
              </li> */}
              <li>
                <a href= {'/sign-and-submit-tx'}>Ask a Question</a>
              </li>
              <li>
                {/* <a href={`/switch-account`}>Switch Accounts</a> */}
              </li>

            </ul>

            <div className="main-nav__user-actions">
         {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {!!currentUser && (
              <span className="main-nav__username">
                {getDisplayName(currentUser)}
              </span>
            )}
            <button  onClick={connectWallet}>
            Connect Wallet
            
          </button>
          </>
        )}
      </div>
          </nav>
          
        </div>
        // </MyContext.Provider> 

  );

};
// export default Nav;