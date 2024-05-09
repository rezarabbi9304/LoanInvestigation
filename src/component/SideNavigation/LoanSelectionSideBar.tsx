import React, { useEffect, useState } from "react";
import TabItem from "../Row/TabItem";
import LoanItem from "./LoanItem";
import { LoanListModel } from "../model/loanListModel";

interface loanSelectionBarProps {
  navOpen: any;
  startInvestigateHandler: any;
  applicationList: any;
  passingLoanDetailsParam?: any;
}

const LoanSelectionSideBar: React.FC<loanSelectionBarProps> = ({
  navOpen,
  startInvestigateHandler,
  applicationList,
  passingLoanDetailsParam,
}) => {
  const [isNavOpen, setNavOpen] = useState(true);
  const [loanApplicationData, setLoanData] = useState<LoanListModel[]>([]);
  const navOpenHandler = () => {
    navOpen();
    if (isNavOpen) {
      setNavOpen(false);
    } else {
      setNavOpen(true);
    }
  };

  useEffect(() => {
    if (applicationList) {
      const applicationData = applicationList.map((item: any) => {
        const {
          ApplicationId,
          LoanProductCode,
          LoanProductName,
          AppliedLoanAmount,
          PurposeOfLoan,
          InterestRate,
          TotalInstallment,
          LoanApplicationDate,
          LoanStatus,
          PresentAddress,
          ParmanentAddress,
          LoanNumber,
          ProductTypeId,
          CurrentStageName,
          BranchName,
          FullName,
          PersonId,
          EntryBranchName,
          BranchCode,
          WorkBusinessAddress,
        } = item;

        return {
          ApplicationId: ApplicationId,
          LoanNumber: LoanNumber,
          AppliedLoanAmount: AppliedLoanAmount,
          PurposeOfLoan: PurposeOfLoan,
          InterestRate: InterestRate,
          TotalInstallment: TotalInstallment,
          LoanApplicationDate: LoanApplicationDate,
          LoanStatus: LoanStatus,
          PresentAddress: PresentAddress,
          ParmanentAddress: ParmanentAddress,
          ProductTypeId: ProductTypeId,
          CurrentStageName: CurrentStageName,
          BranchName: BranchName,
          PersonId: PersonId,
          EntryBranchName: EntryBranchName,
          BranchCode: BranchCode,
          LoanProductCode: LoanProductCode,
          LoanProductName: LoanProductName,
          FullName: FullName,
          WorkBusinessAddress: WorkBusinessAddress,
        };
      });

      setLoanData(applicationData);
    }
  }, [applicationList]);

  console.log(loanApplicationData);

  return (
    <>
      <div
        className={` transition-all duration-1000 overflow-auto ${
          isNavOpen ? "w-[300px]" : "w-12"
        }  bg-primary  px-2 `}
        style={{
          height: window.innerHeight - 52,
        }}
      >
        <div className={`space-y-2   flex flex-col`}>
          <div
            className={`text-primaryVariant  ${
              isNavOpen ? "self-end" : "self-center"
            } `}
            onClick={() => {
              navOpenHandler();
            }}
          >
            <i className="fa-solid fa-bars fa-lg"></i>
          </div>
          <div
            className={`transition-all duration-700 space-y-2  overflow-auto${
              isNavOpen ? "" : "none opacity-0 translate-x-full hidden "
            }`}
          >
            {loanApplicationData?.map((item) => (
              <LoanItem
                passingLoanDetailsParam={(
                  loanNUmber: string,
                  FullName: string,
                  applicationid: number,
                  AppliedLoanAmount: number,
                  totalInstallment: number
                ) => {
                  passingLoanDetailsParam(
                    loanNUmber,
                    applicationid,
                    FullName,
                    AppliedLoanAmount,
                    totalInstallment
                  );
                }}
                startInvestigateHandler={() => {
                  startInvestigateHandler();
                }}
                loanItem={item}
              ></LoanItem>
            ))}

            {/* <LoanItem name="Crystal cruze"></LoanItem>
            <LoanItem name="Newton Mitro"></LoanItem> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanSelectionSideBar;
