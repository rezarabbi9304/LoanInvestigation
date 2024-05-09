import { useContext, useState } from "react";
import Header from "./component/Header";
import Body from "./component/MainBody";
import LoginView from "./component/login/LoginView";
import MyModal from "./global/components/MyModal";
import { Size } from "./global/enum/Size";
import AuthUserContext, {
  AuthUserContextType,
} from "./global/contexts/AuthUserContext";
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

function App() {
  const { storeAuthUserData, authUser } = useContext(
    AuthUserContext
  ) as AuthUserContextType;

  const [investigationFor, setInvestigationFor] = useState("");

  return (
    <div className="h-screen">
      {authUser != null ? (
        <>
          <Header
            userData={authUser}
            InvestigationFor={investigationFor}
          ></Header>

          <Body
            investigationForHandler={(fullname: string) => {
              setInvestigationFor(fullname);
            }}
          ></Body>
        </>
      ) : (
        <MyModal show={true} onClose={() => {}} size={Size.Small}>
          <LoginView closeLoginWindow={() => {}} />
        </MyModal>
      )}
    </div>
  );
}

export default App;
