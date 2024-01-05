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
interface MenuProps {
  title?: string;
  navBarClassName?: string;
  children?: JSX.Element | JSX.Element[];
  onBack?: () => void;
}

export function Menu({ title, navBarClassName, children, onBack }: MenuProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const user = localStorage.getItem("user");

  const userInfo = JSON.parse(`${user}`) ?? false;
  return (
    <Navbar
      className={`relative  bg-main ${navBarClassName}`}
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
        <NavbarItem>
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
                <div>
                  <Chip color="success">Subscribed</Chip>
                  <p className="text-base">You have 7 days free</p>
                </div>
              </CardHeader>
              <Divider />
            </Card>
          )}
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
}
