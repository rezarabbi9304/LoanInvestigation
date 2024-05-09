
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



function useExpenseViewInputState() {
  const [expenseViewInputState, setExpenseViewInputState] = useState<any>([]);

  const updateExpenseViewInputState = (fieldName: string, fieldValue: any,index:number) => 
  {
    expenseViewInputState[index]={
          ...expenseViewInputState[index],
          [fieldName]:fieldValue,
          error: validatePhoneVerificationState(fieldName, fieldValue),

    };
    setExpenseViewInputState([...expenseViewInputState])
   
  };
  

  return {
    expenseViewInputState,
    updateExpenseViewInputState,

    setExpenseViewInputState
  };
}

export default useExpenseViewInputState;
