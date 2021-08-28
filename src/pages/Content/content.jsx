import React from 'react';
import getStroke from "perfect-freehand"
import './content.scss';

let enabled = false;
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    console.log(
      `Storage key "${key}" in namespace "${namespace}" changed.`,
      `Old value was "${oldValue}", new value is "${newValue}".`
    );

    if(key === 'enabled') {
      enabled = newValue;
    }
  }
});

const Content = () => {
  const [paths, setPaths] = React.useState([])

  function handlePointerDown(e) {
    e.preventDefault()
    if(!enabled) return;
    setPaths([ ...paths, [[e.pageX, e.pageY, e.pressure]]])
  }

  function handlePointerMove(e) {
    if(!enabled) return;
    if (e.buttons === 1) {
      e.preventDefault()

      const newPoint = [e.pageX, e.pageY, e.pressure];
      const newPaths = [...paths];
      newPaths[newPaths.length - 1] = [...newPaths[newPaths.length - 1], newPoint];

      setPaths(newPaths)
    }
  }
  return (
    <div className="App">
      {enabled ? 'enabled' : 'disabled'}
      <svg
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        style={{ touchAction: "none" }}
      >
        {paths.map((points, i) => (
          <path
            key={'path'+i}
            d={getSvgPathFromStroke(
              getStroke(points, {
                size: 15,
                thinning: 0.5,
                smoothing: 0.5,
                streamline: 0.5,
                easing: (t) => t * t * t,
                simulatePressure: true,
                last: true,
                start: {
                  taper: 20,
                  easing: (t) => t * t * t,
                },
                end: {
                  taper: 20,
                  easing: (t) => t * t * t,
                },
              })
            )}
          />)
        )}
    </svg>
    </div>
  );
};

export function getSvgPathFromStroke(stroke) {
  if (!stroke.length) return ""

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ["M", ...stroke[0], "Q"]
  )

  d.push("Z")
  return d.join(" ")
}


export default Content;
