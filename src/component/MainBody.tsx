import InvestigationBody from "./InvestigationDetails";
import { useContext, useEffect, useState } from "react";
import emptyfile from "../assets/icons/empty_file.png";
import useCommand from "../global/hooks/useCommand";
import { BaseRequestModel } from "../global/model/request/BaseRequestModel";
import { AuthUserModel } from "./login/model/data/AuthUserModel";
import AuthUserContext, {
  AuthUserContextType,
} from "../global/contexts/AuthUserContext";
import { log } from "console";
import LoanSelectionSideBar from "./SideNavigation/LoanSelectionSideBar";
import LoaderDialogue from "../global/dialogues/LoaderDialogue";

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

interface MainBody {
  investigationForHandler: any;
}

const Body: React.FC<MainBody> = ({ investigationForHandler }) => {
  const { storeAuthUserData, authUser } = useContext(
    AuthUserContext
  ) as AuthUserContextType;

  const [loanDetails, setLoanDetailsData] = useState<any[]>([]);
  const [loanAmount, setLoanAmount] = useState({});

  const [isNavOpen, setNavOpen] = useState(true);
  const [isStart, setStart] = useState(false);
  const width = isNavOpen ? 300 : 50;
  const [ResetTab, setReset] = useState("");

  const base = new BaseRequestModel(authUser);

  const startInvestigateHandler = () => {
    if (isStart) {
      setStart(false);
    } else {
      setStart(true);
    }
  };

  const navOpenHandler = () => {
    if (isNavOpen) {
      setNavOpen(false);
    } else {
      setNavOpen(true);
    }
  };

  // get Loan Application List

  const {
    loading: loanApplicationDataLoading,
    headers: loanApplicationHeaders,
    data: loanApplicationData,
    setData: setLoanApplicationData,
    message: loanApplicationMessage,
    status: loanApplicationStatus,
    setStatus: setloanApplicationStatus,
    executeCommand: loanApplicationExecuteCommand,
  } = useCommand<any>();

  console.log(loanApplicationData);

  // get Loan Details List

  const {
    loading: loanDetailsDataLoading,
    headers: loanDetailsHeaders,
    data: loanDetailsData,
    setData: setloanDetailsData,
    message: loanDetailsMessage,
    status: loanDetailsStatus,
    setStatus: setloanDetailsStatus,
    executeCommand: loanDetailsExecuteCommand,
  } = useCommand<any>();

  console.log(loanDetailsData);

  useEffect(() => {
    console.log(JSON.stringify(base));

    loanApplicationExecuteCommand(
      process.env.REACT_APP_BASE_URL + "/Loans_V1/getLoanList",
      JSON.stringify(base),
      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
  }, []);

  const getLoanDetailsHandler = (
    loanNumber: String,
    applicationId: number,
    FullName: string
  ) => {
    investigationForHandler(FullName);

    const obj = {
      ...base,
      LoanNumber: loanNumber,
      ApplicationId: applicationId,
    };

    console.log(obj);
    setReset("address");

    loanDetailsExecuteCommand(
      process.env.REACT_APP_BASE_URL + "/Loans_V1/GetLoanApplicationDetails",
      JSON.stringify(obj),
      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
  };

  useEffect(() => {
    if (loanDetailsData) {
      const applicationData = loanDetailsData.map((item: any) => {
        const {
          ApplicationApprovals,
          Expenses,
          FamilyLoans,
          Incomes,
          ParmanentAddress,
          PersonWorkDetails,
          PurposeOfLoan,
          LoanApplicationDate,
          LoanStatus,
          PresentAddress,
          LoanNumber,
          ProductTypeId,
          CurrentStageName,
          BranchName,
          FullName,
          PersonId,
          EntryBranchName,
          BranchCode,
          WorkBusinessAddress,
          LoanInvestigationDetails,
        } = item;

        return {
          LoanInvestigationDetails: LoanInvestigationDetails,
        };
      });

      setLoanDetailsData(applicationData[0]?.LoanInvestigationDetails);
    }
  }, [loanDetailsData]);

  return (
    <div className="flex">
      <LoanSelectionSideBar
        passingLoanDetailsParam={(
          loanId: string,
          FullName: string,
          applicationId: number,
          AppliedLoanAmount: number,
          totalInstallment: number
        ) => {
          getLoanDetailsHandler(loanId, applicationId, FullName);
          setLoanAmount({
            AppliedAmount: AppliedLoanAmount,
            totalInstallment: totalInstallment,
          });
        }}
        applicationList={loanApplicationData}
        navOpen={() => {
          navOpenHandler();
        }}
        startInvestigateHandler={() => {
          startInvestigateHandler();
        }}
      ></LoanSelectionSideBar>

      <div
        className={`translate-x-${width} transition-all duration-700`}
        style={{
          width: window.innerWidth - width,
        }}
      >
        {/* after login , investigation begins */}

        <LoaderDialogue isLoading={loanDetailsDataLoading}></LoaderDialogue>
        <LoaderDialogue isLoading={loanApplicationDataLoading}></LoaderDialogue>

        {loanDetailsStatus === "success" ? (
          <InvestigationBody
            DetailsData={loanDetails}
            LoanAmount={loanAmount}
            ResetTab={ResetTab}
            ResetHandler={() => {
              setReset("");
            }}
          ></InvestigationBody>
        ) : (
          <div className=" flex  flex-col h-full justify-center items-center">
            <img
              className="h-52  lg:h-[400px] w-auto opacity-50"
              src={emptyfile}
              alt="empty file"
            ></img>
            <div className="opacity-50 text-primary font-bold text-2xl">
              No investigation started yet!
            </div>
          </div>
        )}

        {/* <InvestigationBody></InvestigationBody> */}
        {/* after login , before investigation starts  */}
      </div>
    </div>
  );
};

export default Body;
