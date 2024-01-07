import { Navigate, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import { RegisterPage } from "./RegisterPage";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { Button } from "@nextui-org/react";
import { getUser } from "../adapters/getUserInfo";
import { useQuery } from "@tanstack/react-query";
import { getPersistData, persistData } from "../../utils/localstore";
import { urlApi } from "../../utils/api";
interface ResponseType {
  info: string;
}
export const Auth = () => {
  const navigate = useNavigate();
  const [typeLogin, setTypeLogin] = useState("login");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const token = getPersistData('authorization')

  
  const { data} = useQuery({ queryKey: ['user'], queryFn:async ()=> getUser({token:token?? ''}),enabled:!!token })
 
  

  if (isAuthenticated && data?.success ) {
    return <Navigate replace to={"/menu"} />;
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      if (email && password) {
        const saveUserData = {
          email: email,
          password: password,
        };
        const saveUserInDb = await axios.post(
          `${urlApi}/auth/login`,
          saveUserData
        );
        const getUserFromSystemIo = await axios.get(
          `${urlApi}/contact?email=${email}`
        );
        
        if (saveUserInDb.data.success) {
          if (
            getUserFromSystemIo.data.success &&
            getUserFromSystemIo.data.data.items.length > 0
          ) {
            const userToValidate = getUserFromSystemIo.data.data.items[0] ?? [];
            persistData(
              "userFromSystemeIo",userToValidate);
          }

          toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER,
          });
          persistData("isAuth", "true");
          persistData("authorization", `${saveUserInDb.data.token}`);
          persistData("user", saveUserInDb.data.user);
          setIsAuthenticated(true);
          setIsLoading(false);
          navigate("/menu");
        }
      }
    } catch (error) {
      const t = error as AxiosError;
      const d: ResponseType = t.response?.data as ResponseType;
      setIsLoading(false);
      setIsAuthenticated(false);
      toast.error(d?.info ?? "something is wrong", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const changeType = (type: string) => {
    setTypeLogin(type);
  };

  return (
    <div className="flex justify-center -center flex-col h-screen">
      {typeLogin === "login" ? (
        <LoginPage onLogin={handleLogin} isLoading={isLoading} />
      ) : (
        <RegisterPage />
      )}

      {typeLogin === "login" && (
        <div className="flex justify-center items-center">
          <Button
            className="w-full bg-secondary  max-w-sm mt-4"
            onClick={() => changeType("register")}
          >
            Register
          </Button>
        </div>
      )}
      {typeLogin === "register" && (
        <div className="">
          <Button
            className="w-full bg-main  max-w-sm mt-4"
            onClick={() => changeType("login")}
          >
            Login
          </Button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
