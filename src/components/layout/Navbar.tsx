import React from "react";
import {
  Navbar,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  Card,
  CardHeader,
  Divider,
  Chip,
} from "@nextui-org/react";
import { MdArrowBack } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import { getPersistData } from "../../utils/localstore";
import { filterByName } from "../../routes/SubscriptionAuth";
interface MenuProps {
  title?: string;
  navBarClassName?: string;
  children?: JSX.Element | JSX.Element[];
  onBack?: () => void;
}

function getPromotionCountdown(promotionDays:number) {
  const maxDays = 7;
  return maxDays - promotionDays;
}


export function Menu({ title, navBarClassName, children, onBack }: MenuProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  

  const user = getPersistData("user");
  const userFromSystemeIo = getPersistData('userFromSystemeIo')

  const userInfo = user ?? false;
  const onLogout = () =>{
    localStorage.clear()
    window.location.href = '/login' 
  }
  return (
    <Navbar
      className={`relative  bg-main fixed top-0 w-full left-0  ${navBarClassName}`}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden w-full" justify="center">
        {onBack && (
          <NavbarItem>
            <Button
              isIconOnly
              onClick={onBack}
              className="bg-transparent text-2xl"
              aria-label="back"
            >
              <MdArrowBack />
            </Button>
          </NavbarItem>
        )}

        <NavbarItem className="flex-1">
          <h1 className="text-xl font-medium text-center">{title}</h1>
        </NavbarItem>
       {children && children}
        <Button isIconOnly color="primary" aria-label="back">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </Button>
      </NavbarContent>

      <NavbarMenu className="bg-black/40">
        <NavbarItem className="flex flex-col">
          {userInfo && (
            <Card className="max-w-[400px] bg-white/80 mt-4">
              <CardHeader className="flex gap-3">
                <div className="text-5xl">
                  <FaUserCircle />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-md"> hi ,{userInfo.fullName}</h3>
                  <p className="text-small text-default-500">
                    {userInfo.email}
                  </p>
                </div>
                {
                  
                  !userFromSystemeIo &&
                <div>
                  {
                    userInfo.promotionDays < 8 ?
                    <>
                    <Chip color="success">Subscribed</Chip>
                  <p className="text-base">{userInfo &&  `you've ${getPromotionCountdown(userInfo.promotionDays)} days free`}</p>
                    </>
                    :  <>
                    <Chip color="warning">Subscribed</Chip>
                  <p className="text-base">"your subscription is expired"</p>
                    </>
                  }
                  
                </div>
                }

{
                  
                  userFromSystemeIo &&
                <div>
                  {
                    !userFromSystemeIo.unsubscribed && filterByName(userFromSystemeIo.tags,'Enrolled_to_Membership')?
                    <>
                    <Chip color="success">Subscribed per months</Chip>
                    </>
                    :  <>
                    <Chip color="warning">Subscribed</Chip>
                  <p className="text-base">"your subscription is expired"</p>
                    </>
                  }
                  
                </div>
                }
               
              </CardHeader>
              <Divider />
            </Card>
          )}
           <Button color="danger" onClick={onLogout} className="mt-5">Logout</Button>
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
