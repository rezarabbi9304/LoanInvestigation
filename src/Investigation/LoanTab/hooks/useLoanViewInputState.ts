import { useState } from "react";
import { validatePhoneVerificationState } from "../../AddressTab/validatePhoneVerificationState";

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

export interface AddressInputTab {
  // InformerAccountNumber: string;
  // InformerName: string;
  // InformerDesignation: string;
  // InformerPhoneNumber: string;
  // isCorrect:boolean
}

function useLoanViewInputState() {
  const [loanViewInputState, setLoanViewInputState] = useState<
    AddressInputTab[]
  >([]);

  const updateLoanViewInputState = (
    fieldName: string,
    fieldValue: any,
    index: number
  ) => {
    loanViewInputState[index] = {
      ...loanViewInputState[index],
      [fieldName]: fieldValue,
      error: validatePhoneVerificationState(fieldName, fieldValue),
    };
    setLoanViewInputState([...loanViewInputState]);
  };
  // const resetAddressViewInputState = () => {
  //   setExpenseViewInputState([]);
  // };
  return {
    loanViewInputState,
    updateLoanViewInputState,
    setLoanViewInputState,
  };
}

export default useLoanViewInputState;
