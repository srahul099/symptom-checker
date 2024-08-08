import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./homepage.css";

const genai = new GoogleGenerativeAI("AIzaSyBEyYN7YksQ6ZX7aaJSGZj16KIWTtLQdqk");
const model = genai.getGenerativeModel({ model: "gemini-pro" });
const Homepage = () => {
  const [info, setinfo] = useState({
    type: "",
    age: "",
    gender: "",
    symptoms: "",
  });
  const [loading, setLoading] = useState(false);
  const [aiResponse, setresponse] = useState("");

  const handleChangeSearch = (e) => {
    setinfo(e.target.value);
  };

  async function aiRun() {
    setLoading(true);
    const prompt = `a ${info.type} dog ${info.age} years ${info.gender} has ${info.symptoms} can u suggest what might be wrong with him in points without subheadings be very specific about the disease type include the medicines as well also add in the end about the severity of the prevailing case`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    setLoading(false);
    console.log(text);
    let responsearray = text.split("**");
    let newresponse1 = "";
    for (let i = 0; i < responsearray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newresponse1 += responsearray[i];
      } else {
        newresponse1 += "<b>" + responsearray[i] + "</b>" + "</br>";
      }
    }
    let responsearray2 = newresponse1.split("*");
    let newresponse2 = "";
    for (let i = 0; i < responsearray2.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newresponse2 += responsearray2[i];
      } else {
        newresponse2 += "<li>" + responsearray2[i] + "</li>";
      }
    }
    setresponse(newresponse2);
  }

  const handleClick = () => {
    aiRun();
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 mx-14 bg-gray-light p-5 rounded-xl">
        <input
          type="text"
          className="bg-gray-200"
          placeholder="type"
          onChange={(e) => handleChangeSearch(e)}
        />
        <input
          type="text"
          className=""
          placeholder="age"
          onChange={(e) => handleChangeSearch(e)}
        />
        <input
          type="text"
          className=""
          placeholder="gender"
          onChange={(e) => handleChangeSearch(e)}
        />
        <input
          type="text"
          className=""
          placeholder="Symptom"
          onChange={(e) => handleChangeSearch(e)}
        />
        <button style={{ marginLeft: "10px" }} onClick={() => handleClick()}>
          Search
        </button>
      </div>
      {loading === true && info !== "" ? (
        <p style={{ margin: "30px 0" }}>Loading ...</p>
      ) : (
        <div className="response">
          {aiResponse ? (
            <p dangerouslySetInnerHTML={{ __html: aiResponse }}></p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Homepage;
