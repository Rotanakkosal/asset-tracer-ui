import React from "react";
import ReactLoading from "react-loading";

export default function NewLoadingComponent() {
  return (
    <div>
      <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0 right-0 z-[1000] bg-black bg-opacity-10 text-primary">
        <div className="w-40 h-40  bg-white shadow-lg rounded-2xl flex justify-center items-center">
          <div>
          <ReactLoading type="spinningBubbles" color="#FEC000"/>
          <br />
          <div className="flex justify-center font-sp-pro-text-medium text-base">
           Loading
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
