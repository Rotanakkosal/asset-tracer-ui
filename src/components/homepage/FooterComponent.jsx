import React from 'react'
import { Link } from 'react-router-dom';
import Facebook from "../../assets/images/Iconfooter/Facebook.png";
import Instagram from "../../assets/images/Iconfooter/Instagram.png";
import Twitter from "../../assets/images/Iconfooter/Twitter.png";
import Phone from "../../assets/images/Iconfooter/Phone.png";
import { NavHashLink } from 'react-router-hash-link';

export default function FooterComponent() {

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}
  return (
    <>
     <footer className="bg-white rounded-lg shadow ">
        <div className="w-full max-w-screen-xl mx-auto py-8">

          <div className="flex flex-wrap-reverse items-center justify-between">
            <ul className="flex flex-none mx-auto gap-7">
              {/* <span className="mr-6 md:mr-8 font-sp-pro-text-heavy ">Follow Us</span> */}
  
              <li>
                <div href="#" className="mr-4 md:mr-6">
                  <a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/profile.php?id=100093979121081&mibextid=LQQJ4d">
                  <img src={Facebook} alt="" className="sm:w-[40px] w-[38px]" />
                  </a>
                </div>
              </li>

              <li>
                <div href="#" className="mr-4 md:mr-6">
                  <a rel="noopener noreferrer" target="_blank" href="https://twitter.com/AssetTracer?t=l1UPqjfv7xGOOmnpjj_pDg&s=35">
                  <img src={Twitter} alt="" className="sm:w-[40px] w-[38px]" />
                  </a>
                </div>
              </li>
              <li>
                <div href="#" className="mr-4 md:mr-6 ">
                  <a  rel="noopener noreferrer" target="_blank" href="https://instagram.com/assettracer?igshid=NTc4MTIwNjQ2YQ==">
                  <img src={Instagram} alt="" className="sm:w-[40px] w-[38px]" />
                  </a>
                </div>
              </li>
              <li>
                <div href="#" className="hover:underline">
                <NavHashLink smooth to="/contact#" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer'><img src={Phone} alt="" className="sm:w-[40px] w-[38px]" /></NavHashLink>
                </div>
              </li>
            </ul>
          </div>

          <hr className="my-6 w-[50%] border-gray-light sm:mx-auto lg:mt-5" />

          <div className="w-full flex flex-col p-4 ">
            <ul className="font-normal text-text-color flex mx-auto ">
              <li>
                <div
                  href="#"
                  className="block py-2 px-5 border-r-2 border-gray-light "
                >
                  <NavHashLink smooth to="/?#feature" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer hover:underline'>Feature</NavHashLink>
                </div>
              </li>
              <li>
                <div
                  href="#"
                  className="block py-2 px-5 border-r-2 border-gray-light"
                >
                  <NavHashLink smooth to="/?#benefit" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer hover:underline'>Benefits</NavHashLink>
                </div>
              </li>
              <li>
                <div
                  href="#"
                  className="hidden md:block py-2 px-5 border-r-2 border-gray-light"
                >
                  <NavHashLink smooth to="/about#about" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer hover:underline'>About us</NavHashLink>
                </div>
              </li>
              <li>
                <div
                  href="#"
                  className="hidden md:block py-2 px-5 border-r-2 border-gray-light"
                >
                  <NavHashLink smooth to="/contact#" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer hover:underline'>Contact us</NavHashLink>
                </div>
              </li>
              <li>
                <div href="#" className="block py-2 px-5 ">
                <NavHashLink smooth to="/about#about" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer hover:underline'>Support</NavHashLink>
                </div>
              </li>
            </ul>
          </div>
          <span className="block text-sm text-text-color sm:text-center text-center ">
          Copyright ©2023 by Asset Tracer. All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  )
}
