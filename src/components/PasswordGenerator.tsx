import React, { useState } from "react";
import "./styles.css";
import { FaRegCopy, FaArrowRight } from "react-icons/fa";
import PasswordGeneratorutils from "../utils/PasswordGeneratorUtils";

const MINIMUM_Value = 0;
const MAXIMUM_VALUE = 20;
const STEP = 1;

type strengthValues = {
  color: string;
  bars: number;
};

function PasswordGenerator() {
  const [password, setPassword] = useState("P4$5W0rD!");
  const [passwordLength, setPasswordLength] = useState<number>(8);
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [strength, setStrength] = useState<string>("TOO WEAK");
  const [passwordCopied, setPasswordCopied] = useState<boolean>(false);
  const { generatePassword, checkPasswordStrength } = PasswordGeneratorutils();
  const [passwordError, setPasswordError] = useState<string | undefined>("");

  const strengthColors: { [key: string]: strengthValues } = {
    tooweak: { color: "#F64A4A", bars: 1 },
    weak: { color: "#FB7C58", bars: 2 },
    strong: { color: "#A4FFAF", bars: 4 },
    medium: { color: "yellow", bars: 3 },
  };

  const color =
    strengthColors[`${strength.replace(/\s/g, "").toLowerCase()}`].color;
  const bar =
    strengthColors[`${strength.replace(/\s/g, "").toLowerCase()}`].bars;

  const onGeneratePassword = () => {
    const { error, password } = generatePassword({
      length: passwordLength,
      lowerCaseIsChecked: lowercase,
      numberIsChecked: numbers,
      symbolIsChecked: symbols,
      upperCaseIsChecked: uppercase,
    });

    if (error) {
      setPasswordError(error);
      return;
    }
    if (password) {
      setPasswordError("");
      setPassword(password);
      setStrength(checkPasswordStrength(password)?.passwordStrength);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(password);
    setPasswordCopied(true);
  };

  return (
    <div className="body">
      <div className="container">
        <div className="header">
          <h1>Password Generator</h1>
        </div>
        <div className="conditions">
          <div className="copy-password">
            <div
              className="passwordDisplay"
              style={{ color: passwordCopied ? "#ffffff" : "#817D92" }}
            >
              {password}
            </div>
            <button className="copy-icon" onClick={() => copy()}>
              {passwordCopied ? <h3 className="copied">COPIED</h3> : null}
              <FaRegCopy size={20} className="copyIcon" />
            </button>
          </div>
          <div className="generateClass">
            <div className="charLength">
              <label> Characters length</label>
              <h1 className="sliderValue">{passwordLength}</h1>
            </div>
            <input
              type="range"
              value={passwordLength}
              min={MINIMUM_Value}
              max={MAXIMUM_VALUE}
              step={STEP}
              onChange={(e) => setPasswordLength(Number(e.target.value))}
              style={{
                backgroundSize: `${
                  (passwordLength * 100) / MAXIMUM_VALUE
                }% 100%`,
              }}
            />
            <div className="checkBoxesContainer">
              <label className="required">
                <input
                  type="checkbox"
                  onChange={(e) => setUppercase(e.target.checked)}
                />
                Include uppercase letters
              </label>

              <label className="required">
                <input
                  type="checkbox"
                  onChange={(e) => setLowercase(e.target.checked)}
                />
                Include lowercase letters
              </label>

              <label className="required">
                <input
                  type="checkbox"
                  onChange={(e) => setNumbers(e.target.checked)}
                />
                Include numbers
              </label>

              <label className="required">
                <input
                  type="checkbox"
                  onChange={(e) => setSymbols(e.target.checked)}
                />
                Include symbols
              </label>
            </div>
            <div className="strength">
              {passwordError ? (
                <h2 style={{ color: "red" }}>{passwordError}</h2>
              ) : (
                <>
                  <h2>Strength</h2>
                  <div className="strength-bars">
                    <h2>{strength}</h2>
                    <div className="bars">
                      <div
                        className="strong"
                        style={{
                          backgroundColor: 1 <= bar ? color : "#24232C",
                          border: 1 > bar ? "2px solid #ffffff" : "none",
                        }}
                      ></div>
                      <div
                        className="strong"
                        style={{
                          backgroundColor: 2 <= bar ? color : "#24232C",
                          border: 2 > bar ? "2px solid #ffffff" : "none",
                        }}
                      ></div>
                      <div
                        className="strong"
                        style={{
                          backgroundColor: 3 <= bar ? color : "#24232C",
                          border: 3 > bar ? "2px solid #ffffff" : "none",
                        }}
                      ></div>
                      <div
                        className="strong"
                        style={{
                          backgroundColor: 4 <= bar ? color : "#24232C",
                          border: 4 > bar ? "2px solid #ffffff" : "none",
                        }}
                      ></div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <button
              type="button"
              className="generateBtn"
              onClick={onGeneratePassword}
            >
              <h3>Generate</h3> <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
