import { useRef, useState } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
  const [value, setValue] = useState("0");
  const isSymbolActive = useRef(false);
  const operator = useRef(null);
  const memory = useRef(0);

  const compute = () => {
    const num = parseFloat(value);

    switch (operator.current) {
      case "+":
        memory.current += num;
        break;
      case "-":
        memory.current -= num;
        break;
      case "×":
        memory.current *= num;
        break;
      case "÷":
        memory.current /= num;
        break;
    }
  };

  const display = () => {
    setValue(memory.current);
  };

  const handleButtonPress = (content) => () => {
    switch (content) {
      case "AC":
        setValue("0");
        isSymbolActive.current = false;
        operator.current = null;
        memory.current = 0;
        break;
      case "+/-":
        setValue((parseFloat(value) * -1).toString());
        break;
      case "%":
        setValue((parseFloat(value) / 100).toString());
        break;
      case ".":
        setValue(value + content);
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        isSymbolActive.current = true;
        if (!operator.current) {
          memory.current = parseFloat(value);
        } else {
          compute();
          display();
        }
        operator.current = content;
        break;
      case "=":
        if (!operator.current) return;
        isSymbolActive.current = true;
        compute();
        display();
        operator.current = null;

        break;
      default:
        if (isSymbolActive.current) {
          setValue(content);
          isSymbolActive.current = false;
        } else {
          setValue(parseFloat(value + content).toString());
        }
        break;
    }
  };

  return (
    <div className="App">
      <div className="display">{value}</div>
      <div className="buttons">
        <Button
          onButtonClick={handleButtonPress}
          content="AC"
          type="function"
        />
        <Button
          onButtonClick={handleButtonPress}
          content="+/-"
          type="function"
        />
        <Button onButtonClick={handleButtonPress} content="%" type="function" />
        <Button onButtonClick={handleButtonPress} content="÷" type="operator" />
        <Button onButtonClick={handleButtonPress} content="7" />
        <Button onButtonClick={handleButtonPress} content="8" />
        <Button onButtonClick={handleButtonPress} content="9" />
        <Button onButtonClick={handleButtonPress} content="×" type="operator" />
        <Button onButtonClick={handleButtonPress} content="4" />
        <Button onButtonClick={handleButtonPress} content="5" />
        <Button onButtonClick={handleButtonPress} content="6" />
        <Button onButtonClick={handleButtonPress} content="-" type="operator" />
        <Button onButtonClick={handleButtonPress} content="1" />
        <Button onButtonClick={handleButtonPress} content="2" />
        <Button onButtonClick={handleButtonPress} content="3" />
        <Button onButtonClick={handleButtonPress} content="+" type="operator" />
        <Button onButtonClick={handleButtonPress} content="0" />
        <Button onButtonClick={handleButtonPress} content="." />
        <Button onButtonClick={handleButtonPress} content="=" type="operator" />
      </div>
    </div>
  );
}

export default App;
