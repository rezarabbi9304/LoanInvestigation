import { useState } from "react";
import { validatePhoneVerificationState } from "../validatePhoneVerificationState";

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

function useAddressViewInputState() {
  const [addressViewInputState, setAddressViewInputState] = useState<
    AddressInputTab[]
  >([]);

  const updateAddressViewInputState = (
    fieldName: string,
    fieldValue: any,
    index: number
  ) => {
    addressViewInputState[index] = {
      ...addressViewInputState[index],
      [fieldName]: fieldValue,
      error: validatePhoneVerificationState(fieldName, fieldValue),

    };
    setAddressViewInputState([...addressViewInputState]);
  };
  const resetAddressViewInputState = () => {
    setAddressViewInputState([]);
  };
  return {
    addressViewInputState,
    updateAddressViewInputState,
    resetAddressViewInputState,
    setAddressViewInputState,
  };
}

export default useAddressViewInputState;
