import React, { useContext } from "react";
import AuthUserContext, {
  AuthUserContextType,
} from "../../global/contexts/AuthUserContext";
import { GlobalUpDataModel } from "../../global/model/GlobalUpDataModel";
import ExpenseRowItem from "./ExpenseRowItem";
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

interface ExpenseProps {
  ViewData: any;
  UpdateHandler: any;
  SubmitHandler: any;
}

const ExpenseTab: React.FC<ExpenseProps> = ({
  ViewData,
  UpdateHandler,
  SubmitHandler,
}) => {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const base = new BaseRequestModel(authUser);

  console.log(ViewData);

  const publishHandler = (dataIndex: number) => {
    const expenseModel = new GlobalUpDataModel(authUser);
    ViewData?.forEach((element: any, index: number) => {
      if (index === dataIndex) {
        // const tempObj = JSON.parse(element?.InvestigationData)[0];
        // var data = [
        //   {
        //     ...tempObj,
        //     Remarks: element?.InvestigatorFindings,
        //   },
        // ];
        // console.log(data);
        expenseModel.LoanInvestigationId = element?.LoanInvestigationId;
        expenseModel.InformerAccountNumber = element?.InformerAccountNumber;
        expenseModel.Informers = element?.Informers;
        expenseModel.InformerDesignation = element?.InformerDesignation;
        expenseModel.InformerMobileNumber = element?.InformerMobileNumber;
        // expenseModel.InvestigationData = JSON.stringify(data);
        expenseModel.LoanInvestigationDetailsId =
          element?.LoanInvestigationDetailsId;
        expenseModel.LoanInvestigationId = element?.LoanInvestigationId;
        expenseModel.Remarks = element?.InvestigatorFindings;
        if (ViewData[index]?.InvestigationData === "Non Disclosure") {
          expenseModel.IsCorrect = true;
        } else {
          expenseModel.IsCorrect =
            element?.InvestigatorFindings ===
            JSON.parse(ViewData[index]?.InvestigationData)[0]?.Amount
              ? true
              : false;
        }

        console.log(JSON.stringify(expenseModel), expenseModel, index);
        const FinalRequestObj = {
          ...expenseModel,
          ...base,
        };

        SubmitHandler(FinalRequestObj);
      }
    });
  };

  return (
    <>
      {ViewData?.map((item: any, index: number) => (
        <ExpenseRowItem
          firstRow={item.firstRow}
          allData={ViewData}
          data={ViewData[index]}
          btnUpdateData={(index: number) => {
            publishHandler(index);
          }}
          index={index}
          getUserInput={(
            name: string,
            value: boolean | string | number,
            index: number
          ) => {
            UpdateHandler(name, value, index);
          }}
        ></ExpenseRowItem>
      ))}
    </>
  );
};

export default ExpenseTab;
