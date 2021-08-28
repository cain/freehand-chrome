import { printLine } from './modules/print';
import React from 'react';
import { render } from 'react-dom';

import Content from './content';
// import '../content.css';
var div = document.createElement('div');
document.body.appendChild(div);
// chrome.runtime.onMessage.addListener((msgObj) => {
//   div.id = 'test123';
//   // do something with msgObj
//   console.log({ msgObj });
//   if (!msgObj) return;
//   render(<Content />, window.document.querySelector('#test123'));
// });

chrome.storage.onChanged.addListener(function (changes, namespace) {
  console.log(
    { changes, namespace },
    changes.enabled && changes.enabled.newValue
  );

  if (changes.enabled) {
    div.id = 'test123';
    console.log('howdy', window.document.querySelector('#test123'));
    // var div = document.createElement('div');
    // document.body.appendChild(div);
    // do something with msgObj
    render(
      <Content enabled={changes.enabled.newValue} />,
      window.document.querySelector('#test123')
    );
  }
});

if (module.hot) module.hot.accept();

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");
