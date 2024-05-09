
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

function useIncomeViewInputState() {
  const [incomeViewInputState, setIncomeViewInputState] = useState<AddressInputTab[]>([]);

  const updateIncomeViewInputState = (fieldName: string, fieldValue: any,index:number) => 
  {
    incomeViewInputState[index]={
          ...incomeViewInputState[index],
          [fieldName]:fieldValue,
          error: validatePhoneVerificationState(fieldName, fieldValue),

    };
    setIncomeViewInputState([...incomeViewInputState])
   
  };
  // const resetAddressViewInputState = () => {
  //   setExpenseViewInputState([]);
  // };
  return {
    incomeViewInputState,
    updateIncomeViewInputState,
    setIncomeViewInputState
  };
}

export default useIncomeViewInputState;
