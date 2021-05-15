import logo from "./logo.svg";
import "./App.css";
import LandingPage from "./components/LandingPage";
import { ChakraProvider } from "@chakra-ui/react";
import React, { useState } from "react";
import LoginPage from "./components/login/LoginPage";
import ContractsPage from "./components/ContractsPage";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

function App() {
  const componentDidMount = () => {
    store.dispatch(loadUser());
  };

  const [screen, setScreen] = useState("LoginPage");
  return (
    <Provider store={store}>
      <ChakraProvider>
        <div className='App'>
          {screen == "LoginPage" && <LoginPage setScreen={setScreen} />}
          {screen == "LandingPage" && <LandingPage setScreen={setScreen} />}
          {screen == "ContractsPage" && <ContractsPage setScreen={setScreen} />}
        </div>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
