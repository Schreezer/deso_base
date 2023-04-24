import abi from "..//poo.json";
import "./DisplayWaves.css";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import MyContext from '..//components/MyContext.js';
import { getDatabase, ref, onValue, push, update, child} from "firebase/database";
// import { firebase } from '@react-native-firebase/database';
const getEthereumObject = () => window.ethereum;



export const Home = () => {
  const[keyy, setKeyy] = useState(0);
  const [currentAccount, setCurrentAccount] = useState("");

  // const { currentAccount } = useContext(MyContext);
  const contractAddress = "0x15796323a77408BBAD4C05535Bf7fFb10E8Bb6AB";
  const contractABI = abi.abi;
  const [allWaves, setAllWaves] = useState([]);

  // const connectWallet = async () => {
  //   try {
  //     const ethereum = getEthereumObject();
  //     if (!ethereum) {
  //       alert("Get MetaMask!");
  //       return;
  //     }

  //     const accounts = await ethereum.request({
  //       method: "eth_requestAccounts",
  //     });

  //     console.log("Connected", accounts[0]);
  //     setCurrentAccount(accounts[0]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  

  // };
  
  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const { ethereum } = window;
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
          const questions = await wavePortalContract.getAllCards();
          // await questions.wait();
          console.log("Retrieved all questions...", questions);
          let wavesCleaned = [];
          questions.forEach(wave => {
            wavesCleaned.push({
              Questioner: wave.querrier,
              timestamp: new Date(wave.timestamp * 1000),
              // timestamp: wave.timestamp,
              Question: wave.question,
              Bounty: wave.bounty,
            });
          });
          wavesCleaned.reverse();
          // setAllWaves(wavesCleaned);
        } else {
          console.log("Ethereum object doesn't exist!")
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    
    // Your function goes here
    getAllQuestions();
    console.log('The component has been mounted');


    // now using the google firebase
    const cal = async()=>{
      const db = getDatabase();
      // console.log(db);
      const starCountRef = ref(db, "/posts/");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // console.log(data);
        let questionsCleaned = [];
        for (const key in data) {
            // do something with the object that matches the key
            const value = data[key];
            questionsCleaned.push({
              Qid: key,
              Questioner: value["questioner"],
              // timestamp: value["uid"],
              // timestamp: wave.timestamp,
              Question: value["Question"],
              Bounty: value["Bounty"],
            });
            questionsCleaned.reverse();
            setAllWaves(questionsCleaned);
          
        }
        // updateStarCount(postElement, data);
      });
    }
    cal();
    console.log('The component has been mounted');

  }, []);

  

  // function Display_waves(props){

  //   return(
  //     props.value.map((wave, index) => {
      
  //         return (
  //           <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
           
  //             <div>Address: {wave.Questioner}</div>
  //             <div>Time: {wave.timestamp.toString()}</div>
  //             <div>Message: {wave.Question}</div>
  //             <div>Bounty: {wave.Bounty.toString()}</div>
  //             <input type="text" placeholder="Answer" />
  //             <button>Answer</button>
  //           </div>)
           
        
    
  //     })
  //   ) }

  function DisplayWaves(props) {
    const[answer,setAnswer]=useState("");
    function handleChangeA(e) {
      setAnswer(e.target.value);
    }
    function Answer(qid){
      console.log(answer);
      console.log(qid);
      const db = getDatabase();
      console.log(currentAccount);
      const _Answer = {
        Answer: answer,
        Answerer: currentAccount,
        Qid: qid,
      };
      const newPostKey = push(child(ref(db), 'posts')).key;
      const updates = {};
      updates['/posts/' + qid + "/" + newPostKey] = _Answer;
      updates['/user-posts/' + currentAccount + '/' + newPostKey] = _Answer;
      
      return update(ref(db), updates);
    
      

    }
    return (
      <div className="waves-container">
        {console.log(props.value)}
        {props.value.map((wave, index) => (
          <div key={index} className="wave-card">
            <div> {console.log("Helled up")} </div>
            <div> {console.log(wave)} </div>
            <div className="bounty"> Bounty: {wave.Bounty}</div>
            <div className="questioner">Questioner: {wave.Questioner}</div>
            <div className="question">{wave.Question}</div>
            
            <div className="answer-container">
              <input type="text" placeholder="Answer" className="answer-input" onChange={handleChangeA}/>
             
              <button className="answer-button" onClick={() => Answer(wave.Qid)}>Answer</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  

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
      <h1>this is home</h1>
      {/* <p> {allWaves} </p> */}
      <DisplayWaves value= {allWaves} />
      {/* <button onClick={null}>Click me</button> */}
    </div>
    </>
  );
};
