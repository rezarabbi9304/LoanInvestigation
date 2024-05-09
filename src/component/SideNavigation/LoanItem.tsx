import React, { useState } from "react";
import icon from "../../assets/images/User2.png";
import uparrow from "../../assets/icons/investigation icons/uparrow.png";

import RowItemView from "./RowItemView";
import MyButton from "../../global/MyButton";

interface loanItemprops {
  loanItem: any;
  startInvestigateHandler?: any;
  passingLoanDetailsParam?: any;
}

const LoanItem: React.FC<loanItemprops> = ({
  loanItem,
  startInvestigateHandler,
  passingLoanDetailsParam,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navOpenHandler = () => {
    if (isMenuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  return (
    <div
      className={` transition-all duration-300 border-2  border-primaryVariant rounded`}
    >
      <div
        className="w-full bg-white border-2 border-primaryVariant rounded flex justify-between items-center"
        onClick={() => {
          navOpenHandler();
        }}
      >
        <div className="flex space-x-2   rounded p-2 item-center">
          <div className="flex  gap-2 self-center">
            {loanItem?.FullName === "Raven mark quiah" ? (
              <i className="fa-regular fa-building fa-beat-fade"></i>
            ) : (
              ""
            )}
            {/* <i className="fa-regular fa-building fa-beat-fade"></i> */}
            <i className="fa-solid fa-house-chimney fa-beat-fade"></i>
          </div>

          <h5 className="text-black  self-center font-bold">
            {loanItem?.FullName}
          </h5>
        </div>
        <img
          className={`w-5 h-5 mx-2 transition-all duration-300 ${
            isMenuOpen ? "rotate-180" : "rotate-0"
          } `}
          src={uparrow}
          alt="user icon"
        ></img>
      </div>

      <div
        className={`flex flex-col gap-2  bg-white rounded transition-all duration-300 ${
          isMenuOpen ? "" : "none opacity-0 translate-y-full hidden "
        } `}
      >
        <RowItemView value={loanItem?.LoanNumber} title="Loan Id">
          {" "}
          <i className="fa-solid fa-address-card"></i>
        </RowItemView>
        <RowItemView value={loanItem?.LoanProductName} title="Loan Type">
          <i className="fa-solid fa-layer-group"></i>
        </RowItemView>
        <RowItemView value={loanItem?.BranchName} title="Service Center">
          <i className="fa-solid fa-building"></i>
        </RowItemView>
        <RowItemView value={loanItem?.PurposeOfLoan} title="Purpose">
          <i className="fa-solid fa-bullseye"></i>
        </RowItemView>

        <RowItemView value={loanItem?.AppliedLoanAmount} title="Applied Amount">
          <i className="fa-solid fa-money-bill"></i>
        </RowItemView>
        <RowItemView value={loanItem?.InterestRate} title="Interest">
          <i className="fa-solid fa-percent"></i>
        </RowItemView>
        <RowItemView
          value={`${loanItem?.TotalInstallment} Month`}
          title="Installment"
        >
          <i className="fa-solid fa-calendar-days"></i>
        </RowItemView>
        {loanItem?.PresentAddress ? (
          <>
            {" "}
            <RowItemView value={loanItem?.PresentAddress} title="Loan Id">
              {" "}
              {/* <i className="fa-regular fa-building "></i> */}
              <i className="fa-solid fa-house-chimney"></i>
            </RowItemView>
          </>
        ) : (
          <></>
        )}

        {loanItem?.WorkBusinessAddress ? (
          <RowItemView value={loanItem?.WorkBusinessAddress} title="Loan Id">
            {" "}
            <i className="fa-regular fa-building "></i>
          </RowItemView>
        ) : (
          <></>
        )}

        <div className="flex justify-center p-4">
          <MyButton
            disabled={false}
            onClick={() => {
              startInvestigateHandler();
              passingLoanDetailsParam(
                loanItem?.LoanNumber,
                loanItem?.ApplicationId,
                loanItem?.FullName,
                loanItem?.AppliedLoanAmount,
                loanItem?.TotalInstallment
              );
            }}
            type="button"
            label="Investigate"
            styleClass="w-2/4  rounded border bg-primaryVariant py-2 font-semibold uppercase text-white hover:bg-primaryVariant"
            name={""}
          ></MyButton>
        </div>
      </div>
    </div>
  );
};

export default LoanItem;
