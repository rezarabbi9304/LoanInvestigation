import { IAuthUserModel } from "../../component/login/model/data/IAuthUserModel";
import { BaseRequestModel } from "../BaseRequestModel";

/**========================================================================
 * ?                                Model
 * @author         :Reza-e-rabbi
 * @designation    :  Software Developer
 * @email          :
 * @description    :
 * @createdOn      :  Nov/22/2023
 * @updatedBy      :
 * @updatedOn      :
 *========================================================================**/
export class GlobalUpDataModel extends BaseRequestModel {
  SearchText: string;
  value: string;
  title: string;
  IsCorrect: boolean;
  AccountNumber: string;
  LoanInvestigationId: number;
  name: string;
  Designation: string;
  Phone: string;
  InvestigatorFindings?: string;
  Informers?: string;
  InformerDesignation?: string;
  InformerMobileNumber?: string;
  InformerAccountNumber?: string;
  InformerIsMember?: string;
  InvestigationData?: string;
  StageCode?: string;
  StageName?: string;
  InvestigatorName?: string;
  Remarks?: string;
  LoanApprovalId?: string;
  LoanInvestigationDetailsId: number;

  constructor(authUser: IAuthUserModel) {
    super(authUser);
    this.SearchText = "";
    this.value = "";
    this.title = "";
    this.IsCorrect = false;
    this.AccountNumber = "";
    this.name = "";
    this.Designation = "";
    this.Phone = "";
    
    this.InvestigatorFindings = "";
    this.LoanInvestigationId = 0;
    this.Informers = "";
    this.InformerDesignation = "";
    this.InformerMobileNumber = "";
    this.InformerAccountNumber = "";
    this.InformerIsMember = "";
    this.InvestigationData = "";
    this.StageCode = "";
    this.StageName = "";
    this.InvestigatorName = "";
    this.Remarks = "";
    this.LoanApprovalId = "";
    this.LoanInvestigationDetailsId = 0;
  }
}
