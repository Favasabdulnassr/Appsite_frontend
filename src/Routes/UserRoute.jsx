import { Route, Routes } from "react-router-dom"
import UserPrivateRoutes from "./PrivateRoutes/UserPrivateRoute"
import UserHome from "../UserSide/UserHome"
import UserTask from "../UserSide/Task/UserTask"
import UserProfile from "../UserSide/Profile/Profile"



const UserRoute  = () => {
    return(
        <Routes>
            <Route element={<UserPrivateRoutes/>}>
            <Route path="/Home" element={< UserHome />} />
            <Route path="/task" element={< UserTask />} />
            <Route path="/profile" element={< UserProfile />} />



            

            </Route>
        </Routes>
    )
}



export default UserRoute