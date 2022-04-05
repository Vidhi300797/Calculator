import { useEffect, useState } from 'react';
import './App.css';

import backicon from './back_icon.png';

const keypadArr = [
    ["AC", "back", "%", "/"],
    ["7", "8", "9", "X"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]
]

const operationArr = ["+", "-", "/", "*", "X", "x", "%", 56];

function App() {

    const [inputText, setInputText] = useState("");
    const [result, setResult] = useState("empty");

    useEffect(() => {
        try{
        if (inputText !== ".") {
            let express = inputText;
            express = express.replace("x", "*")
            console.log("exp", express);
            if (!operationArr.includes(inputText[inputText.length - 1])) {
                setResult(eval(express));
            }
            if (!inputText) {
                setResult("empty")
            }
        }
    }
    catch(err) {
        alert("error", err);
    }
    }, [inputText])


    const handleKeyPress = (e) => {
        console.log(e, inputText)
        if (e.keyCode === 56 && e.key === "*") {
            if (operationArr.includes(inputText[inputText.length - 1])) {
                let val = inputText;
                val = val.slice(0, val.length - 1);
                setInputText(val + e.key);
            }
            else {
                setInputText(inputText + e.key);
            }
        }
        else if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 190) {
            setInputText(inputText + e.key);
        }
        else if (e.keyCode === 8) {
            let val = inputText;
            val = val.slice(0, val.length - 1);
            setInputText(val);
        }
        else if (operationArr.includes(e.key) || operationArr.includes(e.keyCode)) {
            if (operationArr.includes(inputText[inputText.length - 1])) {
                let val = inputText;
                val = val.slice(0, val.length - 1);
                setInputText(val + e.key);
            }
            else {
                setInputText(inputText + e.key);
            }

        }
        else if (e.keyCode === 13) {
            if(result != "empty" || result != Infinity || result != "Infinity") setInputText(`${result}`);
        }


    }

    const handleOnScreenKey = (key) => {
        if (key === "AC") {
            setInputText("");
            setResult("empty");
        }
        else if (key === "=") {
            setInputText(`${result}`);
        }
        else if(key === "back") {
            let val = inputText;
            val = val.slice(0, val.length - 1);
            setInputText(val);
        }
        else {
            if (operationArr.includes(key)) {
                if (operationArr.includes(inputText[inputText.length - 1])) {
                    let val = inputText;
                    val = val.slice(0, val.length - 1);
                    setInputText(key);
                }
                else {
                    setInputText(inputText + key);
                }
            }
            else {
                setInputText(inputText + key);
            }
        }
    }

    return (
        <div className="main-container">
            <div className="sub-container">
                <div className="text-box">
                    <input className="input-exp" autoFocus type="text"  value={inputText} onKeyUp={handleKeyPress} />
                </div>
                <div className="result">{result == "empty" ? "0" : "=" + result}</div>
                <div className="keypad">
                    {keypadArr.map((row) =>
                        <div className="keypad-row">
                            {row.map((sign, i) =>
                                sign && <button key={i} onClick={() => handleOnScreenKey(sign)} style={{ width: row.length == 4 ? "20%" : row.length === 3 && i === 2 ? "46.6%" : "20%" }}>{sign == "back" ? <img src={backicon} width="20px" alt="back"/> : sign || ""}</button>
                            )}
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
