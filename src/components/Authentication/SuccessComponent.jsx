import React from 'react';
import verify from '../../assets/images/forgotPassword/verify.png'

function SuccessComponent(props) {
    return (
        <div>
            <div>
      <section className="bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
            <div className="w-10/12 container m-auto">
            <div className='flex justify-center'>
            <img src={verify} width={50} height={50} alt=""/>
          </div>
            <h2 className="mb-1 py-5 text-lg font-sp-pro-text-semibold leading-tight text-primary md:text-2xl text-center pt-[25px]">
              Password Reset
            </h2>
            <p className="text-center font-sp-pro-text-medium text-text-color text-sm pt-[12px]">
              Your new password has been successfully reset.
            </p>
            <p className="text-center font-sp-pro-text-medium text-sm text-text-color">Click below to log in.</p>
            <div className="pt-[96px]">
            <button
              type="submit"
              className="inline-block w-full rounded bg-primary px-7 pt-3 pb-2.5 text-sm font-sp-pro-text-medium text-white"
            >
              Continue
            </button>
            </div> 
            </div>
          </div>
        </div>
      </section>
    </div>
        </div>
    );
}

export default SuccessComponent;