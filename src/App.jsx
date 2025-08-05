import { useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import "./App.css";
import rocketGif from "./assets/rocket.gif";

const clientId =
  "BFWgOhpnYUMA0s0CjAvoxYi14zxeqfyTebP8T4twXzksRVhsupLcGkfDSS_c_nfx_vNJG2zbpnfofE6RTUa-pHI";

function App() {
  const [web3auth, setWeb3auth] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const initWeb3Auth = async () => {
    try {
      const web3authInstance = new Web3Auth({
        clientId,
        chainConfig: {
          chainNamespace: "solana",
          chainId: "0x1",
          rpcTarget: clusterApiUrl("devnet"),
        },
      });

      await web3authInstance.initModal();
      setWeb3auth(web3authInstance);
    } catch (error) {
      console.error("Web3Auth initialization error:", error);
    }
  };

  const login = async () => {
    if (!web3auth) {
      await initWeb3Auth();
    }
    try {
      const provider = await web3auth.connect();
      if (provider) {
        const pubKey = await provider.request({ method: "solanaPublicKey" });
        setUserAddress(pubKey);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    if (web3auth) {
      await web3auth.logout();
      setLoggedIn(false);
      setUserAddress("");
    }
  };

  return (
    <div className="app">
      <h1>🚀 DaMillz Wallet Login</h1>

      {!loggedIn ? (
        <button className="login-btn" onClick={login}>
          Login
        </button>
      ) : (
        <div className="wallet-info">
          <p>Wallet Address:</p>
          <code>{userAddress}</code>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      )}

      <footer>
        <p>
          <a href="https://twitter.com/damillz" target="_blank" rel="noreferrer">
            Twitter
          </a>{" "}
          |{" "}
          <a href="https://t.me/damiwrld" target="_blank" rel="noreferrer">
            Telegram
          </a>{" "}
          | {userAddress || "8htWNNqWhab1GWn22SCtGy8bktLPCJTXW4QJzqvxzKfW"}
        </p>
      </footer>

      <img src={rocketGif} alt="Rocket" className="rocket" />
    </div>
  );
}

export default App;
