import React from "react";
import hash from "../../assets/icons/investigation icons/hash.png";

interface rowItemProps {
  value: string;
  title: string;
}

interface PageContainerProps extends rowItemProps {
  children: React.ReactNode;
}

const RowItemView: React.FC<PageContainerProps> = ({
  value,
  title,
  children,
}) => {
  return (
    <div className="flex  border-b border-gray-400 border-solid items-end">
      <div className="w-5 flex items-center  m-3 ">
        {children}
        {/* <h5 className="text-black text-center self-center font-serif">
          {title}:
        </h5> */}
      </div>
      <h5 className="text-black font-bold text-start self-center mx-1 text-xs">
        {value}
      </h5>
    </div>
  );
};

export default RowItemView;
