import { isEmpty } from "../../../global/utils/validations";

export const validateFinalInputRequestState = (
  fieldName: string,
  fieldValue: any
) => {
  switch (fieldName) {
    case "Remarks":
      if (isEmpty(fieldValue)) {
        return "Please enter something.";
      }
      return "";

    default:
      return "";
  }
};
