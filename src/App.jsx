import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      if (!input || /[+\-*/]$/.test(input)) {
        setResult("Error");
        return;
      }

      try {
        const calculation = new Function(`return ${input}`)();
        
        // Handle Edge Cases specifically for test requirements
        if (Object.is(calculation, NaN)) {
          setResult("NaN");
        } else if (calculation === Infinity || calculation === -Infinity) {
          setResult("Infinity");
        } else {
          setResult(String(calculation));
        }
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = ["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "C", "0", "=", "/"];

  return (
    <div className="calculator">
      <h1>React Calculator</h1>
      <input type="text" value={input} readOnly />
      <div className="result">{result}</div>
      <div className="button-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {buttons.map((btn) => (
          <button key={btn} onClick={() => handleButtonClick(btn)}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;