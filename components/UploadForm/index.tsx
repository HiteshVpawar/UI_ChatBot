"use client";

import React, { useEffect, useState } from "react";
import client from "@/services/client";
import { application } from "@/config/apis";

export default function Chatbot() {
  const [pdfFile, setPdfFile] = useState<any>("");
  const [pdfText, setPdfText] = useState<any>("");
  const [pdfTextinput, setPdfTextinput] = useState<any>("");
  const [textVisible, setTextVisible] = useState(true);
  const [data, setData] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);
  // const [input, setInput] = useState("");
  console.log("++++++++++++++", pdfText);
  const handleUserInput = (e: any) => {
    setPdfText(e.target.value);
  };

  const addMessage = (message: any) => {
    setMessages([...messages, message]);
  };

  // const recognizeIntent = (input: string) => {
  //   for (const intent of intents.firstSet) {
  //     for (const example of intent.patterns) {
  //       if (input.toLowerCase().includes(example.toLowerCase())) {
  //         return intent.responses[Math.floor(Math.random() * intent.responses.length)];
  //       }
  //     }
  //   }
  //   return "I'm not sure how to respond to that.";
  // };

  const recognizeIntent = (input: string) => {
    let closestMatch = null;
    let closestMatchDistance = Number.MAX_VALUE;

    for (const intent of intents.firstSet) {
      for (const example of intent.patterns) {
        const pattern = example.toLowerCase();
        const distance = levenshteinDistance(input.toLowerCase(), pattern);

        if (distance < closestMatchDistance) {
          closestMatchDistance = distance;
          closestMatch = intent.responses;
        }
      }
    }

    if (closestMatch) {
      const randomResponse =
        closestMatch[Math.floor(Math.random() * closestMatch.length)];
      return randomResponse;
    }

    return "I'm not sure how to respond to that.";
  };

  // Function to calculate Levenshtein distance
  function levenshteinDistance(a: any, b: any) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  const handleUserSubmit = (e: any) => {
    e.preventDefault();
    if (pdfText) {
      const userMessage = { text: pdfText, user: "user" };
      const botResponse = { text: recognizeIntent(pdfText), user: "bot" };
      addMessage(userMessage);
      addMessage(botResponse);
      // setPdfText("");
    }
  };

  useEffect(() => {
    getText();
  }, []);

  const getText = async () => {
    try {
      const res = await client.get(`${application.baseUrl}/upload`);
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", res);
      // setTimeout(() => setData((res?.data[0]?.data), 1000));
      setData(res.data[0].data[0].file_content);
    } catch (e) {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", e);
    }
  };

  const handleFileChange = (e: any) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("pdf_file", pdfFile);

    try {
      const response = await client.post(
        `${application.baseUrl}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPdfText(response?.data?.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const showText = () => {
    setTextVisible(true);
  };

  const hideText = () => {
    setTextVisible(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg px-2 py-2">
      <h2 className="text-4xl font-bold text-center text-blue-600 mt-8 mb-6">
        ChatBot
      </h2>
      {/* <h2 className="text-2xl mb-4">Upload a PDF File</h2> */}
      {/* <div className="px-3 py-1">
        {pdfText === "" ? null : (
          <div>
            {textVisible ? (
              <button onClick={hideText} className="text-blue-500 underline">
                Hide text
              </button>
            ) : (
              <button onClick={showText} className="text-blue-500 underline">
                Show text
              </button>
            )}
          </div>
        )}
      </div> */}
      <div className="chat-container max-h-72 overflow-y-auto">
        {messages.map((message: any, index: any) => (
          <div>
            Answer :
            <div
              key={index}
              className={`message ${message.user} p-2 my-2 mx-4 text-[15px] rounded-lg bg-blue-200`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mb-2 p-1">
        {textVisible && (
          <div className="max-h-52 overflow-y-auto mt-4">
            {pdfText && (
              <div>
                <h3 className="text-lg">Question:</h3>
                <p className="text-gray-700 text-[15px] p-2 my-2 mx-4 rounded-lg bg-green-200">
                  {pdfText}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mb-2">
        <div className="flex items-center gap-4 mb-4">
          <input
            type="file"
            name="pdf_file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handleUpload}
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Upload
          </button>
        </div>
        <form
          onSubmit={handleUserSubmit}
          className="flex items-center justify-between"
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={pdfText}
            onChange={handleUserInput}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            type="submit"
            className="ml-2 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
import intents from "../intents";
