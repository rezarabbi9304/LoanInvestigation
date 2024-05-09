import React, { useCallback, useContext, useEffect, useState } from "react";

import DocumentTab from "../Investigation/DocumentTab/DocumentTab";

import LoanInvestigationMenu from "./LoanInvestigationMenu";
import AddressTab from "../Investigation/AddressTab/AddressTab";
import IncomeTab from "../Investigation/IncomeTab/IncomeTab";
import ExpenseTab from "../Investigation/ExpenseTab/ExpenseTab";
import LoanTab from "../Investigation/LoanTab/LoanTab";
import FinalTab from "../Investigation/FinalTab/FinalTab";
import useAddressViewInputState from "../Investigation/AddressTab/hooks/useAddressViewInputState";
import { obj } from "../Investigation/AddressTab/data/AddressData";
import useDocumentViewInputState from "../Investigation/DocumentTab/hooks/useDocumentViewInputState";
import { DocObj } from "../Investigation/DocumentTab/data/DocumentData";
import useExpenseViewInputState from "../Investigation/ExpenseTab/hooks/useExpenseViewInputState";
import { Expenseobj } from "../Investigation/ExpenseTab/data/ExpenseData";
import useIncomeViewInputState from "../Investigation/IncomeTab/hooks/useIncomeViewInputState";
import { Incomeobj } from "../Investigation/IncomeTab/data/IncomeData";
import useLoanViewInputState from "../Investigation/LoanTab/hooks/useLoanViewInputState";
import { LoanObj } from "../Investigation/LoanTab/data/IncomeData";
import InformerListContext, {
  InformerContextType,
} from "../global/contexts/InformerListContext";
import { forEachChild } from "typescript";
import useCommand from "../global/hooks/useCommand";
import useLocation from "../global/hooks/useLocation";
import LoaderDialogue from "../global/dialogues/LoaderDialogue";
import AuthUserContext, {
  AuthUserContextType,
} from "../global/contexts/AuthUserContext";
import useFinalUpdateInputState from "../Investigation/FinalTab/hook/useFinalUpdateInputState";
import FailedDialogue from "../global/dialogues/FailedDialogue";
import { Size } from "../global/enum/Size";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

interface LoanInvestigationMainProps {
  DetailsData?: any;
  LoanAmount: any;
  ResetTab: any;
  ResetHandler: any;
}

interface DetailsBody {
  Remarks: string;
  InvestigatorFindings: number | null | any;
  InvestigationData: any;
  StageCode: string;
  LoanAmount: number;
}

const InvestigationBody: React.FC<LoanInvestigationMainProps> = ({
  DetailsData,
  LoanAmount,
  ResetTab,
  ResetHandler,
}) => {
  const [Tab, setTab] = useState("address");

  const { storeInformerData, informerList } = useContext(
    InformerListContext
  ) as InformerContextType;
  const { clearAuthUserData } = useContext(
    AuthUserContext
  ) as AuthUserContextType;
  const { getLocation, location, locationError } = useLocation();

  const notify = (data: any) => toast.success(data, { autoClose: 2000 });

  // addressTab Data Start Here
  const {
    addressViewInputState,
    updateAddressViewInputState,
    setAddressViewInputState,
  } = useAddressViewInputState();

  useEffect(() => {
    if (!obj == null || obj.length > 0) {
      var AddressObj: any[] = [];
      DetailsData?.forEach((Element: DetailsBody) => {
        if (
          (Element?.StageCode != null && Element?.StageCode === "01") ||
          Element?.StageCode === "02" ||
          Element?.StageCode === "03" ||
          Element?.StageCode === "04"
        ) {
          AddressObj.push(Element);
        }
      });

      setAddressViewInputState([...AddressObj]);
    } else {
      setAddressViewInputState([
        {
          InvestigatorFindings: "",
          LoanInvestigationId: 0,
          Informers: "",
          IsCorrect: "",
          InformerDesignation: "",
          InformerMobileNumber: "",
          InformerAccountNumber: "",
          InvestigationData: "",
          LoanApprovalId: "",
          LoanInvestigationDetailsId: "",
        },
      ]);
    }
  }, [setAddressViewInputState, DetailsData]);

  console.log(addressViewInputState);

  // addressTab Data End Here

  // DocumentTab Data Start Here

  const {
    documentViewInputState,
    updateDocumentViewInputState,
    resetAddressViewInputState,
    setDocumentViewInputState,
  } = useDocumentViewInputState();

  useEffect(() => {
    if (!obj == null || obj.length > 0) {
      var DocObject: any[] = [];
      DetailsData?.forEach((Element: DetailsBody, index: number) => {
        if (Element?.StageCode != null && Element?.StageCode === "05") {
          DocObject.push(Element);
        }
      });

      setDocumentViewInputState([...DocObject]);
    } else {
      setDocumentViewInputState([
        {
          InvestigatorFindings: "",
          LoanInvestigationId: 0,
          Informers: "",
          IsCorrect: "",
          InformerDesignation: "",
          InformerMobileNumber: "",
          InformerAccountNumber: "",
          InvestigationData: "",
          LoanApprovalId: "",
          LoanInvestigationDetailsId: "",
        },
      ]);
    }
  }, [setDocumentViewInputState, DetailsData]);

  // DocumentTab Data End Here

  // Expense Data Start Here

  const {
    expenseViewInputState,
    updateExpenseViewInputState,

    setExpenseViewInputState,
  } = useExpenseViewInputState();

  useEffect(() => {
    if (!obj == null || obj.length > 0) {
      var ExpenseObj: any[] = [];
      DetailsData?.forEach((Element: DetailsBody) => {
        if (Element?.StageCode != null && Element?.StageCode === "07") {
          var modifiedObj = Element;
          var obj;

          if (Element?.InvestigationData === "Non Disclosure") {
            if (Element.Remarks === "" || Element.Remarks === null) {
              modifiedObj.InvestigatorFindings = 0;
            } else {
              modifiedObj.InvestigatorFindings = Element.Remarks;
            }
          } else {
            obj = JSON.parse(Element?.InvestigationData);

            if (Element.Remarks === "" || Element.Remarks === null) {
              modifiedObj.InvestigatorFindings = obj[0]?.Amount;
            } else {
              modifiedObj.InvestigatorFindings = parseFloat(Element.Remarks);
            }
          }

          ExpenseObj.push(modifiedObj);
        }
      });

      setExpenseViewInputState([...ExpenseObj]);
    } else {
      setDocumentViewInputState([
        {
          InvestigatorFindings: "",
          LoanInvestigationId: 0,
          Informers: "",
          IsCorrect: "",
          InformerDesignation: "",
          InformerMobileNumber: "",
          InformerAccountNumber: "",
          InvestigationData: "",
          LoanApprovalId: "",
          LoanInvestigationDetailsId: "",
        },
      ]);
    }
  }, [setExpenseViewInputState, DetailsData]);

  // Expense Data End Here

  // Income Data Start Here
  const {
    incomeViewInputState,
    updateIncomeViewInputState,
    setIncomeViewInputState,
  } = useIncomeViewInputState();

  useEffect(() => {
    if (!obj == null || obj.length > 0) {
      var IncomeObj: any[] = [];
      DetailsData?.forEach((Element: DetailsBody) => {
        if (Element?.StageCode != null && Element?.StageCode === "06") {
          var obj;
          var modifiedObj = Element;

          if (Element?.InvestigationData === "Non Disclosure") {
            if (Element.Remarks === "" || Element.Remarks === null) {
              modifiedObj.InvestigatorFindings = 0;
            } else {
              modifiedObj.InvestigatorFindings = Element.Remarks;
            }
          } else {
            obj = JSON.parse(Element?.InvestigationData);
            if (Element.Remarks === "" || Element.Remarks === null) {
              modifiedObj.InvestigatorFindings = obj[0]?.Amount;
            } else {
              modifiedObj.InvestigatorFindings = parseFloat(Element.Remarks);
            }
          }

          IncomeObj.push(modifiedObj);
        }
      });

      setIncomeViewInputState([...IncomeObj]);
    } else {
      setIncomeViewInputState([
        {
          InvestigatorFindings: "",
          LoanInvestigationId: 0,
          Informers: "",
          IsCorrect: "",
          InformerDesignation: "",
          InformerMobileNumber: "",
          InformerAccountNumber: "",
          InvestigationData: "",
          LoanApprovalId: "",
          LoanInvestigationDetailsId: "",
        },
      ]);
    }
  }, [setIncomeViewInputState, DetailsData]);
  // Income Data End Here

  // Loan Data Start Here
  const {
    loanViewInputState,
    updateLoanViewInputState,
    setLoanViewInputState,
  } = useLoanViewInputState();

  useEffect(() => {
    if (!obj == null || obj.length > 0) {
      var LoanObj: any[] = [];
      DetailsData?.forEach((Element: DetailsBody) => {
        if (Element?.StageCode != null && Element?.StageCode === "08") {
          var obj;
          var modifiedObj = Element;

          if (Element?.InvestigationData === "Non Disclosure") {
            if (Element.Remarks === "" || Element.Remarks === null) {
              modifiedObj.InvestigatorFindings = 0;
            } else {
              modifiedObj.InvestigatorFindings = Element.Remarks;
            }
          } else {
            obj = JSON.parse(Element?.InvestigationData);
            if (Element.Remarks === "" || Element.Remarks === null) {
              modifiedObj.InvestigatorFindings = obj[0]?.LoanAmount;
            } else {
              modifiedObj.InvestigatorFindings = parseFloat(Element.Remarks);
            }
          }

          LoanObj.push(modifiedObj);
        }
      });
      // LoanAmount
      setLoanViewInputState([...LoanObj]);
    } else {
      setLoanViewInputState([
        {
          InvestigatorFindings: "",
          LoanInvestigationId: 0,
          Informers: "",
          IsCorrect: "",
          InformerDesignation: "",
          InformerMobileNumber: "",
          InformerAccountNumber: "",
          InvestigationData: "",
          LoanApprovalId: "",
          LoanInvestigationDetailsId: "",
        },
      ]);
    }
  }, [setLoanViewInputState, DetailsData]);
  // Loan Data End Here

  // Income Data Start Here
  const {
    finalUpdateInputState,
    updateFinalViewInputState,
    setFinalUpdateInputStateInputState,
  } = useFinalUpdateInputState();

  useEffect(() => {
    if (!obj == null || obj.length > 0) {
      var FinalTabObj: any;
      DetailsData?.forEach((Element: DetailsBody) => {
        if (Element?.StageCode != null && Element?.StageCode === "09") {
          console.log(Element);

          var obj;
          FinalTabObj = Element;

          console.log(FinalTabObj);
        }
      });

      setFinalUpdateInputStateInputState(FinalTabObj);
    } else {
      setFinalUpdateInputStateInputState([
        {
          InvestigatorFindings: "",
          LoanInvestigationId: 0,
          Informers: "",
          IsCorrect: "",
          InformerDesignation: "",
          InformerMobileNumber: "",
          InformerAccountNumber: "",
          InvestigationData: "",
          LoanApprovalId: "",
          LoanInvestigationDetailsId: "",
        },
      ]);
    }
  }, [setFinalUpdateInputStateInputState, DetailsData]);

  // Storing Central Informer List

  useEffect(() => {
    storeInformerData([
      ...addressViewInputState,
      ...documentViewInputState,
      ...expenseViewInputState,
      ...incomeViewInputState,
      ...loanViewInputState,
    ]);
  }, [
    addressViewInputState,
    documentViewInputState,
    expenseViewInputState,
    incomeViewInputState,
    loanViewInputState,
  ]);

  // Final Submission here

  const {
    loading: updateDataLoading,
    headers: updateHeaders,
    data: updateData,
    setData: setupdateData,
    message: updateDataMessage,
    status: updateDataStatus,
    setStatus: setupdateDataStatus,
    executeCommand: updateDataExecuteCommand,
  } = useCommand<any>();

  const SubmitHandler = (finalObj: any) => {
    console.log({
      ...finalObj,
      LocationLongitude: location?.Longitude,
      LocationLatitude: location?.Latitude,
    });
    if (locationError) {
      clearAuthUserData();
      return;
    }

    console.log(location, locationError);

    updateDataExecuteCommand(
      process.env.REACT_APP_BASE_URL +
        "/Loans_V1/UpdateLoanInvestigationDetails",
      JSON.stringify({
        ...finalObj,
        LocationLongitude: location?.Longitude,
        LocationLatitude: location?.Latitude,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
  };
  console.log(updateDataStatus, updateDataMessage);

  useEffect(() => {
    if (updateDataStatus === "success") {
      notify(updateDataStatus);
      setupdateDataStatus(null);
    }
  }, [updateDataStatus]);

  useEffect(() => {
    getLocation();
  }, [SubmitHandler]);
  return (
    <div className="w-full flex-col gap-4 bg-[#3d4244]">
      <LoaderDialogue isLoading={updateDataLoading}></LoaderDialogue>

      {/* Start login failed request dialogue */}
      <FailedDialogue
        dialogueSize={Size.Small}
        isDialogueOpen={updateDataStatus === "failed" ? true : false}
        cancelButtonText="ok"
        onCloseButtonClick={() => {
          setupdateDataStatus(null);
        }}
      >
        {updateDataMessage}
      </FailedDialogue>

      <LoanInvestigationMenu
        onClicks={(event: any) => {
          setTab(event);
          ResetHandler();
        }}
        ResetTab={ResetTab}
      ></LoanInvestigationMenu>

      <div
        className="flex flex-col gap-4 p-2 overflow-auto "
        style={{
          height: window.innerHeight - 122,
        }}
      >
        {Tab === "address" ? (
          <AddressTab
            SubmitHandler={(finalObj: any) => {
              SubmitHandler(finalObj);
            }}
            UpdateHandler={(
              name: string,
              value: boolean | string | number,
              index: number
            ) => {
              updateAddressViewInputState(name, value, index);
            }}
            addressViewData={addressViewInputState}
          ></AddressTab>
        ) : (
          ""
        )}
        {Tab === "document" ? (
          <DocumentTab
            SubmitHandler={(finalObj: any) => {
              SubmitHandler(finalObj);
            }}
            UpdateHandler={(
              name: string,
              value: boolean | string | number,
              index: number
            ) => {
              updateDocumentViewInputState(name, value, index);
            }}
            documentViewData={documentViewInputState}
          ></DocumentTab>
        ) : (
          ""
        )}
        {Tab === "income" ? (
          <IncomeTab
            SubmitHandler={(finalObj: any) => {
              SubmitHandler(finalObj);
            }}
            ViewData={incomeViewInputState}
            UpdateHandler={(
              name: string,
              value: boolean | string | number,
              index: number
            ) => {
              updateIncomeViewInputState(name, value, index);
            }}
          ></IncomeTab>
        ) : (
          ""
        )}
        {Tab === "Expense" ? (
          <ExpenseTab
            SubmitHandler={(finalObj: any) => {
              SubmitHandler(finalObj);
            }}
            ViewData={expenseViewInputState}
            UpdateHandler={(
              name: string,
              value: boolean | string | number,
              index: number
            ) => {
              updateExpenseViewInputState(name, value, index);
            }}
          ></ExpenseTab>
        ) : (
          ""
        )}
        {Tab === "Existing Loans" ? (
          <LoanTab
            SubmitHandler={(finalObj: any) => {
              SubmitHandler(finalObj);
            }}
            ViewData={loanViewInputState}
            UpdateHandler={(
              name: string,
              value: boolean | string | number,
              index: number
            ) => {
              updateLoanViewInputState(name, value, index);
            }}
          ></LoanTab>
        ) : (
          ""
        )}
        {Tab === "Final" ? (
          <FinalTab
            updateHandler={(name: string, value: string | number) => {
              updateFinalViewInputState(name, value);
            }}
            incomeData={incomeViewInputState}
            ExpenseData={expenseViewInputState}
            LoanAmount={LoanAmount}
            FinalTabData={finalUpdateInputState}
            SubmitHandler={(finalObj: any) => {
              SubmitHandler(finalObj);
            }}
          ></FinalTab>
        ) : (
          ""
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default InvestigationBody;
