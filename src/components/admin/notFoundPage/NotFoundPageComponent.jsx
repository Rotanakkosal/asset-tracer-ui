import React from "react";
import notfound from "../../../assets/images/notFoundPage/notfound.jpg";
import { Link } from "react-router-dom";

export default function NotFoundPageComponent() {
  return (
    <div>
      <div>
        <img src={notfound} alt="" className="w-[30%] h-[30%] mx-auto" />
      </div>
      <div className=" justify-center flex flex-row space-x-4 font-mono">
        <div className="font-extrabold text-7xl">Opps</div>

        <div className="font-extrabold text-7xl text-yellow">404!</div>
      </div>
      <div className="text-2xl font-extrabold flex justify-center pt-10 font-mono">
        The web you looking for may have been moved deleted,
      </div>

      <div className="text-2xl font-extrabold flex justify-center pt-5 font-mono">
        or possibly never existed.
      </div>
      <Link to={'/'}>
      <button className="m-10 flex  mx-auto bg-transparent hover:bg-yellow text-yellow font-semibold hover:text-white py-2 px-4 border border-yellow hover:border-transparent rounded font-mono">
        Go Back !
      </button>
      </Link>
    </div>
  );
}
