import React from 'react';
import { useNavigate } from 'react-router-dom';
import question from "../../../assets/images/auth/Exclamation-Mark-Symbol.png"
import { ExclamationCircleIcon, KeyIcon, LockClosedIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { AiOutlineWarning } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { setItem } from '../../../redux/slices/OrganizationSlice';

function SignOutComponent(props) {
    const navigator = useNavigate()
    const dispatch = useDispatch()

    const handleSignOut = () => {
        localStorage.removeItem("token")
        sessionStorage.removeItem("organization")
        localStorage.removeItem("profileImage")
        dispatch(setItem(null))
        navigator("/signin")
    }

    return (
        <>
            <div className="modal">
                <div className="bg-white modal-box max-w-lg rounded-xl " >
                    <div className='flex'>
                        <div>
                            <ExclamationCircleIcon className='flex w-14 h-14 p-2 rounded-full border-primary text-reject bg-reject bg-opacity-20' />
                        </div>
                        <div>
                            <h1 className=' font-sp-pro-text-semibold text-xl px-4'>Sign Out</h1>
                            <p className='text-center font-sp-pro-text-regular px-4 leading-6 text-sm text-opacity-70'>Do you want to <span className='text-reject'>Sign Out</span>?</p>
                        </div>
                    </div>

                    <div className='flex w-full pt-6 space-x-6 justify-end'>
                        <label htmlFor='my-modal' className='border w-1/5 p-2 px-4 border-black border-opacity-20 rounded-md text-center cursor-pointer hover:bg-bg-primary'>Cancel</label>
                        <button onClick={handleSignOut} className='border w-1/5 p-2 px-4 text-reject bg-reject bg-opacity-20 border-reject border-opacity-20 hover:bg-opacity-25 rounded-md text-center'>Sign out</button>
                    </div>
                </div>

            </div>
        </>
    );
}

export default SignOutComponent;