import React, { useContext } from "react";
import logo from "../assets/images/logo/white_logo.png";
import AuthUserContext, {
  AuthUserContextType,
} from "../global/contexts/AuthUserContext";

/**========================================================================
 * ?                                Hook
 * @author         :Reza-e-rabbi
 * @designation    :  Software Developer
 * @email          :
 * @description    :
 * @createdOn      :  Oct/11/2023
 * @updatedBy      :
 * @updatedOn      :
 *========================================================================**/

interface headerProps {
  userData: any;
  InvestigationFor: any;
}

const Header: React.FC<headerProps> = ({ userData, InvestigationFor }) => {
  const { clearAuthUserData, authUser } = useContext(
    AuthUserContext
  ) as AuthUserContextType;
  console.log(authUser.InvestigationArea);
  // clearAuthUserData();

  return (
    <div className="sticky top-0 z-20 w-full  bg-primary transition-all duration-300 text-white">
      <div className="flex justify-center items-start p-3">
        <div className="self-start flex gap-6">
          <div className="flex gap-3 items-center">
            <i className="fa-solid fa-user-secret fa-lg"></i>
            {/* <img
              className="h-10 w-10 rounded-full border border-gray-800 shadow"
              src={`data:image/png;base64, ${
                userData ? userData?.UserPicture : ""
              }`}
              alt="user"
            ></img> */}
            <div>{userData?.UserName}</div>
          </div>
          <div className="flex gap-3 items-center">
            <i className="fa-solid fa-location-dot fa-lg"></i>
            <div>{authUser.InvestigationArea}</div>
          </div>
        </div>{" "}
        <div className="flex self-center mx-auto h-full gap-3  items-center">
          <i className="fa-solid fa-circle-user fa-lg fa-beat fa-xs self-center bg-primaryVariant"></i>
          <div className="self-center">
            {" "}
            Loan Investigation :{InvestigationFor}
          </div>
        </div>
        <i
          className="fa-solid fa-right-from-bracket self-center hover:cursor-pointer"
          onClick={() => {
            clearAuthUserData();
          }}
        ></i>
      </div>
    </div>
  );
};

export default Header;
