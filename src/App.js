import { useState } from "react";
import { ethers } from "ethers";
import GameMarketplace from "./artifacts/contracts/GameMarketplace.sol/GameMarketplace.json";
import "./App.css";

const marketplaceAddress = "0xYourGameMarketplaceAddress";

function App() {
  const [currentGame1Votes, setCurrentGame1Votes] = useState("-");
  const [currentGame2Votes, setCurrentGame2Votes] = useState("-");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGame1Votes() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(marketplaceAddress, GameMarketplace.abi, provider);
      try {
        const data = await contract.getGameVotes(1);
        console.log("data: ", data);
        setCurrentGame1Votes(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  async function fetchGame2Votes() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(marketplaceAddress, GameMarketplace.abi, provider);
      try {
        const data = await contract.getGameVotes(2);
        console.log("data: ", data);
        setCurrentGame2Votes(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  async function voteGame1() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(marketplaceAddress, GameMarketplace.abi, signer);
      const transaction = await contract.voteForGame(1);
      await transaction.wait();
      fetchGame1Votes();
    }
  }

  async function voteGame2() {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(marketplaceAddress, GameMarketplace.abi, signer);
      const transaction = await contract.voteForGame(2);
      await transaction.wait();
      fetchGame2Votes();
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        <div className="description">
          <h1>Vote for Your Favorite Game!</h1>
          <h3>Choose the Next Featured Game</h3>
        </div>
        <div className="custom-buttons">
          <button onClick={requestAccount} style={{ backgroundColor: "purple" }}>
            Connect Wallet
          </button>
        </div>
        <div className="custom-buttons">
          <button onClick={fetchGame1Votes} style={{ backgroundColor: "green" }}>
            Fetch Votes for Game 1
          </button>
          <button onClick={fetchGame2Votes} style={{ backgroundColor: "green" }}>
            Fetch Votes for Game 2
          </button>
        </div>
        <div className="custom-buttons">
          <button onClick={voteGame1} style={{ backgroundColor: "blue" }}>
            Vote for Game 1
          </button>
          <button onClick={voteGame2} style={{ backgroundColor: "blue" }}>
            Vote for Game 2
          </button>
        </div>
        <h2 style={{ display: "inline-block", float: "left" }}>
          Votes for Game 1: {currentGame1Votes} &emsp; Votes for Game 2: {currentGame2Votes}
        </h2>
      </div>
    </div>
  );
}

export default App;
