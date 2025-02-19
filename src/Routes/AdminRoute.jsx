import { Route, Routes } from "react-router-dom"
import AdminPrivateRoute from "./PrivateRoutes/AdminPrivateRoute"
import AdminHome from "../AdminSide/AdminHome/AdminHome"
import AdminAddapp from "../AdminSide/AdminAddApp/AdminAddapp"
import UsersAdminPage from "../AdminSide/AdminUsers/AdminUsers"
import UpdatePoints from "../AdminSide/UpdatePoints/UpdatePoints"




const AdminRoute = () =>{
    return(
        <Routes>
            <Route element={<AdminPrivateRoute/>}>
            <Route path="/Home" element={<AdminHome />} />
            <Route path="/add-app" element={< AdminAddapp />} />
            <Route path="/users" element={< UsersAdminPage />} />
            <Route path="/update-points/:appId" element={< UpdatePoints />} />



            </Route>
        </Routes>
    )
}


export default AdminRoute