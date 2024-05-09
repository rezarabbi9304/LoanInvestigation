
import { useState } from 'react';
import { validatePhoneVerificationState } from '../../AddressTab/validatePhoneVerificationState';

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

function useDocumentViewInputState() {
  const [documentViewInputState, setDocumentViewInputState] = useState<AddressInputTab[]>([]);

  const updateDocumentViewInputState = (fieldName: string, fieldValue: any,index:number) => 
  {
    documentViewInputState[index]={
          ...documentViewInputState[index],
          [fieldName]:fieldValue,
          error: validatePhoneVerificationState(fieldName, fieldValue),

    };
    setDocumentViewInputState([...documentViewInputState])
   
  };
  const resetAddressViewInputState = () => {
    setDocumentViewInputState([]);
  };
  return {
    documentViewInputState,
    updateDocumentViewInputState,
    resetAddressViewInputState,
    setDocumentViewInputState
  };
}

export default useDocumentViewInputState;
