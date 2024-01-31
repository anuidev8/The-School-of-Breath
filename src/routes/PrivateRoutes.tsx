import { Navigate, Route } from "react-router-dom"
import { RouteWithNotFound } from "./RoutesWithNotFound"
import MenuPage from "../components/MenuPage"
import MainPage from "../components/MainPage"
import { WelcomePage } from "../components/WelcomePage"
import { SubscriptionAuth } from "./SubscriptionAuth"
import { UnsubscribedPage } from "../components/UnsubscribedPage"
import FavoritesPage from "../components/pages/FavoritesPage"


export const PrivateRoutes = () =>{
    return(
        <RouteWithNotFound>
              <Route path="/unsubscribed" element={<UnsubscribedPage />} />
              <Route index path="/" element={<WelcomePage />} />
              <Route element={<SubscriptionAuth />} >
               <Route  element={<Navigate to={'/menu'}/>} />
              <Route path="/menu" element={<MenuPage/>} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              </Route>
        </RouteWithNotFound>
    )
}