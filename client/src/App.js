import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const handleSubmit = async () => {
    const payload = {
      language,
      code,
    };
    try {
      const { data } = await axios.post("http://localhost:5000/run", payload);
      setOutput(data.output);
    } catch ({ response }) {
      console.log("Response: ", response);
      if(response){
      const errMsg = response.data.err.stderr;
      setOutput(errMsg);
      }else{
        setOutput("Something went wrong");
      }
    }
    console.log(output); // Handle output as needed
  };

  return (
    <div className="App">
      <h1>Online Code Editor</h1>
      <label>Language: </label>
      <select value={language}
        onChange={(e) => setLanguage(e.target.value)}>
        <option value="cpp">C++</option>
        <option value="py">Python</option>
      </select>
      <br />
      <br />
      <br />
      <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>

      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <p>{output}</p>
    </div>
  );
};

export default App;
