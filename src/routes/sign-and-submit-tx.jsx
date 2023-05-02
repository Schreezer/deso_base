import { ERROR_TYPES, identity, submitPost } from "deso-protocol";
import { useContext } from "react";
import React, { useEffect, useState } from "react";
import { UserContext } from "../contexts";
import abi from "..//poo.json";
import abby from "../abby.json";
import "./shramp.css";
import { ethers } from "ethers";
import "./style.css";

// import firebase from 'firebase/app';
// import 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, child, push, update } from "firebase/database";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn_zW1FBedTCeCmqa6VWnvy4pnVJ5PkOc",
  authDomain: "d-quester.firebaseapp.com",
  projectId: "d-quester",
  storageBucket: "d-quester.appspot.com",
  messagingSenderId: "96750642368",
  appId: "1:96750642368:web:8596fd770651d409e0f925",
  databaseURL: "https://d-quester-default-rtdb.asia-southeast1.firebasedatabase.app/",
  measurementId: "G-39Q7YLHJJ4"
};

const app = initializeApp(firebaseConfig);

function writeNewPost(user,quest,bounty) {
  const db = getDatabase();

  // A post entry.
  const postData = {
    questioner: user,
    Question: quest,
    Bounty: bounty,
  
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'posts')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + user + '/' + newPostKey] = postData;

  return update(ref(db), updates);
}


function call(){
  console.log(writeNewPost(4,"picky sdkfbefbe","titi", "boddigiwenewfiwefief"));
  console.log("called");
}
// Store the book's information in the database

const getEthereumObject = () => window.ethereum;
// const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const SignAndSubmitTx = () => {
  const { currentUser, isLoading } = useContext(UserContext);
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0x15796323a77408BBAD4C05535Bf7fFb10E8Bb6AB";
  
  const [Question, setQuestion] = useState("");
  const [Bounty, setBounty] = useState("");
  function handleChangeQ(e) {
    setQuestion(e.target.value);
  }
  function handleChangeB(e) {
    setBounty(e.target.value);
  }
  const changeOwner = async () => {
    const contractABBY = abby.abi; // abi file of the token
    const contractAddres = "0x9264D07a0EB63521e5AB0286f77cf8BD7338f1Fe";
    // this is the address of the token contract (QUEST)
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ERC20 = new ethers.Contract(contractAddres, contractABBY, signer);
        // const waveTxn = await ERC20.set_owner("0x79C611fE3E55A31a94879E0887D62cBCaf2a0CF9", { gasLimit: 300000 });
        // waveTxn.h
        const owner = await ERC20.owner();
        console.log("Mining...", owner); 
        // await owner.wait();
        // console.log("Mined -- ", owner.hash);
        alert("Transaction complete");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        console.log("mesa here");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contractABI = abi.abi;
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        // console.log("Retrieved total wave count...", count.toNumber());

        /*
        * Execute the actual wave from your smart contract
        */
       // a function that generates the hash of the question:
        const hash = (s) => {
          /* Simple hash function. */
          var a = 1, c = 0, h, o;
          if (s) {
            a = 0;
            /*jshint plusplus:false bitwise:false*/
            for (h = s.length - 1; h >= 0; h--) {
              o = s.charCodeAt(h);
              a = (a<<6&268435455) + o + (o<<14);
              c = a & 266338304;
              a = c!==0?a^c>>21:a;
            }
          } else {
            return a;
          }
          return String(a);
        };
        const hashOfQuestion = hash(Question);
        const waveTxn = await wavePortalContract.quest(Bounty,hash(Question));
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        // a function that converts the input vauriable to a string form integer:
        // const convert = (x) => {
        //   var s = "";
        //   while (x > 0) {
        //     s = String(x % 10) + s;
        //     x = Math.floor(x / 10);
        //   }
        //   return s;
        // };
        // const bounty = convert(Bounty);
        writeNewPost(accounts[0],Question,Bounty);
        
        
        console.log("Mining...", waveTxn.hash);
        // SetwaveButton("Processing");
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);
        alert("Transaction complete");
        // SetwaveButton("Wave at me");
        // count = await wavePortalContract.getTotalWaves();
        // console.log("Retrieved total wave count...", count.toNumber());
        // let value= await wavePortalContract.result();
        
      } else {
        alert("Could Not Connect to Wallet");
      
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      alert("Get MetaMask!");
      console.log(error);
    }
  }

  return(
    <div>
       <textarea
  name="post-textarea"
  class="post-textarea"
  cols={60}
  rows={10}
  placeholder="Enter Question Here"
  onChange={handleChangeQ}
></textarea>
<input
  type="text"
  class="bounty-input"
  placeholder="Enter Bounty Here"
  onChange={handleChangeB}
/>
<button class="submit-button" onClick={wave}>Submit</button>

  {/* <button onClick={changeOwner}>Change Owner</button> */}
  {/* <button onClick={call}>Call</button> */}

</div>
  )

  // let hasPostingPermissions = identity.hasPermissions({
  //   TransactionCountLimitMap: {
  //     SUBMIT_POST: 1,
  //   },
  // });

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (!currentUser || !currentUser.BalanceNanos) {
  //   return (
  //     <button
  //       onClick={() => {
  //         identity
  //           .login({
  //             getFreeDeso: true,
  //           })
  //           .catch((err) => {
  //             if (err?.type === ERROR_TYPES.NO_MONEY) {
  //               alert("You need DESO in order to post!");
  //             } else {
  //               alert(err);
  //             }
  //           });
  //       }}
  //     >
  //       Login to post a Question
  //     </button>
  //   );
  // } else {
  //   return (
  //     <>
  //       <h1>Submit a Question</h1>
  //       <form
  //         onSubmit={async (e) => {
  //           e.preventDefault();

  //           // check if the user can make a post
  //           if (!hasPostingPermissions) {
  //             // if the user doesn't have permissions, request them
  //             // and abort the submit
  //             identity.requestPermissions({
  //               GlobalDESOLimit: 10000000, // 0.01 DESO
  //               TransactionCountLimitMap: {
  //                 SUBMIT_POST: 3,
  //               },
  //             });
  //             return;
  //           }

  //           const body = e.target[0].value;

  //           await submitPost({
  //             UpdaterPublicKeyBase58Check: currentUser.PublicKeyBase58Check,
  //             BodyObj: {
  //               Body: body,
  //               ImageURLs: [],
  //               VideoURLs: [],
  //             },
  //           }).then((resp) => {
  //             console.log(resp);
  //             alert("Post submitted!");
  //           });
  //         }}
  //       >
          // <textarea
          //   name="post-textarea"
          //   cols={30}
          //   rows={10}
          //   style={{ border: "1px solid black" }}
          // ></textarea>
  //         <div>
  //           <button>Post</button>
  //         </div>
  //       </form>
  //     </>
  //   );
  // }

  
};
