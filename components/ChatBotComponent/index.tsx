"use client";
import { use, useEffect, useRef, useState } from "react";
import { ChatHistory } from "../ChatHistory";
import client from "@/services/client";
import { application } from "@/config/apis";
import Loader from "../Loader";

export const ChatBotComponent = () => {
  const [userInput, setUserInput] = useState<any>("");
  const [data, setData] = useState<any>([]);
  const [pdfFile, setPdfFile] = useState<any>("");
  const [imgeFile, setImageFile] = useState<any>("");
  const [pdfText, setPdfText] = useState<any>("");
  const [show, setShow] = useState<any>(false);
  const optionsRef = useRef<any>(null);
  const pdfFileInputRef = useRef<any>(null);
  const imageFileInputRef = useRef<any>(null);
  const handleFileChange = (e: any) => {
    setPdfFile(e.target.files[0]);
  };
  const handleimageFileChange = (e: any) => {
    setImageFile(e.target.files[0]);
  };

  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    if (pdfFile) {
      handleUpload();
      setShow(false);
    }
  }, [pdfFile]);
  useEffect(() => {
    if (imgeFile) {
      handleUploadImage();
      setShow(false);
    }
  }, [imgeFile]);

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (show && !optionsRef.current.contains(e.target)) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [show]);

  const getChats = async () => {
    try {
      const res = await client.get(`${application.baseUrl}/chat`);
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", res);
      setTimeout(() => setData(res?.data[0]?.data), 1000);
    } catch (e) {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&", e);
    }
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

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("image_file", imgeFile);

    try {
      const response = await client.post(
        `${application.baseUrl}/upload/image`,
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

  const login = async () => {
    try {
      const response: any = await client.post(`${application.baseUrl}/chat`, {
        question: userInput || pdfText,
      });
      setData([...data, { question: userInput || pdfText, answer: null }]);
      setUserInput("");
      await getChats();
      return response;
    } catch (error) {
      return error;
    }
  };
  const handleClick = () => {
    login();
    setPdfText("");
  };

  const handleOption = () => {
    if (show === true) {
      setShow(false);
    } else setShow(true);
  };

  const handlePdfFileButtonClicked = () => {
    pdfFileInputRef.current.click();
  };

  const handleImageFileButtonClicked = () => {
    imageFileInputRef.current.click();
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="w-full h-full">
      <div className="h-[93%] max-h-[93%]">
        {!data?.length ? <Loader /> : <ChatHistory data={data} />}
      </div>
      <div className="flex justify-between items-center h-[7%] border-[2px] rounded-md">
        <input
          value={userInput || pdfText}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full h-full p-2 outline-none px-4 bg-transparent"
          placeholder="Enter a message..."
          onKeyDown={handleKeyDown}
        />
        <div className="options relative items-center mt-2 " ref={optionsRef}>
          <button onClick={handleOption} className="custom-file-input-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </button>
          {show && (
            <div className="absolute bg-gray-100 shadow-2xl rounded-md flex flex-col justify-center items-center space-y-3 bottom-14">
              <button
                className=" hover:bg-gray-300 py-5 rounded-md px-4"
                onClick={handlePdfFileButtonClicked}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.362 2c4.156 0 2.638 6 2.638 6s6-1.65 6 2.457v11.543h-16v-20h7.362zm.827-2h-10.189v24h20v-14.386c0-2.391-6.648-9.614-9.811-9.614zm-3.741 17.261c.346-.327.932-.647 1.742-.954.366-.725.731-1.523 1.018-2.232-.242-.506-.397-1.039-.464-1.588-.25-2.061 2.083-1.907 1.729.012-.068.368-.23.884-.483 1.536.367.654.849 1.146 1.233 1.472.524-.084 1.271-.17 1.797-.093 1.396.205 1.219 1.744-.021 1.744-.649 0-1.463-.507-1.972-.896-.779.144-1.613.365-2.33.618-.229.44-.536 1.001-.811 1.396-1.143 1.646-2.65.127-1.438-1.015zm1.199.055c-.253.128-.609.348-.801.559-.299.328-.103.586.257.233.178-.172.392-.492.544-.792zm4.44-1.201c.235.158.558.323.911.33.412.008.377-.261-.082-.328-.2-.03-.488-.03-.829-.002zm-2.947-.128c.328-.109 1.036-.274 1.213-.315-.02-.021-.528-.544-.695-.832-.134.335-.509 1.127-.518 1.147zm.314-3.983c-.057.296.029.771.129 1.061.113-.237.255-.806.197-1.085-.056-.279-.262-.299-.326.024z" />
                </svg>
              </button>
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="pdf-file-input"
                ref={pdfFileInputRef}
              />
              <button
                className="hover:bg-gray-300 py-5 rounded-md px-4"
                onClick={handleImageFileButtonClicked}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 14.378l-5.641 5.64c-.654.655-1.513.982-2.374.982-2.972 0-4.493-3.613-2.374-5.731l5.539-5.54c.488-.486 1.126-.729 1.766-.729 1.494 0 2.498 1.233 2.498 2.519 0 .61-.227 1.232-.734 1.74l-4.918 4.918c-.634.634-1.665.634-2.299 0-.633-.633-.633-1.664 0-2.298l3.971-3.97.828.828-3.971 3.97c-.178.177-.178.466 0 .643s.465.177.643 0l4.919-4.918c.517-.517.517-1.357 0-1.874-.517-.517-1.356-.517-1.874 0l-5.539 5.54c-.854.853-.854 2.241 0 3.093.852.853 2.24.853 3.093 0l5.64-5.64.827.827zm-17-5.878c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5c0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5zm7.57 3.013l-1.57-2.513-2.52 4-2.48-1.96-4 5.96h6.694c.144-1.139.63-2.242 1.503-3.114l2.373-2.373zm-3.754 7.487h-8.816v-14h18v2.126c.299-.062.604-.096.916-.096.371 0 .732.06 1.084.147v-4.177h-22v18h11.818c-.482-.605-.818-1.283-1.002-2z" />
                </svg>
              </button>
              <input
                type="file"
                onChange={handleimageFileChange}
                className="hidden"
                id="image-file-input"
                ref={imageFileInputRef}
              />
            </div>
          )}
        </div>
        <button
          onClick={handleClick}
          className={`font-[700] w-fit px-4 h-full ${
            userInput ? "cursor-pointer" : "cursor-default"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="none"
            className="icon-sm m-1 md:m-0"
            height={25}
            width={25}
          >
            <path
              d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
              fill={`${userInput ? "#19C37D" : "grey"}`}
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
