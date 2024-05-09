import React, { useContext } from "react";
import FinalRowItem from "./FinalRowItem";
import { formatToTkSymbolMoney } from "../../global/utils/textUtils";
import { GlobalUpDataModel } from "../../global/model/GlobalUpDataModel";
import AuthUserContext, { AuthUserContextType } from "../../global/contexts/AuthUserContext";
import { BaseRequestModel } from "../../global/model/request/BaseRequestModel";

/**========================================================================
 * ?                                Tab
 * @author         :Reza-e-rabbi
 * @designation    :  Software Developer
 * @email          :
 * @description    :
 * @createdOn      :  Oct/11/2023
 * @updatedBy      :
 * @updatedOn      :
 *========================================================================**/

interface finalProps {
  incomeData: any;
  ExpenseData: any;
  LoanAmount: any;
  FinalTabData: any;
  updateHandler: any;
  SubmitHandler: any;
}

const FinalTab: React.FC<finalProps> = ({
  incomeData,
  ExpenseData,
  LoanAmount,
  FinalTabData,
  updateHandler,
  SubmitHandler,
}) => {
  console.log(FinalTabData);
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const base = new BaseRequestModel(authUser);

  const publishHandler = ()=>{
    let FinalTabModel = new GlobalUpDataModel(authUser);

    FinalTabModel = FinalTabData
    SubmitHandler({...FinalTabModel,...base})
    


  }

  // get Total Applied Income

  function getTotalIncome(data: any) {
    var Total: number = 0;

    data?.forEach((element: any) => {
      if (element?.InvestigationData != "Non Disclosure") {
        Total = Total + JSON.parse(element?.InvestigationData)[0]?.Amount;
      }
    });

    return Total;
  }

  // get Total Applied Expense

  function getTotalExpense(data: any) {
    var Total: number = 0;

    data?.forEach((element: any) => {
      if (element?.InvestigationData != "Non Disclosure") {
        Total = Total + JSON.parse(element?.InvestigationData)[0]?.Amount;
      }
    });

    return Total;
  }

  // balance of Applied income and expense

  function getAppliedBalanceDifference(Income: any, expense: any) {
    var Balance = 0;

    return (Balance = Income - expense);
  }

  // get Total BY Investigation Income/Expense

  function getTotalInvestigatedAmount(data: any) {
    var Total: number = 0;

    data?.forEach((element: any) => {
      Total = Total + parseInt(element?.InvestigatorFindings);
    });

    return Total;
  }

  const AppliedInstallmentAmount = Math.ceil(
    LoanAmount?.AppliedAmount / LoanAmount?.totalInstallment
  );

  const BalanceDifference = getAppliedBalanceDifference(
    getTotalInvestigatedAmount(incomeData),
    getTotalInvestigatedAmount(ExpenseData)
  );

  const halfOfInvestigatedBalance = Math.ceil(BalanceDifference / 2);

  // get Total Investigate Expense
  console.log(incomeData);

  return (
    <>
      <div className="flex shadow-sm bg-[#fafafc] shadow-surface  flex-col md:flex-col lg:flex-row gap-3 p-2  border-2  items-center  border-surface  rounded">
        <table className="table-fixed w-full">
          <thead className="">
            <tr className="sticky -top-0  h-16 w-full bg-surface text-sm uppercase text-onSurface shadow-sm md:table-row">
              <th className="border border-gray-200 p-2 text-left ">
                <p className="p-2 md:p-0">Particulars</p>
              </th>
              <th className="border border-gray-200 p-2 text-left ">
                <p className="p-2 md:p-0">Applied Amount</p>
              </th>
              <th className="border border-gray-200 p-2 text-left ">
                <p className="p-2 md:p-0">Investigated Amount</p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="my-3  flex-wrap border border-t border-surface first:border-t-0 odd:bg-slate-200 even:bg-slate-300 ">
              <td>Income</td>
              <td>{formatToTkSymbolMoney(getTotalIncome(incomeData))}</td>
              <td>
                {formatToTkSymbolMoney(getTotalInvestigatedAmount(incomeData))}
              </td>
            </tr>
            <tr className="my-3  flex-wrap border border-t border-surface first:border-t-0 odd:bg-slate-200 even:bg-slate-300 ">
              <td>Expense</td>
              <td>{formatToTkSymbolMoney(getTotalExpense(ExpenseData))}</td>
              <td>
                {formatToTkSymbolMoney(getTotalInvestigatedAmount(ExpenseData))}
              </td>
            </tr>
            <tr className="my-3  flex-wrap border border-t  first:border-t-0  ">
              <td className="font-semibold">BALANCE</td>
              <td className="text-primary  font-bold">
                {formatToTkSymbolMoney(
                  getAppliedBalanceDifference(
                    getTotalIncome(incomeData),
                    getTotalExpense(ExpenseData)
                  )
                )}
              </td>
              <td className="text-primary  font-bold">
                {" "}
                {formatToTkSymbolMoney(
                  getAppliedBalanceDifference(
                    getTotalInvestigatedAmount(incomeData),
                    getTotalInvestigatedAmount(ExpenseData)
                  )
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex shadow-sm bg-[#fafafc] shadow-surface  flex-col md:flex-col lg:flex-row gap-3 p-2  border-2  items-center  border-surface  rounded">
        <table className="table-fixed w-full">
          <thead className="">
            <tr className="sticky -top-0  h-16 w-full bg-surface text-sm uppercase text-onSurface shadow-sm md:table-row">
              <th className="border border-gray-200 p-2 text-left ">
                <p className="p-2 md:p-0">Particulars</p>
              </th>
              <th className="border border-gray-200 p-2 text-left ">
                <p className="p-2 md:p-0">Loan Amount</p>
              </th>
              <th className="border border-gray-200 p-2 text-left ">
                <p className="p-2 md:p-0">Installment Amount</p>
              </th>
              <th className="border border-gray-200 p-2 text-left ">
                <p className="p-2 md:p-0">Number of Installment </p>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="my-3  flex-wrap border border-t border-surface first:border-t-0 odd:bg-slate-200 even:bg-slate-300">
              <td>Applied</td>
              <td>{formatToTkSymbolMoney(LoanAmount?.AppliedAmount)}</td>
              <td>{formatToTkSymbolMoney(AppliedInstallmentAmount)}</td>
              <td>{formatToTkSymbolMoney(LoanAmount?.totalInstallment)}</td>
            </tr>
            <tr className="my-3  flex-wrap border border-t border-surface first:border-t-0  ">
              <td className=" font-semibold">SUGGESTED</td>
              <td className="text-primary  font-bold">
                {halfOfInvestigatedBalance >= AppliedInstallmentAmount
                  ? formatToTkSymbolMoney(
                      AppliedInstallmentAmount * LoanAmount?.totalInstallment
                    )
                  : halfOfInvestigatedBalance > 0
                  ? formatToTkSymbolMoney(
                      halfOfInvestigatedBalance * LoanAmount?.totalInstallment
                    )
                  : formatToTkSymbolMoney(0)}
              </td>
              <td className="text-primary  font-bold">
                {halfOfInvestigatedBalance > AppliedInstallmentAmount
                  ? formatToTkSymbolMoney(AppliedInstallmentAmount)
                  : halfOfInvestigatedBalance > 0
                  ? formatToTkSymbolMoney(halfOfInvestigatedBalance)
                  : formatToTkSymbolMoney(0)}
              </td>
              <td className="text-primary  font-bold">
                {halfOfInvestigatedBalance > 0
                  ? formatToTkSymbolMoney(LoanAmount?.totalInstallment)
                  : formatToTkSymbolMoney(0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <FinalRowItem
        value=""
        title="Suggestions"
        firstRow={true}
        data={FinalTabData}
        getUserInput={(name: string, value: string | number) => {
          updateHandler(name, value);
        }}
        btnUpdateData={() => {
          publishHandler();
        }}
      ></FinalRowItem>
    </>
  );
};

export default FinalTab;
