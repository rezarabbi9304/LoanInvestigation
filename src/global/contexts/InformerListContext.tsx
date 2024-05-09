import { IAuthUserModel } from "../../component/login/model/data/IAuthUserModel";
import { useSessionStorage } from "../hooks/useStorage";
import { createContext, useState } from "react";

export type InformerContextType = {
  informerList: any;
  storeInformerData: (currentUser: any) => void;
  clearInformerData: () => void;
};

const InformerListContext = createContext<InformerContextType | null>(null);

export const InformerListContextProvider = ({ children }: any) => {
  const [informer, setValue, removeInformer] = useSessionStorage("user", null);
  const [informerList, setInformerList] = useState(informer);

  const storeInformerData = (informerData: any) => {
    setValue(informerData);
    setInformerList(informerData);
  };

  const clearInformerData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rolePermissionIds");
    setInformerList(null);
    removeInformer();
  };

  return (
    <InformerListContext.Provider
      value={{
        informerList,
        storeInformerData,
        clearInformerData,
      }}
    >
      {children}
    </InformerListContext.Provider>
  );
};

export default InformerListContext;
