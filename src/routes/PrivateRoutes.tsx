import { Navigate, Route } from "react-router-dom"
import { RouteWithNotFound } from "./RoutesWithNotFound"
import MenuPage from "../components/MenuPage"
import MainPage from "../components/MainPage"
import FavoritePage from "../components/FavoritePage"
import { WelcomePage } from "../components/WelcomePage"
import { SubscriptionAuth } from "./SubscriptionAuth"
import { UnsubscribedPage } from "../components/UnsubscribedPage"


export const PrivateRoutes = () =>{
    return(
        <RouteWithNotFound>
              <Route path="/unsubscribed" element={<UnsubscribedPage />} />
              <Route index path="/welcome" element={<WelcomePage />} />
              <Route element={<SubscriptionAuth />} >
               <Route  element={<Navigate to={'/menu'}/>} />
              <Route path="/menu" element={<MenuPage/>} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/favorite" element={<FavoritePage />} />
              </Route>
        </RouteWithNotFound>
    )
}