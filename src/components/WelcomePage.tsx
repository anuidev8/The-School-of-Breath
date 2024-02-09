import { useNavigate } from "react-router-dom";
import welcomeTitle from "../assets/welcome_title1.gif";
import welcomeFrequency from "../assets/welcome_frequency1.gif";
import "../styles/WelcomePage.css";
import { Button } from "@nextui-org/react";
import { updateSubscriptionStatus } from "./adapters/updatedUserActive";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { getPersistData, persistData } from "../utils/localstore";
export const WelcomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onNavigate = async () => {
    try {
      setIsLoading(true);
      const data = {
        token: getPersistData("authorization") ?? "",
        isStartSubscription: true,
      };
      const activeResponse = await updateSubscriptionStatus(data);
      setIsLoading(false);

      if (activeResponse.success) {
        persistData("user", activeResponse.user);
        navigate("/menu");
      } else {
        toast.error(
          `${activeResponse.info} try again` ?? "something error try again",
          {
            position: toast.POSITION.TOP_CENTER,
          }
        );
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("something is wrong,try again", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  return (
    <main className="pt-32 h-screen overflow-hidden ">
      <figure className="">
        <img src={welcomeTitle} width={"100%"} height={"100%"} />
      </figure>
      <figure className="scale-125">
        <img src={welcomeFrequency} width={"100%"} height={"100%"} />
      </figure>
     
      <Button
        isLoading={isLoading}
        className="mt-12 bg-secondary"
        onClick={onNavigate}
      >
        Start relaxing now
      </Button>
      <ToastContainer />
    </main>
  );
};
