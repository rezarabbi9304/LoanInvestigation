import React, { useContext } from "react";
import statement from "../../assets/images/deposits/confidential.png";
import AuthUserContext, {
  AuthUserContextType,
} from "../../global/contexts/AuthUserContext";
import DocRowItem from "./DocRowItem";
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

interface DocProps {
  documentViewData: any;
  UpdateHandler: any;
  SubmitHandler: any;
}

const DocumentTab: React.FC<DocProps> = ({
  documentViewData,
  UpdateHandler,
  SubmitHandler
}) => {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const base = new BaseRequestModel(authUser);
  const publishHandler = (dataIndex: number) => {
    const documentModel = new GlobalUpDataModel(authUser);
    documentViewData?.forEach((element: any, index: number) => {
      if (index === dataIndex) {
        documentModel.LoanInvestigationId = element?.LoanInvestigationId;

        documentModel.InformerDesignation = element?.InformerDesignation;
        documentModel.Informers = element?.Informers;
        documentModel.InformerMobileNumber = element?.InformerMobileNumber;
        documentModel.InformerAccountNumber = element?.InformerAccountNumber;
        documentModel.InformerIsMember = element?.InformerIsMember;
        documentModel.InvestigationData = element?.InvestigationData;
        documentModel.LoanInvestigationDetailsId =
          element?.LoanInvestigationDetailsId;
        documentModel.IsCorrect = element?.IsCorrect;
        console.log(JSON.stringify(documentModel), documentModel, index);

        const FinalRequestObj = {
          ...documentModel,
          ...base,
         
        };
        console.log(FinalRequestObj);
        SubmitHandler(FinalRequestObj);
      }
    });
  };
  return (
    <>
      {documentViewData?.map((item: any, index: number) => (
        <DocRowItem
          key={index}
          allData={documentViewData}
          getUserInput={(
            name: string,
            value: boolean | string | number,
            index: number
          ) => {
            UpdateHandler(name, value, index);
          }}
          data={documentViewData[index]}
          index={index}
          title={JSON.parse(item?.InvestigationData)[0]?.PrerequisitesName}
          firstRow={item.firstRow}
          btnUpdateData={(index: number) => {
            publishHandler(index);
          }}
        >
          {" "}
          <img
            src={statement}
            className="w-full border-2  border-primary  rounded"
            alt="statement"
          ></img>
        </DocRowItem>
      ))}
    </>
  );
};

export default DocumentTab;
