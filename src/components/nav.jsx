import { identity } from "deso-protocol";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts";
import { getDisplayName } from "../helpers";
import React, { useEffect, useState } from "react";
const getEthereumObject = () => window.ethereum;

export const Nav = () => {
  const { currentUser, isLoading } = useContext(UserContext);
  const [currentAccount, setCurrentAccount] = useState("");
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
  return (
    // <nav className="main-nav">
    //   <Link to="/">Home</Link>
    //   <Link to="/sign-and-submit-tx">Sign and Submit Transaction</Link>
    //   <Link to="switch-account">Switch Accounts</Link>
    //   <div className="main-nav__user-actions">
    //     {isLoading ? (
    //       <div>Loading...</div>
    //     ) : (
    //       <>
    //         {!!currentUser && (
    //           <span className="main-nav__username">
    //             {getDisplayName(currentUser)}
    //           </span>
    //         )}

    //         {!currentUser && (
    //           <button onClick={() => identity.login()}>Login</button>
    //         )}

    //         {!!currentUser && (
    //           <button onClick={() => identity.logout()}>Logout</button>
    //         )}
    //       </>
    //     )}
    //   </div>
    // </nav>



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
                <a href={`/switch-account`}>Switch Accounts</a>
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

            {/* {!currentUser && (
              <button onClick={() => identity.login()}>Login</button>
            )}

            {!!currentUser && (
              <button onClick={() => identity.logout()}>Logout</button>
            )} */}
            <button  onClick={connectWallet}>
            Connect Wallet
            
          </button>
          </>
        )}
      </div>
          </nav>
        </div>
  );
};
