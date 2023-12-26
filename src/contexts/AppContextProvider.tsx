import { AuthProvider } from "./AuthContext"
import { BackgroundProvider } from "./BackgroundContext"
import { CombineComponents } from "./CombineComponents"


const provides = [
    AuthProvider,
    BackgroundProvider
]

export const AppContextProvider = CombineComponents(...provides)