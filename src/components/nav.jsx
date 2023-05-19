import { identity } from "deso-protocol";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts";
import { getDisplayName } from "../helpers";
import React, { useEffect, useState, useContext, createContext } from "react";
import MyContext from './MyContext';
import newContext from "../routes/new";
import "./hello.css";
import Web3 from "web3";
import { ethers } from "ethers";
import SocialLogin from "@biconomy/web3-auth";
import "@biconomy/web3-auth/dist/src/style.css"
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
// get ethereum object from window
const getEthereumObject = () => window.ethereum;
export const Nav = () => {
  const {currentAccount, setCurrentAccount} = useContext(newContext);
  const [currentUser, setCurrentUser] = useState("knkn");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLogin_,setSocialLogin] = useState();
  let options = {
    activeNetworkId: ChainId.POLYGON_MUMBAI,
    supportedNetworksIds: [ChainId.GOERLI, ChainId.POLYGON_MAINNET, ChainId.POLYGON_MUMBAI],
    networkConfig: [
      {
        chainId: ChainId.POLYGON_MUMBAI,
        // Dapp API Key you will get from new Biconomy dashboard that will be live soon
        // Meanwhile you can use the test dapp api key mentioned above
        dappAPIKey: "eEyhUkBOe.b59c0ab0-d93c-4335-801c-8f071c9f5087",
        providerUrl: "https://polygon-mumbai.g.alchemy.com/v2/EfYkpdQH2zsdf2gtiVzKdiCkz0oK7OKi"
      }
    ]
  }

    useEffect(() => {
      const socialLogin = new SocialLogin();
      socialLogin.init();
      const signature1 = socialLogin.whitelistUrl('https://deso-base.vercel.app');
      //whitelist the url
      socialLogin.init({
        whitelistUrls: {
          'https://yourdomain1.com': signature1,
        }
      });
      console.log("social login to be checked here, please take a look: ", socialLogin);
      setSocialLogin(socialLogin);

    }, []);

  const connect = async()=>{
    // 
    // const socialLogin = new SocialLogin();
    // await socialLogin.init();
    // const signature1 = await socialLogin.whitelistUrl('https://deso-base.vercel.app');
    // //whitelist the url
    // await socialLogin.init({
    //   whitelistUrls: {
    //     'https://yourdomain1.com': signature1,
    //   }
    // });
    let socialLogin= socialLogin_;

    
    if (!socialLogin?.provider) {
      socialLogin.showWallet();
      return;
    }    
    // create a provider from the social login provider that 
    // will be used by the smart account package of the Biconomy SDK
    const provider = new ethers.providers.Web3Provider(
        socialLogin.provider,
    );
    // get a list of accounts available with the provider
    const accounts = await provider.listAccounts();
    let smartAccount = new SmartAccount(provider, options);
    smartAccount = await smartAccount.init();
    console.log("EOA address", accounts)
    console.log("Smart Account address", smartAccount.address)
    if (accounts.length != 0) return;
    socialLogin.showWallet();
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
      console.log(currentAccount);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };
  return(
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
            <button  onClick={connect}>
            Connect Wallet
            
          </button>
          </>
        )}
      </div>
          </nav>
          
        </div>
  );

};