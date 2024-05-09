import React from "react";

interface choiceProps {
  onChangeHandler: any;
  index: string;
  isChecked?: boolean;
  data?: any;
}

const Choice: React.FC<choiceProps> = ({
  onChangeHandler,
  index,
  isChecked,
  data,
}) => {
  return (
    <div className="flex flex-col w-full gap-3 font-bold">
      Is this information Correct?
      <div className="flex gap-3 lg:flex-col md:flex-row items-start">
        <div className="flex items-center  ">
          <input
            id={`default-radio-1${index}`}
            type="radio"
            value=""
            checked={data?.IsCorrect}
            name={index}
            onChange={() => {
              onChangeHandler(true);
            }}
            className="accent-primaryVariant cursor-pointer w-4 h-4 text-primary bg-primary border-gray-300  focus:ring-primaryVariant dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={`default-radio-1${index}`}
            className="ml-2 text-sm    dark:text-gray-300"
          >
            <span className="font-normal"> Yes</span>
          </label>
        </div>

        <div className="flex items-center">
          <input
            id={`default-radio-2${index}`}
            type="radio"
            name={index}
            value=""
            checked={!data?.IsCorrect}
            onChange={() => {
              onChangeHandler(false);
            }}
            className="cursor-pointer w-4 h-4 accent-primaryVariant text-blue-600 bg-gray-100 border-gray-300 focus:ring-primaryVariant dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={`default-radio-2${index}`}
            className="ml-2 text-sm   dark:text-gray-300"
          >
            <span className="font-normal">No</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Choice;
