import React from "react";
import MySearchInput from "../../global/MySearchInput";
import MyTextInput from "../../global/MyTextInput";

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

interface findings {
  amount?: number;
  onChangeFindingsHandler?: any;
}

const LoanFindingsEditable: React.FC<findings> = ({
  amount,
  onChangeFindingsHandler,
}) => {
  return (
    <div className="flex flex-col shadow-md border-2 gap-2 p-2 border-primaryVariant  rounded h-auto w-full">
      <div className="flex  justify-center  ">
        <h1 className="font-bold"> Findings By Investigator </h1>
      </div>

      <div className="flex flex-col gap-4">
        <MyTextInput
          label="Loan Amount"
          value={amount}
          name="InvestigatorFindings"
          id="Amount"
          required={false}
          leftIcon={<i className="fa-solid fa-user"></i>}
          error={""}
          inputType="number"
          onChangeHandler={(event) => {
            onChangeFindingsHandler(event.target.name, event.target.value);
          }}
        ></MyTextInput>
        {/* <MyTextInput
          label="Current Balance"
          value={"25,000"}
          name="Amount"
          id="Amount"
          required={false}
          leftIcon={<i className="fa-solid fa-user"></i>}
          error={""}
          inputType="text"
          onChangeHandler={() => {}}
        ></MyTextInput>
        <MyTextInput
          label="Monthly Installment"
          value={"4,1760"}
          name="Amount"
          id="Amount"
          required={false}
          leftIcon={<i className="fa-solid fa-user"></i>}
          error={""}
          inputType="text"
          onChangeHandler={() => {}}
        ></MyTextInput> */}
      </div>
    </div>
  );
};

export default LoanFindingsEditable;
