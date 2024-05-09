import { IAuthUserModel } from '../component/login/model/data/IAuthUserModel';
import { BaseRequestModel } from '../global/BaseRequestModel';

/**========================================================================
 * ?                                ABOUT
 * @author         :  name_on_card
 * @designation    :  Software Developer
 * @email          :  newtonmitro@gmail.com
 * @description    :
 * @createdOn      :  01 July 2023
 * @updatedBy      :  Israfil
 * @updatedOn      :  04 July 2023
 *========================================================================**/
export class SearchBeneficiaryRequestModel extends BaseRequestModel {
  SearchText: string;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.SearchText = '';
  }
}
