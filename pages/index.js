import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
// connect to metamask
// excecute a function
export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
      } catch (e) {
        console.log(e);
      }
    }
  }
  return <div className={styles.container}>Hello Frogs</div>;
}
