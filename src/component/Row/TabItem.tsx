import React from "react";
import icon from "../../assets/images/User2.png";

const TabItem = () => {
  return (
    <div className="w-72 ">
      <div className="flex flex-col items-center bg-primaryVariant rounded p-2 ">
        <img className="h-5 w-5" src={icon} alt="menu Icon" />
        <h5 className="text-cyan-50 text-center ">Address and Loan purpose</h5>
      </div>
    </div>
  );
};

export default TabItem;
