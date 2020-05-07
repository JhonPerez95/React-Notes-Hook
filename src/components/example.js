import React, { useState, useEffect } from "react";

export default function Count() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  });

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Sumar
      </button>{" "}
      <br />
      <p>{count}</p>
    </div>
  );
}
