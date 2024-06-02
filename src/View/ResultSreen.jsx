import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import uler from "../assets/globle.gif";
import "./YourComponent.css"; // Make sure to import the CSS file
import AnimatedSpinner from "../components/Spinner/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, lazy } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { imageMlDataAction } from "../Redux/actions/img/imgAction.js";
import gangg from "../assets/result.jpg";

const ResultScreen = () => {
  const [content, setContent] = useState(``);

  // const [loading, setLoading] = useState(true);
  // const [success, setSuccess] = useState(false);
  const { loading, success, error, prediction, orgResponse } = useSelector(
    (state) => state.imgMlInfo
  );
  const dispatch = useDispatch();

  const { imgUrl, imageId } = useSelector((state) => state.imgDet);
  console.log(imageId);
  const location = useLocation();
  const navigation = useNavigate();

  const handleClick = () => {
    // Additional logic can be added here
    window.open(
      `https://healhub-backend.onrender.com/api/image/result/${imageId}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // const [success, setSuccess] = useState(true);

  useEffect(() => {
    // if (!imageId) {
    //   navigation(`/upload`);
    //   return;
    // }
    dispatch(imageMlDataAction(imageId, "gang"));

    if (success === true) {
      setContent(orgResponse);
    }
  }, [dispatch, imageId]);

  // setTimeout(() => {
  //   setLoading(false);
  //   setSuccess(true);
  // }, 5000);

  return (
    <>
      <div className="flex w-full h-screen ">
        <div className="w-1/2 flex flex-col h-4/5 items-center justify-center">
          <div className="w-full">
            <h2 className="text-xl text-center uppercase">Original Image</h2>
            <div className="flex w-full p-4">
              <div className="relative box" onClick={handleClick}>
                <span className="absolute inset-5 border-2 border-gray-900 bg-gray-900 rounded-md"></span>
                {/* {
                  imgId ? <img src={imgUrl} className="relative z-10" alt="" /> : <img src={uler} className="relative z-10" alt="" />
                } */}
                {/* <h2 className="relative z-2 text-white font-montserrat text-6xl">
                  01
                </h2> */}

                {loading === true && (
                  <img
                    src={`http://localhost:6969/api/image/get/${imageId}`}
                    className="relative z-10 p-5"
                    alt="PreviewImage"
                  />
                )}

                {success === true && (
                  <img
                    src={`http://localhost:6969/api/image/result/${imageId}`}
                    onLoad={lazy}
                    className="relative z-10 p-6 m-6"
                    alt="PreviewImage"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-full hidden">
            <h2 className="text-xl text-center uppercase">Result Image</h2>
            <div className="flex w-full p-4">
              <div className="absolute border-blur"></div>
              <div className="relative box">
                <span className="absolute inset-5 border-2 border-gray-900 bg-gray-900 rounded-md"></span>
                <h2 className="relative z-2 text-white font-montserrat text-6xl">
                  01
                </h2>
              </div>
              <div className="absolute border-blur"></div>
            </div>
          </div>
        </div>

        <div className="w-1/2 -translate-y-16">
          {loading ? (
            <AnimatedSpinner></AnimatedSpinner>
          ) : (
            <div
              style={{
                padding: "20px",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                whiteSpace: "pre-wrap", // Adjust as needed
                fontSize: "2em",
                display: "inline-block",
                translate: "0px 64px",
              }}
            >
              {success === true && (
                <TypeAnimation
                  sequence={[
                    // Same substring at the start will only be typed out once, initially
                    orgResponse,
                  ]}
                  wrapper="p"
                  speed={50}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ResultScreen;
