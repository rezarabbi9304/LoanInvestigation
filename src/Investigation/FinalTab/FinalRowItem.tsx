import React from "react";
import MyButton from "../../global/MyButton";
import MyTextarea from "../../global/MyTextarea";
import useFinalUpdateInputState from "./hook/useFinalUpdateInputState";
import moment from "moment";

/**========================================================================
 * ?                                Tab
 * @author         :Reza-e-rabbi
 * @designation    :  Software Developer
 * @email          :
 * @description    :
 * @createdOn      :  Oct/11/2023
 * @updatedBy      :
 * @updatedOn      :
 *========================================================================**/

interface rowItemProps {
  value: string;
  title: string;
  firstRow: boolean;
  data: any;
  getUserInput: any;
  btnUpdateData: any;
}

const FinalRowItem: React.FC<rowItemProps> = ({
  value,
  title,
  data,
  getUserInput,
  btnUpdateData,
}) => {
  return (
    <div className="flex  bg-[#fafafc] flex-col md:flex-col lg:flex-row gap-5 p-2  shadow-sm border-2  items-center  border-surface  rounded">
      <div className="flex  gap-2  w-full ">
        <div className="flex  items-start mt-1">
          <i className="fa-solid fa-hashtag"></i>
        </div>
        <div className="flex flex-col items-start">
          <h5 className="font-bold">{title}:</h5>
          <h5 className="">{value}</h5>
          <div
            className={`  text-[10px] opacity-75 text-primary text-center w-auto ${
              data?.ModifiedAt ? "" : "hidden"
            }`}
          >
            updated at:
            {moment(data?.ModifiedAt).format("MMMM Do YYYY, h:mm:ss a")}
          </div>
        </div>
      </div>

      <MyTextarea
        id="Remarks"
        label="write something"
        value={data?.Remarks}
        error={data?.Errors}
        name="Remarks"
        onChange={(event) => {
          getUserInput(event.target.name, event.target.value);
        }}
      />

      <MyButton
        type="submit"
        label="Update"
        styleClass="w-auto rounded bg-primaryVariant px-7 py-3 text-sm font-medium uppercase text-onPrimary hover:bg-primaryVariant shadow-md transition duration-150 hover:scale-105 active:shadow-lg"
        onClick={() => {
          getUserInput("ModifiedAt", Date());
          btnUpdateData();
        }}
        name={""}
      />
    </div>
  );
};

export default FinalRowItem;
