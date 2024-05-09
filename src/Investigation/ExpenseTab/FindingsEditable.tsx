import React from "react";
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

const FindingsEditable: React.FC<findings> = ({
  amount,
  onChangeFindingsHandler,
}) => {
  return (
    <div className="flex flex-col shadow-md border-2 gap-2 p-2 border-primaryVariant  rounded h-auto w-full">
      <div className="flex  justify-center  ">
        <h1 className="font-bold"> Findings By Investigator </h1>
      </div>

      <div>
        <MyTextInput
          label="Amount"
          value={amount}
          name="InvestigatorFindings"
          id="Amount"
          required={false}
          leftIcon={<i className="fa-solid fa-user"></i>}
          error={""}
          inputType="number"
          onChangeHandler={(event) => {
            onChangeFindingsHandler(
              event.target.name,
              parseInt(event.target.value)
            );
          }}
        ></MyTextInput>
      </div>
    </div>
  );
};

export default FindingsEditable;
