import { FC } from "react"


type ReactComponent = FC<{children:JSX.Element}>

export const CombineComponents = (
    ...components:ReactComponent[]
):ReactComponent =>{
    return components.reduce<ReactComponent>((AccumulatedComponents,CurrentComponents)=>{
        return ({children}) =>{
            return(
            <AccumulatedComponents>
                <CurrentComponents>{children}</CurrentComponents>
            </AccumulatedComponents>
            )
        }
    },
    ({children}) => <>{children}</>
    )
}