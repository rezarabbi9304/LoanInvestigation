import React, { useEffect, useState } from "react";
import Informer from "../../global/Informer";
import Choice from "../../global/Choice";
import MyButton from "../../global/MyButton";
import MyModal from "../../global/MyModal";
import { Size } from "../../global/enum/Size";
import RowItemActionable from "../AddressTab/RowItemActionable";
import MyDialogueView from "../../component/dialogues/MyDialogueView";
import { motion } from "framer-motion";
import image from "../../assets/images/logo/invlogo.jpg";
import FindingsEditable from "./FindingsEditable";
import MyTextInput from "../../global/MyTextInput";
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
  value?: string;
  title?: string;
  firstRow: boolean;
  children?: React.ReactNode;
  data: any;
  getUserInput: any;
  btnUpdateData: any;
  allData: any;
  index: number;
}

const ExpenseRowItem: React.FC<rowItemProps> = ({
  value,
  title,
  firstRow,
  children,
  data,
  btnUpdateData,
  getUserInput,
  allData,
  index,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setVisible] = useState(false);

  var ExpenseItem;

  if (data?.InvestigationData !== "Non Disclosure") {
    ExpenseItem = JSON.parse(data?.InvestigationData);
  }

  console.log(ExpenseItem);
  console.log(ExpenseItem?.OrgName);

  const nonDiscloseOpenHandler = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    if (data?.Remarks != "" || data?.Remarks != null) {
      setIsOpen(true);
    }
  }, []);

  const updateDateVisibilityHandler = () => {
    getUserInput("ModifiedAt", Date(), index);
  };
  return (
    <>
      <div className="flex shadow-sm bg-[#fafafc] shadow-surface flex-col md:flex-col lg:flex-row gap-3 p-2  border-2 border-surface items-center   rounded">
        {data?.InvestigationData === "Non Disclosure" ? (
          <>
            <div className="flex flex-col shadow-md border-2 gap-2 p-2 border-primary  rounded h-auto w-full">
              <div className="flex justify-center ">
                <input
                  id="default-radio-1"
                  type="checkbox"
                  value=""
                  checked={isOpen}
                  onChange={(event) => {
                    nonDiscloseOpenHandler();
                  }}
                  className="accent-primaryVariant cursor-pointer w-4 h-4 text-primary bg-primaryVariant border-gray-300 focus:ring-primaryVariant dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="default-radio-1"
                  className="ml-2 text-sm  font-bold  dark:text-gray-300"
                >
                  Non-Declared
                  {/* <span> {firstRow ? "Informer" : checkBoxTitle}</span> */}
                </label>
              </div>
              <div
                className={`text-[10px] opacity-75 text-primary text-center w-auto ${
                  data?.ModifiedAt ? "" : "hidden"
                }`}
              >
                updated at:{" "}
                {moment(data?.ModifiedAt).format("MMMM Do YYYY, h:mm:ss a")}
              </div>
            </div>

            {isOpen ? (
              <>
                <div className="flex flex-col shadow-md border-2 gap-2 p-2 border-primaryVariant  rounded h-auto w-full">
                  <div className="flex  justify-center  ">
                    <h1 className="font-bold">
                      {" "}
                      By Investigator Other Expense{" "}
                    </h1>
                  </div>

                  <div className="flex flex-col gap-4">
                    <MyTextInput
                      label="Amount"
                      value={data?.InvestigatorFindings}
                      name="InvestigatorFindings"
                      id="Amount"
                      required={false}
                      leftIcon={<i className="fa-solid fa-user"></i>}
                      error={""}
                      inputType="number"
                      onChangeHandler={(event) => {
                        getUserInput(
                          "InvestigatorFindings",
                          event.target.value,
                          index
                        );
                      }}
                    ></MyTextInput>
                  </div>
                </div>

                <Informer
                  key={index}
                  allData={allData}
                  data={data}
                  firstRow={firstRow}
                  checkBoxTitle="New Informer"
                  buttonTitle="Same Informer"
                  isExpand={false}
                  onChangeHandler={(name: string, value: string | number) => {
                    getUserInput(name, value, index);
                  }}
                ></Informer>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div className="flex flex-col shadow-sm shadow-surface gap-2   w-full border-2 border-primary rounded p-2">
              <div className="flex gap-2">
                <div className="flex  items-start mt-1">
                  <i className="fa-solid fa-hashtag"></i>
                </div>
                <div className="flex flex-col lg:flex-row gap-0 lg:gap-2 items-start">
                  <h5 className="font-bold">Name:</h5>
                  <h5 className="">
                    {ExpenseItem ? ExpenseItem[0]?.ExpenseArea : ""}
                  </h5>
                </div>
              </div>

              {ExpenseItem ? (
                ExpenseItem[0]?.OrgName != "-" ? (
                  <div className="flex gap-2 ">
                    {" "}
                    <div className="flex  items-start mt-1">
                      <i className="fa-solid fa-hashtag"></i>
                    </div>
                    <div className="flex  flex-col lg:flex-row gap-0 lg:gap-2 items-start">
                      <h5 className="font-bold">Organization Name:</h5>
                      <h5 className="">
                        {ExpenseItem ? ExpenseItem[0]?.OrgName : ""}
                      </h5>
                    </div>
                  </div>
                ) : (
                  <></>
                )
              ) : (
                ""
              )}

              <div className="flex gap-2 ">
                {" "}
                <div className="flex  items-start mt-1">
                  <i className="fa-solid fa-hashtag"></i>
                </div>
                <div className="flex flex-col lg:flex-row gap-0 lg:gap-2 items-start">
                  <h5 className="font-bold">Amount:</h5>
                  <h5 className=" font-extrabold text-primaryVariant">
                    {ExpenseItem ? ExpenseItem[0]?.Amount : ""}
                  </h5>
                </div>
              </div>
              <div
                className={`text-[10px] opacity-75 text-primary text-center w-auto ${
                  data?.ModifiedAt ? "" : "hidden"
                }`}
              >
                updated at:{" "}
                {moment(data?.ModifiedAt).format("MMMM Do YYYY, h:mm:ss a")}
              </div>
            </div>

            <FindingsEditable
              amount={data?.InvestigatorFindings}
              onChangeFindingsHandler={(
                name: string,
                value: string | number
              ) => {
                getUserInput(name, value, index);
              }}
            ></FindingsEditable>

            <Informer
              key={index}
              allData={allData}
              data={data}
              firstRow={firstRow}
              checkBoxTitle="New Informer"
              buttonTitle="Same Informer"
              isExpand={false}
              onChangeHandler={(name: string, value: string | number) => {
                getUserInput(name, value, index);
              }}
            ></Informer>
          </>
        )}

        <MyButton
          type="submit"
          label="Update"
          styleClass="w-auto rounded bg-primaryVariant px-7 py-3 text-sm font-medium uppercase text-onPrimary hover:bg-primaryVariant shadow-md transition duration-150 hover:scale-105 active:shadow-lg"
          onClick={(event) => {
            // putDataToViewHandler();
            btnUpdateData(index);
            updateDateVisibilityHandler();
          }}
          name={""}
        />
      </div>
    </>
  );
};

export default ExpenseRowItem;
