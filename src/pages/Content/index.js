import { printLine } from './modules/print';
import React from 'react';
import { render } from 'react-dom';

import Newtab from './content';
// import '../content.css';
var div = document.createElement('div');
document.body.appendChild(div);
chrome.runtime.onMessage.addListener((msgObj) => {
  div.id = 'test123';
  // do something with msgObj
  console.log({ msgObj });
  if (!msgObj) return;
  render(<Newtab />, window.document.querySelector('#test123'));
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  console.log({ changes, namespace });
  //   var div = document.createElement('div');
  //   document.body.appendChild(div);
  //   div.id = 'test123';
  //   // do something with msgObj
  //   console.log({ msgObj });
  //   if (!msgObj) return;
  //   render(<Newtab />, window.document.querySelector('#test123'));
});

if (module.hot) module.hot.accept();

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");
