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
  Link,
} from "@nextui-org/react";
import { MdArrowBack } from "react-icons/md";
import { FaHeart, FaUserCircle, FaWind } from "react-icons/fa";

import { getPersistData } from "../../utils/localstore";
import { filterByName } from "../../routes/SubscriptionAuth";
import { useLocation, useNavigate } from "react-router-dom";
interface MenuProps {
  title?: string;
  navBarClassName?: string;
  children?: JSX.Element | JSX.Element[];
  onBack?: () => void;
}

function getPromotionCountdown(promotionDays: number) {
  const maxDays = 7;
  return maxDays - promotionDays;
}

export function Menu({ title, navBarClassName, children, onBack }: MenuProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation()
  const navigate = useNavigate()
  const user = getPersistData("user");
  const userFromSystemeIo = getPersistData("userFromSystemeIo");

  const userInfo = user ?? false;
  const onLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
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
        {location.pathname !== '/main' &&   <Button isIconOnly onClick={()=>navigate('/favorites')} className="bg-white/20 "><FaHeart /></Button> }
       
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
              <CardHeader className="flex gap-3 flex-col">
                <div className="text-5xl">
                  <FaUserCircle />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-md text-center">
                    {" "}
                    hi ,{userInfo.fullName}
                  </h3>
                  <p className="text-small text-default-500">
                    {userInfo.email}
                  </p>
                </div>
                {!userFromSystemeIo && (
                  <div>
                    {userInfo.promotionDays < 8 ? (
                      <>
                        <Chip color="success">Subscribed</Chip>
                        <p className="text-base">
                          {userInfo &&
                            `you've ${getPromotionCountdown(
                              userInfo.promotionDays
                            )} days free`}
                        </p>
                      </>
                    ) : (
                      <>
                        <Chip color="warning">unsubscribed</Chip>
                        <p className="text-base">
                          "your subscription is expired"
                        </p>
                      </>
                    )}
                  </div>
                )}

                {userFromSystemeIo &&
                  userInfo.promotionDays < 8 &&
                  !filterByName(
                    userFromSystemeIo.tags,
                    "Enrolled_to_Membership"
                  ) && (
                    <>
                      <Chip color="success">Subscribed</Chip>
                      <p className="text-base">
                        {userInfo &&
                          `you've ${getPromotionCountdown(
                            userInfo.promotionDays
                          )} days free`}
                      </p>
                    </>
                  )}
                {userFromSystemeIo &&
                  userInfo.promotionDays < 8 &&
                  filterByName(
                    userFromSystemeIo.tags,
                    "Enrolled_to_Membership"
                  ) && (
                    <>
                      <Chip color="success">Subscribed</Chip>
                      <p className="text-base">
                        {userInfo && `Monthly subscription`}
                      </p>
                    </>
                  )}
                {userFromSystemeIo &&
                  userInfo.promotionDays > 7 &&
                  filterByName(
                    userFromSystemeIo.tags,
                    "Enrolled_to_Membership"
                  ) && (
                    <>
                      <Chip color="success">
                        {" "}
                        {userInfo && `Monthly subscription`}
                      </Chip>
                    </>
                  )}
              </CardHeader>
              <Divider />
            </Card>
          )}
          <Button color="danger" onClick={onLogout} className="mt-5">
            Logout
          </Button>
          {!userFromSystemeIo && userInfo.promotionDays < 8 && (
            <Button color="primary" onClick={onLogout} className="mt-5">
              <Link
                className="text-white"
                href="https://www.meditatewithabhi.com/order-app"
              >
                Renew Now!{" "}
                <i className="ml-2">
                  <FaWind />
                </i>
              </Link>
            </Button>
          )}
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
