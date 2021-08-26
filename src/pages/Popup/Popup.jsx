import React from 'react';
import { useState } from 'react';
import logo from '../../assets/img/logo.svg';
import './Popup.css';

const Popup = () => {
  const [toggle, setToggle] = useState(false)

  function clickToggle(e) {
    setToggle(!toggle);
    // chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    //   chrome.tabs.sendMessage(tabs[0].id, toggle);
    // }).bind(this);
    chrome.storage.local.set({ 'enabled': toggle }, function () {
      console.log("confirmed");
  });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Cains popup Edit <code>src/pages/Popup/Popup.js</code> and save to 123.
        </p>
        { toggle ? 'ON' : 'OFF' }
        <button onClick={clickToggle}>click me</button>
      </header>
    </div>
  );
};

export default Popup;
