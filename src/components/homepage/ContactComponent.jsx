import React, { useRef } from 'react'
import contact from "../../assets/images/ContactUs/contact.png";
import Location from "../../assets/images/ContactUs/Location.png";
import email from "../../assets/images/ContactUs/email.png";
import Phone from "../../assets/images/ContactUs/Phone.png";
import facebook from "../../assets/images/ContactUs/facebook.png";
import NavbarComponent from './NavbarComponent'
import FooterComponent from './FooterComponent'
import emailjs from '@emailjs/browser';

export default function ContactComponent() {

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_o3lkmcl', 'template_lqbzfmu', e.target, 'yhkrLDK-ZRzC2mmtK')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    e.target.reset();
  };
  return (
    <div>
      <NavbarComponent />
      <div className="bg-bg-pink pt-[60px]">
        <div className="grid lg:grid-cols-12 sm:grid-cols-1 gap-1">
          <div className=" col-span-6 ">
            <div className="relative w-[90%] mx-auto hidden md:block mt-14">
              <img src={contact} alt="Contact Picture" className="w-full" />
            </div>
          </div>
          <div className=" col-span-6">
            <form action="" ref={form} onSubmit={sendEmail}>
              <div className="lg:ml-0 md:ml-[70px] sm:ml-[60px] ml-[60px]">
                <div className=" ">
                  <div className=" w-[80%] text-text-color text-left">
                    <p className="font-sp-pro-text-regular 3xl:text-base xl:text-sm text-sm mt-14">
                      CONTACT US
                    </p>
                    <div className="font-sp-pro-text-bold 3xl:text-5xl xl:text-4xl md:text-3xl text-3xl">
                      Get in touch <span className="text-pending">today</span>
                    </div>
                    <p className="3xl:text-base xl:text-sm text-sm my-6 font-sp-pro-text-regular">
                      We love hearing from our customers. If you have any questions
                      about Asset Tracer, please send us a message.
                    </p>
                  </div>
                  <div className="sm:w-[90%] w-[80%]">
                    <div className="text-left mb-3">
                      <label className="block mb-2 ml-1 text-sm font-sp-pro-text-medium text-text-color">Full Name</label>
                      <input
                        type="text"
                        name="to_name"
                        className="text-sm border-border-strock border-2 rounded-lg block w-full py-2.5 px-4 focus:border-2 focus:border-hover-yellow  focus:outline-0 focus:bg-white focus:border-purple-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="text-left mb-3">
                      <label className="block mb-2 ml-1 text-sm font-sp-pro-text-medium text-text-color">Email</label>
                      <input
                        type="email"
                        name="from_name"
                        className="text-sm border-border-strock border-2 rounded-lg block w-full py-2.5 px-4 focus:border-2 focus:border-hover-yellow  focus:outline-0 focus:bg-white focus:border-purple-500"
                        placeholder="Your email"
                      />
                    </div>

                    <div className=" text-left mb-6">
                      <div className="flex justify-between w-[90%]">
                        <label className="block mb-2 ml-1 text-sm font-sp-pro-text-medium text-text-color">Message</label>
                        <label className="block mb-2 text-sm ">
                          0/200 charecters
                        </label>
                      </div>
                      <textarea
                        type="message"
                        name="message"
                        className="text-sm border-border-strock border-2 rounded-lg block w-full py-2 px-4 h-[100px] focus:border-2 focus:border-hover-yellow  focus:outline-0 focus:bg-white focus:border-purple-500"
                        placeholder="Your message"
                      />
                    </div>

                    <div className='flex justify-between'>
                      <div></div>
                      <input
                        type="submit"
                        value="Send Message"
                        className="py-2.5 px-6 rounded-md text-white bg-pending hover:bg-hover-yellow font-medium 2xl:text-base xl:text-sm text-sm text-center shadow-lg shadow-shadow "
                      >
                      </input>
                    </div>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>

        <div className=" flex justify-evenly pt-20 mx-auto mb-10">
          <div className='hidden md:block w-[300px] h-[200px] border py-8 px-5 rounded-md border-gray-light shadow-gray-light shadow-sm'>
            <div className=" h-[130px] mb-8 lg:mb-0 md:mb-0 sm:mb-8">
              <img src={email} alt="Contact Picture" className="w-[50px] mx-auto mb-5" />
              <div className="text-md font-sp-pro-text-regular text-text-color text-center">
                Email: <span className="text-blue-light">assettracerteam@gamil.com</span>
              </div>
            </div>
          </div>
          <div className='w-[300px] h-[200px] border py-8 px-5 rounded-md border-gray-light shadow-gray-light shadow-sm'>
            <div className=" h-[130px] mb-8 lg:mb-0 md:mb-0 sm:mb-8">
              <img src={Phone} alt="Contact Picture" className="w-[50px] mx-auto mb-5" />
              <div className="text-md font-sp-pro-text-regular text-text-color text-center">
                Tell: <span className="text-blue-light">096 779 4512 ( Smart )</span>
                <div className="ml-[22px]">
                  : <span className="text-md font-sp-pro-text-regular text-blue-light">061 865 005 (Cellcard)</span>
                </div>
              </div>
            </div>
          </div>

          <div className='hidden lg:block w-[300px] h-[200px] border py-8 px-5 rounded-md border-gray-light shadow-gray-light shadow-sm'>
            <div className=" h-[130px] mb-8 lg:mb-0 md:mb-0 sm:mb-8">
              <img src={facebook} alt="Contact Picture" className="w-[50px] mx-auto mb-5" />
              <div className="text-md text-center font-sp-pro-text-regular text-text-color my-3">
                Facebook: <span className="text-gray">Asset Tracer</span>
              </div>
            </div>
          </div>
        </div>

        <div className='mx-auto'>
          <div className="h-[130px] mb-8 lg:mb-0 md:mb-0 sm:mb-8">
            <img src={Location} alt="Contact Picture" className="w-[50px] mx-auto mb-5" />
            <div className="text-md text-center font-sp-pro-text-regular text-text-color my-3">
              Address:#12, st323, Sangkat
              <div>Boeung Kak II, Khan Toul Kork,</div>
              <div>Phnom Penh, Cambodia</div>
            </div>
          </div>

          <div className=''>
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe className="gmap_iframe w-[90%] h-72 mx-auto my-8" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=900&amp;height=900&amp;hl=en&amp;q=Korean HRD Center, Street 323, Phnom Penh&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterComponent />
    </div>
  )
}
