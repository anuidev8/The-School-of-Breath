import { Menu } from "./Navbar"

interface LayoutProps {
    children:JSX.Element;
    navBarClassName?:string;
    navBarChildren?: JSX.Element | JSX.Element[];
    title?:string;
    onBack?: () => void;

}

export const Layout = ({children,title,navBarClassName,navBarChildren, onBack}:LayoutProps) =>{
    return(
        <div className="h-screen">
            <Menu title={title} navBarClassName={navBarClassName} children={navBarChildren}  onBack={ onBack} />
            {children}
        </div>
    )
}

