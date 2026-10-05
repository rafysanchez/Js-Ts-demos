import React, { useState } from "react";

export function Slides({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === slides.length - 1;

  return (
    <div>
      <div className="navigation">
        <button onClick={() => setCurrentIndex(0)} disabled={isFirst}>
          First
        </button>
        <button
          onClick={() => setCurrentIndex(currentIndex - 1)}
          disabled={isFirst}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentIndex(currentIndex + 1)}
          disabled={isLast}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentIndex(slides.length - 1)}
          disabled={isLast}
        >
          Last
        </button>
      </div>
      <div className="slide">
        <h1>{slides[currentIndex].title}</h1>
        <p>{slides[currentIndex].text}</p>
      </div>
    </div>
  );
}
// Example of how to import and use the Slides component in another React file
/* 
// App.jsx
import React from 'react';
import { Slides } from './Slides';

const slidesData = [
  { title: 'Slide 1', text: 'This is the first slide.' },
  { title: 'Slide 2', text: 'This is the second slide.' },
  { title: 'Slide 3', text: 'This is the third slide.' },
];

function App() {
  return (
    <div>
      <h1>Slide Show</h1>
      <Slides slides={slidesData} />
    </div>
  );
}

export default App; 
*/
