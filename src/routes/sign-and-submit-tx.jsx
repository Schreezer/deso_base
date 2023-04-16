import { ERROR_TYPES, identity, submitPost } from "deso-protocol";
import { useContext } from "react";
import React, { useEffect, useState } from "react";
import { UserContext } from "../contexts";
import abi from "..//poo.json";
import "./shramp.css";
import { ethers } from "ethers";
const getEthereumObject = () => window.ethereum;


export const SignAndSubmitTx = () => {
  const { currentUser, isLoading } = useContext(UserContext);
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0xc2d8Ae1EF720FCeFa0368253548c4Fc7f06094d4";
  const contractABI = abi.abi;
  const [Question, setQuestion] = useState("");
  const [Bounty, setBounty] = useState("");
  function handleChangeQ(e) {
    setQuestion(e.target.value);
  }
  function handleChangeB(e) {
    setBounty(e.target.value);
  }
  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        console.log("mesa here");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        // console.log("Retrieved total wave count...", count.toNumber());

        /*
        * Execute the actual wave from your smart contract
        */
        const waveTxn = await wavePortalContract.quest(Bounty, Question, { gasLimit: 300000 });
        
        
        
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
    <div class="container">
       <textarea
            name="post-textarea"
            cols={60}
            rows={10}
            placeholder="Enter Question Here"
            onChange={handleChangeQ}
            style={{ border: "1px solid black" }}
          ></textarea>
  <input type="text" placeholder="Enter Bounty Here" onChange={handleChangeB

  } />
  <button onClick={wave}>Submit</button>
  

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
