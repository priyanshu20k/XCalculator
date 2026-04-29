import { useState } from "react"; // React 19 doesn't require the 'React' import for JSX

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    if (value === "=") {
      try {
        // Safer than eval()
        const sanitizedInput = input.replace(/[^-+*/0-9.]/g, ''); 
        const calc = new Function(`return ${sanitizedInput}`)();
        setResult(String(calc));
      } catch {
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
      
      {/* Line 34 Fix: Ensure readOnly is explicit and handled */}
      <input 
        type="text" 
        value={input} 
        readOnly={true} 
        aria-label="calculator-input"
      />

      {result && <div className="result" aria-live="polite">{result}</div>}

      <div className="button-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {buttons.map((btn) => (
          <button 
            key={btn} // Use the btn string itself as a key if unique
            onClick={() => handleButtonClick(btn)}
            type="button"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;