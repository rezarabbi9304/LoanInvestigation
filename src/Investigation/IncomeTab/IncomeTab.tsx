import React, { useContext } from "react";
import AuthUserContext, {
  AuthUserContextType,
} from "../../global/contexts/AuthUserContext";
import { GlobalUpDataModel } from "../../global/model/GlobalUpDataModel";
import IncomeRowItem from "./IncomRowItem";
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

interface IncomeProps {
  ViewData: any;
  UpdateHandler: any;
  SubmitHandler: any;
}

const IncomeTab: React.FC<IncomeProps> = ({
  ViewData,
  UpdateHandler,
  SubmitHandler,
}) => {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const base = new BaseRequestModel(authUser);

  const publishHandler = (dataIndex: number) => {
    const incomeModel = new GlobalUpDataModel(authUser);
    ViewData?.forEach((element: any, index: number) => {
      if (index === dataIndex) {
        // const tempObj = JSON.parse(element?.InvestigationData)[0];
        // var data = [
        //   {
        //     ...tempObj,
        //     Remarks: element?.InvestigatorFindings,
        //   },
        // ];

        incomeModel.LoanInvestigationId = element?.LoanInvestigationId;

        incomeModel.InformerDesignation = element?.InformerDesignation;
        incomeModel.Informers = element?.Informers;
        incomeModel.InformerMobileNumber = element?.InformerMobileNumber;
        incomeModel.InformerAccountNumber = element?.InformerAccountNumber;
        incomeModel.InformerIsMember = element?.InformerIsMember;
        // incomeModel.InvestigationData = JSON.stringify(data);
        incomeModel.LoanInvestigationDetailsId =
          element?.LoanInvestigationDetailsId;
        incomeModel.LoanInvestigationId = element?.LoanInvestigationId;
        incomeModel.Remarks = element?.InvestigatorFindings;

        if (ViewData[index]?.InvestigationData === "Non Disclosure") {
          incomeModel.IsCorrect = true;
        } else {
          incomeModel.IsCorrect =
            element?.InvestigatorFindings ===
            JSON.parse(ViewData[index]?.InvestigationData)[0]?.Amount
              ? true
              : false;
        }

        console.log(JSON.stringify(incomeModel), incomeModel, index);
        const FinalRequestObj = {
          ...incomeModel,
          ...base,
        };
        SubmitHandler(FinalRequestObj);
      }
    });
  };
  return (
    <>
      {ViewData?.map((item: any, index: number) => (
        <IncomeRowItem
          firstRow={item.firstRow}
          allData={ViewData}
          data={ViewData[index]}
          btnUpdateData={(index: number) => {
            publishHandler(index);
            // income
          }}
          index={index}
          getUserInput={(
            name: string,
            value: boolean | string | number,
            index: number
          ) => {
            UpdateHandler(name, value, index);
          }}
        ></IncomeRowItem>
      ))}
    </>
  );
};

export default IncomeTab;
