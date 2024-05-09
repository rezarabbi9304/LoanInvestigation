import { useState } from "react";
import { validateFinalInputRequestState } from "../validation/validateFinalInputRequestState";

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

function useFinalUpdateInputState() {
  const [finalUpdateInputState, setFinalUpdateInputStateInputState] =
    useState<any>({});

  const updateFinalViewInputState = (fieldName: string, fieldValue: any) => {
    setFinalUpdateInputStateInputState((prevState: any) => {
      return {
        ...prevState,
        [fieldName]: fieldValue,
        Errors: validateFinalInputRequestState(fieldName, fieldValue),
      };
    });
  };

  return {
    finalUpdateInputState,
    updateFinalViewInputState,
    setFinalUpdateInputStateInputState,
  };
}

export default useFinalUpdateInputState;
