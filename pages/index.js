import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { ethers } from "ethers";
// connect to metamask
// excecute a function
export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(undefined); // Had to pur undefined as a parameter here

  // ################################################################################################
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        setSigner(provider.getSigner());
      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  // ################################################################################################
  async function execute() {
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
      const abi = [
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "_favoriteNumber",
              type: "uint256",
            },
          ],
          name: "addPerson",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "nameToFavoriteNumber",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "people",
          outputs: [
            {
              internalType: "uint256",
              name: "favoriteNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "name",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "retrieve",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_favoriteNumber",
              type: "uint256",
            },
          ],
          name: "store",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.store(42);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }
  // ################################################################################################

  return (
    <div className={styles.container}>
      Hello Frogs!
      {isConnected ? (
        <>
          " Wallet Already Connected!"
          <button onClick={() => execute()}>Execute</button>
        </>
      ) : (
        <button onClick={() => connect()}>Connect!</button>
      )}
      {isConnected ? <button onClick={() => connect()}>Connect!</button> : ""}
    </div>
  );
}
