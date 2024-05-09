import { motion } from "framer-motion";
import { default as moment } from "moment";
import React, { useContext, useEffect, useState } from "react";
import MyDialogueView from "../../component/dialogues/MyDialogueView";
import Choice from "../../global/Choice";
import Informer from "../../global/Informer";
import MyButton from "../../global/MyButton";
import MyModal from "../../global/MyModal";
import { Size } from "../../global/enum/Size";
import useCommand from "../../global/hooks/useCommand";
import { BaseRequestModel } from "../../global/BaseRequestModel";
import AuthUserContext, {
  AuthUserContextType,
} from "../../global/contexts/AuthUserContext";
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
  title: string;
  firstRow: boolean;
  children: React.ReactNode;
  index: number;
  data: any;
  getUserInput: any;
  btnUpdateData: any;
  allData: any;
}

const DocRowItem: React.FC<rowItemProps> = ({
  title,
  firstRow,
  children,
  index,
  data,
  btnUpdateData,
  getUserInput,
  allData,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const { storeAuthUserData, authUser } = useContext(
    AuthUserContext
  ) as AuthUserContextType;
  const base = new BaseRequestModel(authUser);

  console.log(JSON.parse(data?.InvestigationData)[0]);

  const fileId = JSON.parse(data?.InvestigationData)[0]?.DRSDocId;

  console.log(fileId);

  const {
    loading: attachmentLoading,
    headers: attachmentHeaders,
    data: attachmentData,
    setData: setAttachmentData,
    message: attachmentMessage,
    status: attachmentStatus,
    setStatus: setAttachmentStatus,
    executeCommand: attachmentExecuteCommand,
  } = useCommand<any>();

  console.log(attachmentStatus, attachmentMessage, attachmentData);

  const imageViewerHandler = () => {
    const requestObj = { ...base, FileId: parseInt(fileId) };
    console.log(requestObj);

    attachmentExecuteCommand(
      process.env.REACT_APP_BASE_URL + "/DocumentManagement_V1/ViewDocument",

      JSON.stringify(requestObj),
      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );

    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };



  const updateDateVisibilityHandler = () => {
    getUserInput("ModifiedAt", Date(), index);
  };

  return (
    <>
      <div className="flex shadow-sm shadow-surface bg-[#fafafc]  flex-col md:flex-col lg:flex-row gap-3 p-2  border-2  items-center  border-surface  rounded">
        <div className="flex  gap-2  w-full ">
          <div className="flex  items-start mt-1">
            <i className="fa-solid fa-hashtag"></i>
          </div>
          <div className="flex flex-col items-start">
            <h5 className="font-bold">{title}</h5>
            <div
              className={`text-[10px] opacity-75 text-primary text-center w-auto ${
                data?.ModifiedAt ? "" : "hidden"
              }`}
            >
              updated at:{" "}
              {moment(data?.ModifiedAt).format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </div>
        </div>

        <div
          className="w-full cursor-pointer"
          onClick={() => {
            imageViewerHandler();
          }}
        >
          {children}
        </div>

        <Choice
          data={data}
          index={"" + index}
          onChangeHandler={(input: boolean) => {
            getUserInput("IsCorrect", input, index);
          }}
        ></Choice>

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
        ></Informer>

        <MyButton
          type="submit"
          label="Update"
          styleClass="w-auto rounded bg-primaryVariant px-7 py-3 text-sm font-medium uppercase text-onPrimary hover:bg-primaryVariant shadow-md transition duration-150 hover:scale-105 active:shadow-lg"
          onClick={() => {
            // putDataToViewHandler();
            btnUpdateData(index);
            updateDateVisibilityHandler();
          }}
          name={""}
        />
      </div>

      <MyModal
        size={Size.Large}
        show={isOpen}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      >
        <MyDialogueView
          dialogueHeader={
            <div className="flex w-full gap-3 flex-col items-center py-6">
              {/* <img src={image} alt="" className="h-32 rounded" /> */}
              <motion.h2 className="text-center text-3xl font-extrabold uppercase">
                {title}
              </motion.h2>
            </div>
          }
          dialogueFooter={
            <div className="flex flex-col items-center justify-center gap-6 px-8 py-4 md:px-14 lg:flex-row">
              <MyButton
                type="submit"
                disabled={false}
                label="close"
                name=""
                styleClass="w-full md:w-1/3  rounded bg-primaryVariant px-7 py-3 text-sm font-medium uppercase text-onPrimary hover:bg-primaryVariant shadow-md transition duration-150 hover:scale-105 active:shadow-lg"
                onClick={() => {
                  // setOpenPhoneVerificationView(true);
                  imageViewerHandler();
                }}
              />
            </div>
          }
          onCancel={() => {
            imageViewerHandler();
          }}
        >
          {/* <div className="w-full h-full flex justify-center">{children}</div> */}
          <div
            className="scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-200 w-full overflow-hidden overflow-y-scroll rounded-lg px-8  py-6  md:mt-2 md:px-14"
            style={{ maxHeight: window.innerHeight - 400 }}
          >
            <img
              className="overflow-hidden rounded-full p-2 md:rounded-md"
              src={`data:image/png;base64,${attachmentData?.FileBase64}`}
              alt="user"
            />
          </div>
        </MyDialogueView>
      </MyModal>
    </>
  );
};

export default DocRowItem;
