import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { clusterApiUrl } from "@solana/web3.js";
import "./App.css";
import rocketGif from "./rocket.gif"; // Make sure rocket.gif is in src/

const clientId = "BFWgOhpnYUMA0s0CjAvoxYi14zxeqfyTebP8T4twXzksRVhsupLcGkfDSS_c_nfx_vNJG2zbpnfofE6RTUa-pHI";

function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Loading wallet...");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const w3a = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: "solana",
            rpcTarget: clusterApiUrl("devnet"),
          },
        });
        await w3a.initModal();
        setWeb3auth(w3a);
        setStatus("Wallet ready. Please log in.");
      } catch (err) {
        console.error("Web3Auth init error:", err);
        setStatus("Failed to load wallet.");
      }
    };
    init();
  }, []);

  const login = async () => {
    if (!web3auth) return alert("Wallet not ready yet. Please wait...");
    try {
      const provider = await web3auth.connect();
      const pubKey = await provider.request({ method: "solanaPublicKey" });
      setAddress(pubKey);
      setLoggedIn(true);
      setStatus("Logged in!");
    } catch (err) {
      console.error("Login error:", err);
      setStatus("Login failed.");
    }
  };

  const logout = async () => {
    if (web3auth) {
      await web3auth.logout();
    }
    setLoggedIn(false);
    setAddress("");
    setStatus("Wallet ready. Please log in.");
  };

  return (
    <div className="app">
      <h1>🚀 DaMillz Wallet Login</h1>
      <p>{status}</p>
      {!loggedIn ? (
        <button className="login-btn" onClick={login}>Login</button>
      ) : (
        <div className="wallet-info">
          <p>Wallet Address:</p>
          <code>{address}</code>
          <br />
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      )}
      <img src={rocketGif} alt="Rocket" className="rocket" />
    </div>
  );
}

export default App;
