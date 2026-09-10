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
