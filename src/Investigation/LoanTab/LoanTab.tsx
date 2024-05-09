import React, { useContext } from "react";
import LoanRowItem from "./LoanRowItem";

import AuthUserContext, {
  AuthUserContextType,
} from "../../global/contexts/AuthUserContext";
import { GlobalUpDataModel } from "../../global/model/GlobalUpDataModel";
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

interface LoanProps {
  ViewData: any;
  UpdateHandler: any;
  SubmitHandler: any;
}

const LoanTab: React.FC<LoanProps> = ({
  ViewData,
  UpdateHandler,
  SubmitHandler,
}) => {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const base = new BaseRequestModel(authUser);

  const publishHandler = (dataIndex: number) => {
    const loanModel = new GlobalUpDataModel(authUser);
    ViewData?.forEach((element: any, index: number) => {
      if (index === dataIndex) {
        loanModel.InformerAccountNumber = element?.InformerAccountNumber;

        loanModel.InformerIsMember = element?.InformerIsMember;
        loanModel.Informers = element?.Informers;
        loanModel.InformerDesignation = element?.InformerDesignation;
        loanModel.InformerMobileNumber = element?.InformerMobileNumber;
        loanModel.LoanInvestigationDetailsId =
          element?.LoanInvestigationDetailsId;
        loanModel.LoanInvestigationId = element?.LoanInvestigationId;

        loanModel.Remarks = element?.InvestigatorFindings;

        if (ViewData[index]?.InvestigationData === "Non Disclosure") {
          loanModel.IsCorrect = true;
        } else {
          loanModel.IsCorrect =
            element?.InvestigatorFindings ===
            JSON.parse(ViewData[index]?.InvestigationData)[0]?.LoanAmount
              ? true
              : false;
        }

        // console.log(JSON.parse(ViewData[index]?.InvestigationData));
        console.log(JSON.stringify(loanModel), loanModel, index);
        const FinalRequestObj = {
          ...loanModel,
          ...base,
        };

        SubmitHandler(FinalRequestObj);
      }
    });
  };

  return (
    <>
      {ViewData?.map((item: any, index: number) => (
        <LoanRowItem
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
        ></LoanRowItem>
      ))}
    </>
  );
};

export default LoanTab;
