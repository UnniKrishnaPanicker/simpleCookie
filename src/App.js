import { useEffect, useState } from "react";
import "./App.css";
import { GetTokenQuery, GetUserInfoQuery } from "./queries";
import Cookies from "js-cookie";

function App() {
  const [data, setData] = useState({});
  const callEveryThing = () => {
    GetTokenQuery().then((tokenResponse) => {
      if (tokenResponse.error) {
        console.log(tokenResponse);
      } else {
        setData(tokenResponse);
        console.log("Cookies.get()", Cookies.get());
        GetUserInfoQuery().then((userInfo) => {
          console.log("userInfo", userInfo);
        });
      }
    });
  };

  useEffect(() => {
    callEveryThing();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Check Cookies 🍪🍪</h2>
        <button onClick={() => callEveryThing()}>Check Now</button>

        <div
          style={{
            width: "35%",
            overflow: "hidden",
            textAlign: "left",
            border: "0.5px solid",
            padding: "0px 20px",
            margin: "15px",
            fontSize: "15px",
          }}
        >
          <div>
            authenticateWithRealm
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
