import React, { useContext, useEffect, useState } from "react";
import MyTextInput from "./MyTextInput";
import MySearchInput from "./MySearchInput";
import MyButton from "./MyButton";
import MyDialogueView from "./dialogues/MyDialogueView";
import MyModal from "./MyModal";
import { motion } from "framer-motion";
import { Size } from "../global/enum/Size";
import useCommand from "./hooks/useCommand";
import { SearchBeneficiaryRequestModel } from "./SearchBeneficiaryRequestModel";
import AuthUserContext, {
  AuthUserContextType,
} from "./contexts/AuthUserContext";
import { getFormattedAccountNumber } from "./utils/textUtils";
import useSearchAccountState from "./hooks/useSearchAccountState";
import LoaderDialogue from "./dialogues/LoaderDialogue";
import FailedDialogue from "./dialogues/FailedDialogue";
import { lstat } from "fs";
import InformerListContext, {
  InformerContextType,
} from "./contexts/InformerListContext";

interface informerProps {
  firstRow: boolean;
  isExpand: boolean;
  checkBoxTitle?: string;
  buttonTitle?: string;
  onChangeHandler?: any;
  data?: any;
  allData?: any;
  key: any;
}

const Informer: React.FC<informerProps> = ({
  firstRow,
  checkBoxTitle,
  buttonTitle,
  isExpand,
  onChangeHandler,
  data,
  allData,
  key,
}) => {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const { informerList } = useContext(
    InformerListContext
  ) as InformerContextType;

  const {
    updateSearchTextRequestState,
    searchAccountState,
    clearSearchAccountState,
  } = useSearchAccountState();

  const [isChecked, setIsChecked] = useState(false);
  const [isEnableName, setisEnableName] = useState(false);
  const [isViewInformerList, setInformerList] = useState(false);
  const [informerInfo, setInformerInfo] = useState<any[]>([]);

  function isNameExists(newName: string, array: any) {
    return array.forEach((element: any) => {
      if (newName === element?.name) {
        return true;
      } else return false;
    }); // or array.indexOf(newName) !== -1
  }

  const addItemToState = (item: any) => {
    // Check if an object with the same 'name' property already exists in the state
    if (
      informerInfo.some((existingItem: any) => {
        return existingItem.name === item.name;
      })
    ) {
      // If it doesn't exist, add the item to the state
      setInformerInfo((prevInformerInfo: any) => [...prevInformerInfo, item]);
    }
  };

  function isExistFun(filterList: any, item: any) {
    var isExist: boolean = false;
    filterList?.forEach((filteritem: any) => {
      if (
        item?.Informers.trim().toLowerCase() ===
        filteritem?.Informers.trim().toLowerCase()
      ) {
        // list.push(element);
        isExist = true;
      }
    });

    return isExist;
  }

  const informerListProcessing = () => {
    const filterListByName: any = [];
    const list: any = [];
    var isExist: boolean = false;

    informerList.forEach((element: any, index: number) => {
      if (element?.Informers) {
        if (!isExistFun(list, element)) {
          list.push(element);
        }
        // if (isExist) {
        //   // setInformerInfo((prevInformerInfo: any) => [
        //   //   ...prevInformerInfo,
        //   //   element,
        //   // ]);
        // } else {
        //   list.push(element);
        //   isExist = false;
        // }
      }
    });

    setInformerInfo([...list]);
  };

  useEffect(() => {
    if (data && data?.Informers != "") {
      setIsChecked(true);
    }
  }, [data?.Informers, informerList]);

  const informerListHandler = () => {
    if (!isViewInformerList) {
      setInformerList(true);
    } else {
      setInformerList(false);
    }
  };

  const putDataToViewHandler = () => {
    setIsChecked(true);
    informerListProcessing();
    // informerList();
    // setInformerInfo({
    //   accountName: "L-1356",
    //   accountHolderName: "Crystal Cruze",
    //   designation: "SQA",
    //   phone: "016783670118",
    // });
  };

  const {
    loading: searchBeneficiaryResponseDataLoading,
    data: searchBeneficiaryResponseData,
    message: searchBeneficiaryResponseMessage,
    setData: setSearchBeneficiaryResponseData,
    status: searchBeneficiaryResponseStatus,
    setStatus: setSearchBeneficiaryResponseStatus,
    executeCommand: searchBeneficiaryRequestCommand,
  } = useCommand<any | null>();

  const searchBeneficiaryRequestHandler = () => {
    const searchBeneficiaryRequestModel = new SearchBeneficiaryRequestModel(
      authUser
    );
    searchBeneficiaryRequestModel.SearchText = getFormattedAccountNumber(
      searchAccountState?.InformerAccountNumber
    );

    searchBeneficiaryRequestCommand(
      process.env.REACT_APP_BASE_URL + "/deposits_V1/getCollectionAccount",
      JSON.stringify(searchBeneficiaryRequestModel),
      {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      }
    );
  };

  if (searchBeneficiaryResponseStatus === "success") {
    onChangeHandler(
      "Informers",
      searchBeneficiaryResponseData?.AccountHolderInfo[0]?.FullName
    );
    onChangeHandler(
      "Informers",
      searchBeneficiaryResponseData?.AccountHolderInfo[0]?.FullName
    );
    setisEnableName(true);

    setSearchBeneficiaryResponseStatus(null);
  }

  const handlePhoneNumber = (value: String) => {
    // const digits = value.replace(/\D/g, "").slice(0, 11);
    // console.log(digits);
    // var res = "";
    // // if (digits.length >= 0) {
    // //   res = `${digits.slice(0, 1)}`;
    // // }
    // if (digits.length > 0) {
    //   res = digits.slice(0, 1);
    //   console.log(res);
    // }
    // if (digits.length >= 2) {
    //   res += `()88${digits.slice(1, 11)}`;
    //   console.log(res);
    // }
    // onChangeHandler("InformerMobileNumber", res);
  };

  return (
    <>
      <LoaderDialogue isLoading={searchBeneficiaryResponseDataLoading} />

      <FailedDialogue
        dialogueSize={Size.Small}
        isDialogueOpen={
          searchBeneficiaryResponseStatus === "failed" ? true : false
        }
        cancelButtonText="Ok"
        onCloseButtonClick={() => {
          setSearchBeneficiaryResponseStatus(null);
        }}
      >
        {searchBeneficiaryResponseMessage}
      </FailedDialogue>

      <div className="flex flex-col border-2  gap-2 p-2 shadow-sm shadow-surface  border-primaryVariant  rounded h-auto w-full">
        <div className="flex items-center flex-col   md:flex-col lg:flex-row gap-2 justify-evenly">
          <div className="flex  items-center  ">
            <input
              id={key}
              type="checkbox"
              value=""
              checked={isChecked}
              onChange={(event) => {
                setIsChecked(event.target.checked);
              }}
              className="accent-primaryVariant cursor-pointer w-4 h-4 text-primary bg-primaryVariant border-gray-300 focus:ring-primaryVariant dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor={key}
              className="ml-2 text-sm  font-bold  dark:text-gray-300"
            >
              <span> {firstRow ? "Informer" : checkBoxTitle}</span>
            </label>
          </div>

          {!firstRow ? <div>or</div> : ""}
          {!firstRow ? (
            <MyButton
              type="submit"
              label="Same Informer"
              styleClass="w-auto rounded bg-primary px-7 py-3 text-sm font-medium uppercase text-onPrimary hover:bg-primaryVariant shadow-md transition duration-150 hover:scale-105 active:shadow-lg"
              onClick={(event) => {
                putDataToViewHandler();
                informerListHandler();
              }}
              name={""}
            />
          ) : (
            ""
          )}
        </div>

        <div className={`flex flex-col gap-4  ${isChecked ? "" : "hidden "} `}>
          <MySearchInput
            disabled={false}
            name="InformerAccountNumber"
            id="AccountNumber"
            value={data?.InformerAccountNumber}
            onChange={(event) => {
              updateSearchTextRequestState(
                event.target.name,
                event.target.value
              );
              onChangeHandler(event.target.name, event.target.value);
            }}
            onSubmit={() => {
              searchBeneficiaryRequestHandler();
            }}
            // error={searchAccountState?.Errors?.AccountNumber}
            label="Account Number"
            leftIcon={<i className="fa-solid fa-magnifying-glass"></i>}
          />
          <MyTextInput
            label="Name"
            value={data?.Informers}
            name="Informers"
            id="name"
            disabled={isEnableName}
            required={false}
            leftIcon={<i className="fa-solid fa-user"></i>}
            error={""}
            inputType="text"
            onChangeHandler={(event) => {
              onChangeHandler(event.target.name, event.target.value);
            }}
          ></MyTextInput>
          <MyTextInput
            label="Designation"
            value={data?.InformerDesignation}
            name="InformerDesignation"
            id="Designation"
            required={false}
            leftIcon={<i className="fa-solid fa-briefcase"></i>}
            error={""}
            inputType="text"
            onChangeHandler={(event) => {
              onChangeHandler(event.target.name, event.target.value);
            }}
          ></MyTextInput>

          <MyTextInput
            label="Phone"
            value={data?.InformerMobileNumber}
            name="InformerMobileNumber"
            id="Phone"
            required={false}
            leftIcon={<i className="fa-solid fa-mobile-screen-button"></i>}
            error={data?.error}
            inputType="text"
            onChangeHandler={(event) => {
              if (event.target.value.length > 15) {
                return;
              }
              if (event.target.value.length === 1) {
                if (event.target.value === "+" || event.target.value === "0") {
                  onChangeHandler(event.target.name, "+880-");
                } else {
                  onChangeHandler(
                    event.target.name,
                    "+880-" + event.target.value
                  );
                }
              } else {
                onChangeHandler(event.target.name, event.target.value);
              }

              // onChangeHandler(event.target.name, event.target.value);
              // handlePhoneNumber(event.target.value);
            }}
          ></MyTextInput>
        </div>
      </div>

      <MyModal
        size={Size.Medium}
        show={isViewInformerList}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      >
        <MyDialogueView
          dialogueHeader={
            <div className="flex w-full gap-3 flex-col items-center py-6">
              {/* <img src={image} alt="" className="h-32 rounded" /> */}
              <motion.h2 className="text-center text-3xl font-extrabold uppercase">
                {/* {title} */}
                Informer List
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
                  // imageViewerHandler();
                  informerListHandler();
                }}
              />
            </div>
          }
          onCancel={() => {
            informerListHandler();
            // imageViewerHandler();
          }}
        >
          {/* <div className="w-full h-full flex justify-center">{children}</div> */}
          <div
            className="scrollbar-thin scrollbar-track-gray-300 scrollbar-thumb-gray-200 w-full overflow-hidden overflow-y-scroll rounded-lg px-8  py-6  md:mt-2 md:px-14"
            style={{ maxHeight: window.innerHeight - 400 }}
          >
            {/* {children} */}
            <div className="flex flex-col sm:flex  gap-3">
              {informerInfo && informerInfo.length !== 0 ? (
                <>
                  {informerInfo?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex gap-4 w-full  justify-between bg-surface rounded p-3"
                    >
                      <div className="self-center flex gap-4">
                        <div className=" ">
                          {" "}
                          <div className="flex  gap-2 items-center">
                            <i className="fa-regular fa-user"></i>
                            <div className="self-center">
                              {item?.Informers ? item?.Informers : "anonymous"}
                            </div>
                          </div>
                          <div className="flex  gap-2 items-center">
                            <i className="fa-solid fa-mobile-screen"></i>
                            <div className="self-center">
                              {item?.InformerMobileNumber
                                ? item?.InformerMobileNumber
                                : "anonymous"}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex  gap-2 items-center">
                            <i className="fa-regular fa-id-card"></i>
                            <div className="self-center">
                              {item?.InformerAccountNumber
                                ? item?.InformerAccountNumber
                                : "anonymous"}
                            </div>
                          </div>

                          <div className="flex  gap-2 items-center">
                            <i className="fa-solid fa-briefcase"></i>
                            <div className="self-center">
                              {item?.InformerDesignation
                                ? item?.InformerDesignation
                                : "anonymous"}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center w-auto   lg:flex-row">
                        <MyButton
                          type="submit"
                          disabled={false}
                          label="select"
                          name=""
                          styleClass="w-full   rounded bg-primary px-7 py-3 text-sm font-medium uppercase text-onPrimary hover:bg-primaryVariant shadow-md transition duration-150 hover:scale-105 active:shadow-lg"
                          onClick={() => {
                            // setOpenPhoneVerificationView(true);
                            // imageViewerHandler();
                            onChangeHandler(
                              "InformerAccountNumber",
                              item?.InformerAccountNumber
                            );
                            onChangeHandler("Informers", item?.Informers);
                            onChangeHandler(
                              "InformerMobileNumber",
                              item?.InformerMobileNumber
                            );
                            onChangeHandler(
                              "InformerDesignation",
                              item?.InformerDesignation
                            );
                            informerListHandler();
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="self-center text-2xl">
                  No informer added yet!
                </div>
              )}
            </div>
          </div>
        </MyDialogueView>
      </MyModal>
    </>
  );
};

export default Informer;
