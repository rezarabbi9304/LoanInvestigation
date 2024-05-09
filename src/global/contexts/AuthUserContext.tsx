import { IAuthUserModel } from "../../component/login/model/data/IAuthUserModel";
import { useSessionStorage } from "../../global/hooks/useStorage";
import { createContext, useState } from "react";

export type AuthUserContextType = {
  authUser: IAuthUserModel;
  storeAuthUserData: (currentUser: IAuthUserModel) => void;
  clearAuthUserData: () => void;
};

const AuthUserContext = createContext<AuthUserContextType | null>(null);

export const AuthUserContextProvider = ({ children }: any) => {
  const [user, setValue, removeUser] = useSessionStorage("user", null);
  const [authUser, setAuthUser] = useState(user);

  const storeAuthUserData = (userData: any) => {
    setValue(userData);
    setAuthUser(userData);
  };

  const clearAuthUserData = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rolePermissionIds");
    setAuthUser(null);
    removeUser();
  };

  return (
    <AuthUserContext.Provider
      value={{
        authUser,
        storeAuthUserData,
        clearAuthUserData,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContext;
