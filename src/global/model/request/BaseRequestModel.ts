import { IAuthUserModel } from "../../../component/login/model/data/IAuthUserModel";

export class BaseRequestModel {
  UserName: string;
  UID: number;
  ByUserId: number;
  UserId: number;
  PersonId: number;
  EmployeeCode: string;
  MobileNumber: string;
  MobileNo: string;
  RequestFrom: string = "LIR";
  RolePermissionId: string | null = "";

  constructor(authUser: IAuthUserModel) {
    this.ByUserId = authUser ? authUser.UserId : 0;
    this.UserId = authUser ? authUser.UserId : 0;
    this.UID = authUser ? authUser.UserId : 0;
    this.PersonId = !!authUser ? authUser.PersonId : 0;
    this.EmployeeCode = !!authUser ? authUser.EmployeeCode : "";
    this.MobileNumber = !!authUser ? authUser.RegMobile : "";
    this.MobileNo = !!authUser ? authUser.RegMobile : "";
    this.UserName = !!authUser ? authUser.Email : "";
    this.RolePermissionId = authUser ? authUser.RolePermissionIds : "1,2,3";
  }
}
