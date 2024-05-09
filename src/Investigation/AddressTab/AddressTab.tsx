import React, { useContext, useEffect } from "react";
import RowItemActionable from "./RowItemActionable";
import AuthUserContext, {
  AuthUserContextType,
} from "../../global/contexts/AuthUserContext";
import { GlobalUpDataModel } from "../../global/model/GlobalUpDataModel";
import { BaseRequestModel } from "../../global/model/request/BaseRequestModel";
import useCommand from "../../global/hooks/useCommand";
import useLocation from "../../global/hooks/useLocation";

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

interface addressProps {
  addressViewData: any;
  UpdateHandler: any;
  SubmitHandler: any;
}

const title = [
  "Present Address",
  "Permanent Address",
  "Work Address",
  "Loan Purpose",
];

const AddressTab: React.FC<addressProps> = ({
  addressViewData,
  UpdateHandler,
  SubmitHandler,
}) => {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const base = new BaseRequestModel(authUser);

  console.log(addressViewData);

  const publishHandler = (dataIndex: number) => {
    const addressModel = new GlobalUpDataModel(authUser);
    addressViewData?.forEach((element: any, index: number) => {
      if (index === dataIndex) {
        addressModel.LoanInvestigationId = element?.LoanInvestigationId;

        addressModel.InformerDesignation = element?.InformerDesignation;
        addressModel.Informers = element?.Informers;
        addressModel.InformerMobileNumber = element?.InformerMobileNumber;
        addressModel.InformerAccountNumber = element?.InformerAccountNumber;
        addressModel.InformerIsMember = element?.InformerIsMember;
        addressModel.InvestigationData = element?.InvestigationData;
        addressModel.LoanInvestigationDetailsId =
          element?.LoanInvestigationDetailsId;
        addressModel.IsCorrect = element?.IsCorrect;

        console.log(JSON.stringify(addressModel), addressModel, index);

        const FinalRequestObj = {
          ...addressModel,
          ...base,
        };
        console.log(FinalRequestObj);
        SubmitHandler(FinalRequestObj);
      }
    });
  };

  return (
    <>
      {addressViewData?.map((item: any, index: number) => (
        <RowItemActionable
          allData={addressViewData}
          data={addressViewData[index]}
          key={index}
          getUserInput={(
            name: string,
            value: boolean | string | number,
            index: number
          ) => {
            UpdateHandler(name, value, index);
          }}
          index={index}
          value={item.InvestigationData}
          title={title?.[index]}
          firstRow={index == 0}
          btnUpdateData={(index: number) => {
            publishHandler(index);
          }}
        ></RowItemActionable>
      ))}

      {/* below is for testing */}
      {/* <LocationComponent></LocationComponent> */}
    </>
  );
};

export default AddressTab;
