import CryptoJS from "crypto-js";
import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import investigatorIcon from "../../assets/icons/invesitgator_icon.png";
import MyButton from "../../global/MyButton";
import MyPasswordInput from "../../global/MyPasswordInput";
import MyTextInput from "../../global/MyTextInput";
import AuthUserContext, {
  AuthUserContextType,
} from "../../global/contexts/AuthUserContext";
import FailedDialogue from "../../global/dialogues/FailedDialogue";
import LoaderDialogue from "../../global/dialogues/LoaderDialogue";
import { Size } from "../../global/enum/Size";
import useCommand from "../../global/hooks/useCommand";

import useLoginViewInputState from "./hooks/useLoginViewInputState";
import { AuthUserModel } from "./model/data/AuthUserModel";
import { IAuthUserModel } from "./model/data/IAuthUserModel";
import { LoginRequestModel } from "./model/request/LoginRequestModel";
import { LoginResponseModel } from "./model/response/LoginResponseModel";
import { validateLoginViewInputState } from "./validation/validateLoginViewInputState";
import useLocation from "../../global/hooks/useLocation";

/**========================================================================
 * ?                                ABOUT
 * @author         :  name_on_card
 * @designation    :  Software Developer
 * @email          :  newtonmitro@gmail.com
 * @description    :
 * @createdOn      :  01 July 2023
 * @updatedBy      :  Israfil
 * @updatedOn      :  02 July 2023
 *========================================================================**/
interface LoginViewProps {
  closeLoginWindow: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ closeLoginWindow }) => {
  const { storeAuthUserData, authUser } = useContext(
    AuthUserContext
  ) as AuthUserContextType;

  const { getLocation, location, locationError } = useLocation();

  const {
    loginViewInputState,
    updateLoginViewInputState,
    resetLoginViewInputState,
  } = useLoginViewInputState();

  const {
    loading: userLoginResponseDataLoading,
    headers: userLoginResponseHeaders,
    data: userLoginResponseData,
    setData: setUserLoginResponseData,
    message: userLoginResponseMessage,
    status: userLoginResponseStatus,
    setStatus: setUserLoginResponseStatus,
    executeCommand: userLoginRequestExecuteCommand,
  } = useCommand<LoginResponseModel[] | null>();

  useEffect(() => {
    getLocation();

    //  if(location !== null){
    //     handleLoginRequest()
    //   }

    if (userLoginResponseData) {
      closeLoginWindow();
      resetLoginViewInputState();

      const authUserModel: IAuthUserModel = new AuthUserModel();
      authUserModel.UserId = userLoginResponseData[0]?.userid;
      authUserModel.UserName = userLoginResponseData[0]?.UserName;
      authUserModel.UserPicture = userLoginResponseData[0]?.UserPicture;
      authUserModel.Email = userLoginResponseData[0]?.loginemail;
      authUserModel.Address = userLoginResponseData[0]?.Address;
      authUserModel.RegMobile = userLoginResponseData[0]?.RegMobile;
      authUserModel.RoleId = userLoginResponseData[0]?.RoleId;
      authUserModel.RoleName = userLoginResponseData[0]?.RoleName;
      authUserModel.WebPortalMenuList =
        userLoginResponseData[0]?.WebPortalMenuList;
      authUserModel.PersonId = userLoginResponseData[0]?.personid;
      authUserModel.EmployeeCode = userLoginResponseData[0]?.EmployeeCode;
      authUserModel.InvestigationArea =
        userLoginResponseData[0]?.InvestigationArea;
      authUserModel.RolePermissionIds = userLoginResponseData[0]?.RoleId;

      storeAuthUserData(authUserModel);
      localStorage.setItem("token", userLoginResponseHeaders?.token);
      // after login success
    }

    return () => {
      setUserLoginResponseData(null);
    };
  }, [userLoginResponseData, location]);

  const handleLoginRequest = () => {
    if (location !== null) {
      //
      let hasErrors = "";
      let fieldName: keyof typeof loginViewInputState;
      for (fieldName in loginViewInputState) {
        updateLoginViewInputState(fieldName, loginViewInputState[fieldName]);
        hasErrors =
          hasErrors +
          validateLoginViewInputState(
            fieldName,
            loginViewInputState[fieldName]
          );
      }
      if (hasErrors.length === 0) {
        const encryptPassword = CryptoJS.MD5(loginViewInputState.userPass);
        const loginRequestModel = new LoginRequestModel();
        loginRequestModel.UserName = loginViewInputState.userName;
        loginRequestModel.Password = encryptPassword.toString();
        console.log(JSON.stringify(loginRequestModel));

        userLoginRequestExecuteCommand(
          process.env.REACT_APP_BASE_URL + "/Auth_V2/UserLogin",
          JSON.stringify(loginRequestModel),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } else {
      getLocation();
    }
  };

  console.log(userLoginResponseData);

  return (
    <>
      <LoaderDialogue isLoading={userLoginResponseDataLoading} />

      {/* Start login failed request dialogue */}
      <FailedDialogue
        dialogueSize={Size.Small}
        isDialogueOpen={userLoginResponseStatus === "failed" ? true : false}
        cancelButtonText="ok"
        onCloseButtonClick={() => {
          setUserLoginResponseStatus(null);
        }}
      >
        {userLoginResponseMessage}
      </FailedDialogue>

      {/* End of login failed request dialogue */}

      {/* Start login view */}
      <div className="relative w-full overflow-hidden rounded-sm bg-surfaceFocus py-6 px-6 shadow-sm md:px-10 lg:px-20">
        <MyButton
          onClick={() => {
            resetLoginViewInputState();
            setUserLoginResponseData(null);
            setUserLoginResponseStatus(null);
            closeLoginWindow();
          }}
          styleClass="absolute top-1 right-0 w-10 font-semibold transition-all transform duration-300 hover:scale-150 origin-center  hover:text-error"
          label={""}
          name={""}
          type={undefined}
        >
          {/* <i className="fa-solid fa-xmark text-3xl"></i> */}
        </MyButton>
        <div className="flex w-full flex-col items-center text-onSurface">
          <div className="hover:animate-swing mb-6 flex w-full flex-col items-center hover:cursor-pointer">
            <img src={investigatorIcon} alt="" className="w-28" />
            <motion.h2 className="text-center text-2xl font-extrabold uppercase">
              Investigator Login
            </motion.h2>
            <h3 className="text-center text-sm">Login to your account</h3>
          </div>
          <form
            className="grid  w-full grid-cols-1 gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              handleLoginRequest();
            }}
          >
            <MyTextInput
              label="Email"
              value={loginViewInputState.userName}
              leftIcon={<i className="fa-solid fa-at"></i>}
              name="userName"
              id="username"
              required={true}
              error={loginViewInputState.errors.userName}
              inputType="text"
              onChangeHandler={(event) =>
                updateLoginViewInputState(event.target.name, event.target.value)
              }
            />

            <MyPasswordInput
              label="Password"
              value={loginViewInputState.userPass}
              leftIcon={<i className="fa-solid fa-key"></i>}
              name="userPass"
              id="userPass"
              required={true}
              error={loginViewInputState.errors.userPass}
              onChangeHandler={(event) => {
                updateLoginViewInputState(
                  event.target.name,
                  event.target.value
                );
              }}
            />

            <div className="flex flex-col gap-6 lg:flex-row">
              <MyButton
                type="submit"
                label="Log in"
                styleClass="w-full rounded bg-primaryVariant px-7 py-3 text-sm font-medium uppercase text-onPrimary hover:bg-primaryVariant shadow-md transition duration-150 hover:scale-105"
                name={""}
              />
            </div>
          </form>
          <span className="text-error">{locationError}</span>
        </div>
      </div>
      {/* End login view */}
    </>
  );
};

export default LoginView;
