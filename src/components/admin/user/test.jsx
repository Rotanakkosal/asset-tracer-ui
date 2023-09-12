<div className="modal ">
          <div className=" modal-box bg-white py-6  rounded-[24px] max-w-5xl  lg:max-w-7xl xl:h-[500px] xl:w-[1280px]  ">
            {/* header */}
            <div className="flex justify-between">
              <div className="flex items-center space-x-4">
                <UserIcon className="h-12 w-12 p-1 text-primary bg-primary bg-opacity-20 rounded-2xl rounded-se-md" />
                <h2 className="text-[20px] font-sp-pro-text-bold text-text-color">
                  Profile Details
                </h2>
              </div>
              <label htmlFor="my-modal-5" className="cursor-pointer">
                <XCircleIcon className="h-7 w-7 text-red-300" />
              </label>
            </div>

            {/* ============ content =========== */}

            <div className="lg:flex py-16 space-x-12 ">
              <div className="lg:w-1/3  md:w-full">
                <div className="flex justify-center ">
                  {userDetail.image != null ? (
                    <>
                      <img
                        src={FileUploadService.getImage(userDetail.image)}
                        className=" w-[130px] h-[130px] rounded-full flex justify-center items-center m-auto"
                      />
                    </>
                  ) : (
                    <>
                      <div className=" w-[130px] h-[130px] con-pro-color rounded-full flex justify-center items-center m-auto">
                        <p className="font-sp-pro-text-bold uppercase text-[40px] text-green ">
                          {userDetail.name.substring(0, 2)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="flex justify-center font-sp-pro-text-regular text-2xl text-text-color">
                    {userDetail.name}
                  </h3>
                  <p className="flex justify-center text-xl font- font-sp-pro-text-regular text-md text-primary">
                    UX/UI Design
                  </p>
                </div>
                <div className="m-auto gap-1 flex flex-row justify-center space-x-1 pt-4 2xl:pb-5 pb-3">
                  <div className="w-9 h-9  rounded-full">
                    <svg
                      viewBox="0 0 40 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2269_129716)">
                        <path
                          d="M19.8519 0C9.16298 0 0.5 8.66298 0.5 19.3519C0.5 30.0407 9.16298 38.7037 19.8519 38.7037C30.5407 38.7037 39.2037 30.0407 39.2037 19.3519C39.2037 8.66298 30.5407 0 19.8519 0ZM31.9316 31.4241C30.3593 32.9964 28.5375 34.2286 26.5041 35.0828C24.4026 35.9748 22.165 36.4208 19.8519 36.4208C17.5463 36.4208 15.3087 35.9672 13.1997 35.0828C11.1662 34.221 9.33684 32.9889 7.77206 31.4241C6.19973 29.8517 4.96756 28.03 4.11335 25.9965C3.22135 23.895 2.7678 21.6574 2.7678 19.3519C2.7678 17.0463 3.22135 14.8087 4.10579 12.6997C4.96756 10.6662 6.19973 8.83684 7.7645 7.27206C9.3444 5.69973 11.1662 4.46756 13.1997 3.60579C15.3087 2.72135 17.5463 2.2678 19.8519 2.2678C22.1574 2.2678 24.395 2.72135 26.5041 3.60579C28.5375 4.46756 30.3669 5.69973 31.9316 7.26451C33.504 8.83684 34.7362 10.6586 35.5904 12.6921C36.4824 14.7936 36.9284 17.0311 36.9284 19.3443C36.9284 21.6499 36.4748 23.8874 35.5904 25.9965C34.7286 28.03 33.4964 29.8593 31.9316 31.4241Z"
                          fill="#9197B3"
                        />
                        <path
                          d="M22.4064 12.7522C23.185 12.7522 24.0165 12.9941 24.0165 12.9941L24.5154 10.0308C24.5154 10.0308 23.4571 9.66797 20.9323 9.66797C19.3827 9.66797 18.4831 10.2576 17.8254 11.1269C17.2056 11.9509 17.1829 13.2738 17.1829 14.128V16.0707H15.1797V18.9659H17.1829V29.0198H20.9323V18.9659H23.9031L24.1224 16.0707H20.9323V13.8105C20.9323 13.0319 21.6278 12.7522 22.4064 12.7522Z"
                          fill="#9197B3"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2269_129716">
                          <rect
                            width="38.7037"
                            height="38.7037"
                            fill="white"
                            transform="translate(0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="w-9 h-9  rounded-full">
                    <svg
                      viewBox="0 0 39 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2269_129726)">
                        <path
                          d="M19.3816 0C8.69276 0 0.0297852 8.66298 0.0297852 19.3519C0.0297852 30.0407 8.69276 38.7037 19.3816 38.7037C30.0705 38.7037 38.7335 30.0407 38.7335 19.3519C38.7335 8.66298 30.0705 0 19.3816 0ZM31.4614 31.4241C29.8891 32.9964 28.0673 34.2286 26.0338 35.0828C23.9323 35.9748 21.6948 36.4208 19.3816 36.4208C17.076 36.4208 14.8385 35.9672 12.7294 35.0828C10.696 34.221 8.86663 32.9889 7.30185 31.4241C5.72951 29.8517 4.49734 28.03 3.64314 25.9965C2.75114 23.895 2.29758 21.6574 2.29758 19.3519C2.29758 17.0463 2.75114 14.8087 3.63558 12.6997C4.49734 10.6662 5.72951 8.83684 7.29429 7.27206C8.87419 5.69973 10.696 4.46756 12.7294 3.60579C14.8385 2.72135 17.076 2.2678 19.3816 2.2678C21.6872 2.2678 23.9248 2.72135 26.0338 3.60579C28.0673 4.46756 29.8967 5.69973 31.4614 7.26451C33.0338 8.83684 34.2659 10.6586 35.1201 12.6921C36.0121 14.7936 36.4581 17.0311 36.4581 19.3443C36.4581 21.6499 36.0046 23.8874 35.1201 25.9965C34.2584 28.03 33.0262 29.8593 31.4614 31.4241Z"
                          fill="#9197B3"
                        />
                        <path
                          d="M25.3248 9.67578H13.4567C11.393 9.67578 9.71484 11.3539 9.71484 13.4176V17.3712V25.2933C9.71484 27.357 11.393 29.0352 13.4567 29.0352H25.3248C27.3885 29.0352 29.0667 27.357 29.0667 25.2933V17.3636V13.4101C29.0591 11.3539 27.381 9.67578 25.3248 9.67578ZM26.3983 11.9058H26.8291V12.3291V15.1865L23.556 15.1941L23.5484 11.9133L26.3983 11.9058ZM16.6241 17.3636C17.2439 16.5094 18.2493 15.9425 19.3832 15.9425C20.5171 15.9425 21.5225 16.5018 22.1424 17.3636C22.5506 17.923 22.7849 18.6109 22.7849 19.3517C22.7849 21.2264 21.2579 22.761 19.3757 22.761C17.4934 22.761 15.9815 21.2264 15.9815 19.3517C15.9815 18.6109 16.2234 17.923 16.6241 17.3636ZM27.1769 25.2858C27.1769 26.3063 26.3453 27.1378 25.3248 27.1378H13.4567C12.4362 27.1378 11.6047 26.3063 11.6047 25.2858V17.3636H14.4923C14.2429 17.9759 14.0992 18.6487 14.0992 19.3517C14.0992 22.2696 16.4729 24.6432 19.3908 24.6432C22.3087 24.6432 24.6823 22.2696 24.6823 19.3517C24.6823 18.6487 24.5387 17.9759 24.2892 17.3636H27.1769V25.2858Z"
                          fill="#9197B3"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2269_129726">
                          <rect
                            width="38.7037"
                            height="38.7037"
                            fill="white"
                            transform="translate(0.0307617)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="w-9 h-9 rounded-full">
                    <svg
                      viewBox="0 0 39 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2269_129720)">
                        <path
                          d="M19.616 0C8.92714 0 0.26416 8.66298 0.26416 19.3519C0.26416 30.0407 8.92714 38.7037 19.616 38.7037C30.3049 38.7037 38.9679 30.0407 38.9679 19.3519C38.9679 8.66298 30.3049 0 19.616 0ZM31.6958 31.4241C30.1235 32.9964 28.3017 34.2286 26.2682 35.0828C24.1667 35.9748 21.9292 36.4208 19.616 36.4208C17.3104 36.4208 15.0729 35.9672 12.9638 35.0828C10.9304 34.221 9.101 32.9889 7.53622 31.4241C5.96389 29.8517 4.73172 28.03 3.87751 25.9965C2.98551 23.895 2.53196 21.6574 2.53196 19.3519C2.53196 17.0463 2.98551 14.8087 3.86995 12.6997C4.73172 10.6662 5.96389 8.83684 7.52866 7.27206C9.10856 5.69973 10.9304 4.46756 12.9638 3.60579C15.0729 2.72135 17.3104 2.2678 19.616 2.2678C21.9216 2.2678 24.1592 2.72135 26.2682 3.60579C28.3017 4.46756 30.131 5.69973 31.6958 7.26451C33.2681 8.83684 34.5003 10.6586 35.3545 12.6921C36.2465 14.7936 36.6925 17.0311 36.6925 19.3443C36.6925 21.6499 36.239 23.8874 35.3545 25.9965C34.4928 28.03 33.2606 29.8593 31.6958 31.4241Z"
                          fill="#9197B3"
                        />
                        <path
                          d="M14.2042 15.375H10.4321V27.4472H14.2042V15.375Z"
                          fill="#9197B3"
                        />
                        <path
                          d="M12.2363 9.67578C10.8453 9.67578 9.93066 10.5753 9.93066 11.7697C9.93066 12.9414 10.8151 13.8636 12.1833 13.8636H12.2136C13.6347 13.8636 14.5192 12.9338 14.5116 11.7697C14.4814 10.5753 13.6272 9.67578 12.2363 9.67578Z"
                          fill="#9197B3"
                        />
                        <path
                          d="M24.5053 15.2617C22.3434 15.2617 20.9902 16.441 20.7408 17.2725V15.3751H16.5C16.5529 16.3805 16.5 27.4473 16.5 27.4473H20.7408V20.9236C20.7408 20.5532 20.7257 20.1904 20.8315 19.9334C21.1187 19.2077 21.7462 18.4518 22.8725 18.4518C24.3466 18.4518 25.0118 19.5705 25.0118 21.2033V27.4473H29.2904V20.7347C29.2904 17.0004 27.1889 15.2617 24.5053 15.2617Z"
                          fill="#9197B3"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2269_129720">
                          <rect
                            width="38.7037"
                            height="38.7037"
                            fill="white"
                            transform="translate(0.265625)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="w-9 h-9  rounded-full">
                    <svg
                      viewBox="0 0 40 39"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_2269_129730)">
                        <path
                          d="M20.1497 0C9.46083 0 0.797852 8.66298 0.797852 19.3519C0.797852 30.0407 9.46083 38.7037 20.1497 38.7037C30.8386 38.7037 39.5016 30.0407 39.5016 19.3519C39.5016 8.66298 30.8386 0 20.1497 0ZM32.2295 31.4241C30.6572 32.9964 28.8354 34.2286 26.8019 35.0828C24.7004 35.9748 22.4629 36.4208 20.1497 36.4208C17.8441 36.4208 15.6066 35.9672 13.4975 35.0828C11.464 34.221 9.63469 32.9889 8.06992 31.4241C6.49758 29.8517 5.26541 28.03 4.41121 25.9965C3.51921 23.895 3.06565 21.6574 3.06565 19.3519C3.06565 17.0463 3.51921 14.8087 4.40365 12.6997C5.26541 10.6662 6.49758 8.83684 8.06236 7.27206C9.64225 5.69973 11.464 4.46756 13.4975 3.60579C15.6066 2.72135 17.8441 2.2678 20.1497 2.2678C22.4553 2.2678 24.6929 2.72135 26.8019 3.60579C28.8354 4.46756 30.6647 5.69973 32.2295 7.26451C33.8018 8.83684 35.034 10.6586 35.8882 12.6921C36.7802 14.7936 37.2262 17.0311 37.2262 19.3443C37.2262 21.6499 36.7726 23.8874 35.8882 25.9965C35.0264 28.03 33.7943 29.8593 32.2295 31.4241Z"
                          fill="#9197B3"
                        />
                        <path
                          d="M29.3229 12.7091C28.5519 13.1627 27.7052 13.4953 26.7981 13.6767C26.0724 12.9057 25.0368 12.4219 23.8953 12.4219C21.7031 12.4219 19.9191 14.2059 19.9191 16.3981C19.9191 16.708 19.9494 17.0104 20.025 17.3052C16.7215 17.1389 13.7885 15.559 11.8307 13.1476C11.4905 13.7372 11.2939 14.4175 11.2939 15.1508C11.2939 16.5266 11.997 17.7436 13.0628 18.4618C12.4127 18.4391 11.8004 18.2577 11.2637 17.9629V18.0082C11.2637 19.9358 12.6319 21.546 14.4537 21.9088C14.1211 21.9995 13.7658 22.0524 13.403 22.0524C13.146 22.0524 12.8965 22.0298 12.6546 21.9844C13.1611 23.5643 14.6276 24.7133 16.3662 24.7436C15.0056 25.8094 13.2896 26.4444 11.43 26.4444C11.1125 26.4444 10.795 26.4293 10.4775 26.3915C12.2389 27.5178 14.3252 28.1755 16.5703 28.1755C23.8878 28.1755 27.8866 22.1129 27.8866 16.8592C27.8866 16.6853 27.8866 16.5115 27.8791 16.3452C28.6577 15.7782 29.3305 15.0828 29.8596 14.2815C29.1491 14.599 28.378 14.8106 27.5767 14.9089C28.4007 14.4175 29.0281 13.6389 29.3229 12.7091Z"
                          fill="#9197B3"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2269_129730">
                          <rect
                            width="38.7037"
                            height="38.7037"
                            fill="white"
                            transform="translate(0.796387)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
              <div className=" md:flex w-2/3 md:w-full">
                <div className="w-1/2 sm:w-full">
                  <div className="block h-auto">
                    <div className="py-5">
                      <div className="flex ">
                        <EnvelopeIcon className="h-7 w-7 bg-primary p-1 text-white rounded-md" />
                        <h3 className="block text-[18px] font-sp-pro-text-semibold ml-2  item-center">
                          Email
                        </h3>
                      </div>
                      <p className="ml-10 w-full">{userDetail.email}</p>
                    </div>

                    <div className="py-5 ">
                      <div className="flex">
                        <CalendarDaysIcon className="h-12 w-12 bg-primary p-1 text-white rounded-md" />
                        <h3 className="block text-[18px] font-sp-pro-text-semibold ml-2 item-center">
                          Create date
                        </h3>
                      </div>
                      <p className="ml-10">
                        {" "}
                        {moment(userDetail.createdAt).format("DD/MM/YYYY")}
                      </p>
                    </div>

                    <div className="py-5">
                      <div className="flex">
                        <BsGenderAmbiguous className="h-7 w-7 bg-primary p-1 text-white rounded-md" />
                        <h3 className="block text-[18px] font-sp-pro-text-regular ml-2 item-center">
                          Gender
                        </h3>
                      </div>
                      <p className="ml-10">{userDetail.gender}</p>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 sm:w-full">
                  <div className="block">
                    <div className="py-5">
                      <div className="flex ">
                        <UserCircleIcon className="h-7 w-7 bg-primary p-1 text-white rounded-md" />
                        <h3 className="block text-[18px] font-sp-pro-text-regular ml-2  item-center">
                          Role
                        </h3>
                      </div>
                      <p className="ml-10">ROLE_User</p>
                    </div>

                    <div className="py-5 ">
                      <div className="flex">
                        <PhoneIcon className="h-7 w-7 bg-primary p-1 text-white rounded-md" />
                        <h3 className="block text-[18px] font-sp-pro-text-regular ml-2 item-center">
                          Phone Number
                        </h3>
                      </div>
                      <p className="ml-10">+855 93 200 138</p>
                    </div>

                    <div className="py-5">
                      <div className="flex">
                        <MapPinIcon className="h-7 w-7 bg-primary p-1 text-white rounded-md" />
                        <h3 className="block text-[18px] font-sp-pro-text-regular ml-2 item-center">
                          Address
                        </h3>
                      </div>
                      <p className="ml-10 w-full">
                        Steung meanchey, Dongkao, Phnom Penh
                      </p>
                    </div>
                  </div>
                  <div className="flex mt-5 justify-end flex-row w-full">
                    <div className="text-primary border border-primary cursor-pointer  w-4/12 p-2  rounded-lg flex justify-center">
                      <button className="flex justify-around font-sp-pro-text-regular items-center xl:text-[16px] text-[12px] ">
                        Cancel
                      </button>
                    </div>
                    <div className="bg-primary cursor-pointer  ml-6 w-4/12 p-2 rounded-lg flex justify-center">
                      <button className="flex  justify-around text-white font-sp-pro-text-regular items-center text-[12px] xl:text-[16px]">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>