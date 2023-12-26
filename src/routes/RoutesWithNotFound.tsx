import { Route, Routes } from "react-router-dom"

interface Props {
    children:React.JSX.Element[] | React.JSX.Element
}

export const RouteWithNotFound = ({children}:Props) =>{
    return (
       <Routes>
            {children}
            <Route path="*" element={<div>Not found</div>} />
       </Routes>     
    )
}