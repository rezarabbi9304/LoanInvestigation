import { default as moment } from "moment";
import React, { useState } from "react";
import Choice from "../../global/Choice";
import Informer from "../../global/Informer";
import MyButton from "../../global/MyButton";

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
  data: any;
  index: number;
  value: string;
  title: string;
  firstRow: boolean;
  getUserInput: any;
  btnUpdateData: any;
  allData: any;
}

const RowItemActionable: React.FC<rowItemProps> = ({
  value,
  title,
  firstRow,
  index,
  getUserInput,
  btnUpdateData,
  data,
  allData,
}) => {
  const [isVisible, setVisibile] = useState(false);

  const updateDateVisibilityHandler = () => {
    getUserInput("ModifiedAt", Date(), index);
  };

  return (
    <div className="flex  flex-col md:flex-col lg:flex-row gap-5 p-2  shadow-sm border-2  items-center  border-surface bg-[#fafafc]  rounded">
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

      <Choice
        data={data}
        isChecked
        index={"" + index}
        onChangeHandler={(input: boolean) => {
          getUserInput("IsCorrect", input, index);
        }}
      />

      <Informer
        key={index}
        allData={allData}
        data={data}
        firstRow={firstRow}
        checkBoxTitle="New Informer"
        buttonTitle="Same Informer"
        isExpand={firstRow}
        onChangeHandler={(name: string, value: string | number) => {
          getUserInput(name, value, index);
        }}
      />

      <div className="flex flex-col lg:flex-col w-auto ">
        <MyButton
          type="submit"
          label="Update"
          styleClass=" rounded bg-primaryVariant px-7 py-3 text-sm font-medium uppercase text-onPrimary hover:bg-primaryVariant shadow-md transition duration-150 hover:scale-105 active:shadow-lg"
          onClick={() => {
            // putDataToViewHandler();
            btnUpdateData(index);
            updateDateVisibilityHandler();
          }}
          name={""}
        />
      </div>
    </div>
  );
};

export default RowItemActionable;
