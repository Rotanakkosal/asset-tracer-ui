import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import { Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Logo from "../../assets/images/PictureLanding/Logo.jpg";
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { HiHome } from "react-icons/hi";
import { MdFeaturedPlayList } from "react-icons/md";
import { FaHandHoldingUsd } from "react-icons/fa";
import { GiTeamIdea } from "react-icons/gi";
import { BsPeopleFill } from "react-icons/bs";
import { VscSignIn } from "react-icons/vsc";
import { NavHashLink } from 'react-router-hash-link';

let token = localStorage.getItem("token");
const PAGES = ["Home", "Feature", "Benefits", "Our Team", "About Us"];

export default function NavbarComponent() {
  const [value, setValue] = useState();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  console.log(isMatch);

  const scrollWithOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
  }
  return (
    <nav className="bg-white fixed w-full z-50 top-0 left-0 border-b border-white shadow-gray-light shadow-sm py-2">
      <Toolbar>
        <NavHashLink to="/#home" smooth className="items-center inline-flex">
          <img src={Logo} alt="" className="h-14 w-14 mr-10 rounded-full"/>
          <div className="block text-lg text-text-color font-sp-pro-text-medium -ml-[20px]">Asset Tracer</div>
        </NavHashLink>
        {
          isMatch ? (
            <>
              {/* Humbergur button */}
              <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <div className='px-6'>
                  <div className='text-text-color'>
                    <ul className="bg-white w-[220px] py-5 font-medium md:bg-white">
                      <li>
                        <div className="items-center inline-flex gap-4">
                          <HiHome className='h-8 w-8 text-yellow opacity-75' />
                          <div className="block py-3 text-textblack mx-auto">
                          <NavHashLink smooth to="/?#home" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer'>Home</NavHashLink>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div href="#" className="block border-b-2 border-gray-light mx-auto py-2 mb-4">
                        </div>
                      </li>
                      <li>
                        <div className="items-center inline-flex gap-4 ">
                          <MdFeaturedPlayList className='h-7 w-7 text-yellow opacity-80' />
                          <div className="block py-5 text-textblack mx-auto">
                          <NavHashLink smooth to="/?#feature" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer'>Feature</NavHashLink>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="items-center inline-flex gap-4 ">
                          <FaHandHoldingUsd className='h-7 w-7 text-yellow opacity-80' />
                          <div className="block py-5 text-textblack mx-auto">
                          <NavHashLink smooth to="/?#benefit" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer'>Benefits</NavHashLink>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="items-center inline-flex gap-4 ">
                          <GiTeamIdea className='h-7 w-7 text-yellow opacity-90' />
                          <div className="block py-5 text-textblack mx-auto">
                          <NavHashLink smooth to="/about#team" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer'>Our Team</NavHashLink>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="items-center inline-flex gap-4 ">
                          <BsPeopleFill className='h-7 w-7 text-yellow opacity-90' />
                          <div className="block py-5 text-textblack mx-auto">
                          <NavHashLink smooth to="/about#about" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer'>About us</NavHashLink>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className=''>
                    <NavLink
                      to={`${token ? "organization" : "/signin"}`}
                      type="button"
                      className="text-yellow rounded-lg items-center inline-flex gap-4 bg-secondary-yellow bg-opacity-30 font-medium text-md px-[60px] py-1.5 text-center hover:bg-hover-yellow hover:bg-opacity-40 shadow-sm shadow-shadow border-2 border-yellow"
                    >
                      <VscSignIn className='h-6 w-6 text-yellow opacity-90' />
                      <div> Sign In</div>
                    </NavLink>
                  </div>

                </div>
              </Drawer>
              <IconButton sx={{ color: "text-color", marginLeft: "auto", }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              {/* Biger Navbar */}
              <div className='mx-auto text-text-color text-[16px] font-sp-pro-text-medium flex gap-x-14'
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                {
                  <div
                    className="items-center justify-between hidden w-full lg:block md:w-auto md:order-1"
                    id="navbar-sticky"
                  >
                    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-light rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ">
                      <li>
                        <div href="#" className="block py-2 px-3 text-textblack mx-auto">
                          <NavHashLink smooth to="/?#home" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer'>Home</NavHashLink>

                        </div>
                      </li>
                      <li>
                        <div href="#" className="block py-2 px-3 text-textblack ">
                          <NavHashLink smooth to="/?#feature" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer'>Feature</NavHashLink>

                        </div>
                      </li>
                      <li>
                        <div href="#" className="block py-2 px-3 text-textblack ">
                          <NavHashLink smooth to="/?#benefit" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer'>Benefits</NavHashLink>

                        </div>
                      </li>
                      <li>
                        <div href="#" className="block py-2 px-3 text-textblack ">
                          <NavHashLink smooth to="/about#team" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer'>Our Team</NavHashLink>

                        </div>
                      </li>
                      <li>
                        <div href="#" className="block py-2 px-3 text-textblack ">
                          <NavHashLink smooth to="/about#about" scroll={el => scrollWithOffset(el)} className='hover:cursor-pointer'>About us</NavHashLink>
                        </div>
                      </li>
                    </ul>
                  </div>
                }
              </div>

              <NavLink
                to={`${token ? "organization" : "/signin"}`}
                type="button"
                className="text-white rounded-md bg-secondary-yellow font-medium text-md px-10 py-2.5 text-center hover:bg-hover-yellow shadow-lg shadow-shadow"
              >
                Sign In
              </NavLink>
            </>
          )
        }
      </Toolbar>
    </nav>
  )
}