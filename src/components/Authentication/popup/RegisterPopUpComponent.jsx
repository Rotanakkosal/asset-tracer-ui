import React, { useEffect, useState } from 'react';
import err_pic from '../../../assets/images/false.png'
import suc_pic from '../../../assets/images/success.png'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function RegisterPopUpComponent({ setIsShowErr, setIsShowSuc, status }) {

  const [showModal, setShowModal] = useState(false)

  const hanldeHideModal = (val) => {
    setShowModal(val)
  }

  useEffect(() => {
    setShowModal(true)
  }, [status])

  return (
    <>
      {showModal && (
        <div className="z-30 fixed top-0 left-0 font-sp-pro-text-regular bg-none right-0 bottom-0 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 py-10 w-72 z-10 border border-bg-primary shadow-xl" >
            <div className="flex flex-col justify-end">
              <div className="relative w-40 m-auto pb-7">
                <img src={setIsShowErr ? err_pic : suc_pic} alt="Signup Picture" className="w-28 m-auto" />
              </div>
              <p className={`text-2xl text-center font-sp-pro-text-semibold ${setIsShowErr ? 'text-custom-red' : 'text-custom-blue'}`}>
                {setIsShowErr ? 'Ooop...' : 'Success'}
              </p>
              <p className="text-sm font-sp-pro-text-regular text-center text-text-color mt-3">
                {setIsShowErr ? 'This email is already registered' : <>
                  You have registered successfully! <span className='text-primary'> Please check your email </span>
                </>}
              </p>
              {setIsShowErr ?
                <button
                  onClick={() => hanldeHideModal(false)}
                  className={`bg-custom-red text-white  mt-8 py-2 px-4 bg-bl rounded-2xl text-center`}
                >
                  <span>Close</span>
                </button>
                :
                <NavLink
                  to="https://mail.google.com/mail/u/0/#inbox"
                  onClick={() => hanldeHideModal(false)}
                  className={`bg-custom-blue text-white  mt-8 py-2 px-4 bg-bl rounded-2xl text-center`}
                  target="_blank"
                >
                  <span>Go to Gmail Account</span>
                </NavLink>
              }

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterPopUpComponent;