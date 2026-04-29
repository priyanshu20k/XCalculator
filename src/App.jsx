import { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      // 1. Handle Empty or Incomplete Expression
      if (!input || /[+\-*/]$/.test(input)) {
        setResult("Error");
        return;
      }

      try {
        // Sanitize and compute
        const sanitizedInput = input.replace(/[^-+*/0-9.]/g, "");
        const calculation = new Function(`return ${sanitizedInput}`)();
        
        // Handle cases like 1/0 (Infinity)
        if (!isFinite(calculation)) {
          setResult("Error");
        } else {
          setResult(String(calculation));
        }
      } catch {
        setResult("Error");
      }
    } else if (value === "C") {
      // 2. Clear Functionality (Crucial for test cases)
      setInput("");
      setResult("");
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    "7", "8", "9", "+",
    "4", "5", "6", "-",
    "1", "2", "3", "*",
    "C", "0", "=", "/",
  ];

  return (
    <div className="calculator">
      <h1>React Calculator</h1>
      <input 
        type="text" 
        value={input} 
        readOnly 
      />
      {/* Ensure result div is always present or conditionally rendered as per test specs */}
      <div className="result">{result}</div>
      
      <div className="button-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {buttons.map((btn) => (
          <button 
            key={btn} 
            onClick={() => handleButtonClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;