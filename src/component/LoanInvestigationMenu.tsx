import React, { useEffect, useState } from "react";
import TabItem from "./Row/TabItem";
import icon from "../assets/icons/investigation icons/hash.png";

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

interface LoanInvestigationMenuBarProps {
  onClicks: any;
  ResetTab: any;
}

const LoanInvestigationMenu: React.FC<LoanInvestigationMenuBarProps> = ({
  onClicks,
  ResetTab,
}) => {
  const [Tab, setTab] = useState("address");

  useEffect(() => {
    if (ResetTab != "") {
      setTab("address");
      onClicks("address");
    }
  }, [ResetTab]);

  return (
    <div className="flex bg-surface overflow-x-auto hover:cursor-pointer space-x-2 p-1">
      <div
        className="w-72 cursor-pointer"
        onClick={() => {
          onClicks("address");
          setTab("address");
        }}
      >
        <div
          className={`w-72 flex flex-col items-center ${
            Tab === "address" ? "bg-primary" : "bg-primaryVariant"
          } rounded p-2`}
        >
          <i
            className={`fa-solid fa-circle-info  ${
              Tab === "address" ? "text-cyan-50" : "text-primary"
            } `}
          ></i>
          <h5 className="text-cyan-50 text-center ">
            Address and Loan purpose
          </h5>
        </div>
      </div>

      <div
        className="w-72 cursor-pointer"
        onClick={() => {
          setTab("document");
          onClicks("document");
        }}
      >
        <div
          className={`w-72 flex flex-col items-center ${
            Tab === "document" ? "bg-primary" : "bg-primaryVariant"
          } rounded p-2 `}
        >
          <i
            className={`fa-regular fa-file  ${
              Tab === "document" ? "text-cyan-50" : "text-primary"
            }`}
          ></i>
          <h5 className="text-cyan-50 text-center ">Verify Document</h5>
        </div>
      </div>

      <div
        className="w-72 cursor-pointer"
        onClick={() => {
          onClicks("income");
          setTab("income");
        }}
      >
        <div
          className={`w-72 flex flex-col items-center ${
            Tab === "income" ? "bg-primary" : "bg-primaryVariant"
          } rounded p-2`}
        >
          <i
            className={`fa-solid fa-money-bill-wave  ${
              Tab === "income" ? "text-cyan-50" : "text-primary"
            }`}
          ></i>
          <h5 className="text-cyan-50 text-center ">Income</h5>
        </div>
      </div>

      <div
        className="w-72 cursor-pointer"
        onClick={() => {
          onClicks("Expense");
          setTab("Expense");
        }}
      >
        <div
          className={`w-72 flex flex-col items-center  ${
            Tab === "Expense" ? "bg-primary" : "bg-primaryVariant"
          } rounded p-2`}
        >
          <i
            className={`fa-solid fa-money-bill-wheat ${
              Tab === "Expense" ? "text-cyan-50" : "text-primary"
            }`}
          ></i>
          <h5 className="text-cyan-50 text-center ">Expense</h5>
        </div>
      </div>

      <div
        className="w-72 cursor-pointer"
        onClick={() => {
          onClicks("Existing Loans");
          setTab("Existing Loans");
        }}
      >
        <div
          className={`w-72 flex flex-col items-center ${
            Tab === "Existing Loans" ? "bg-primary" : "bg-primaryVariant"
          } rounded p-2`}
        >
          <i
            className={`fa-solid fa-hand-holding-dollar ${
              Tab === "Existing Loans" ? "text-cyan-50" : "text-primary"
            }`}
          ></i>
          <h5 className="text-cyan-50 text-center ">Existing Loans</h5>
        </div>
      </div>

      <div
        className="w-72 cursor-pointer"
        onClick={() => {
          onClicks("Final");
          setTab("Final");
        }}
      >
        <div
          className={`w-72 flex flex-col items-center ${
            Tab === "Final" ? "bg-primary" : "bg-primaryVariant"
          } rounded p-2`}
        >
          <i
            className={`fa-solid fa-door-closed ${
              Tab === "Final" ? "text-cyan-50" : "text-primary"
            }`}
          ></i>
          <h5 className="text-cyan-50 text-center ">Final</h5>
        </div>
      </div>
    </div>
  );
};

export default LoanInvestigationMenu;
