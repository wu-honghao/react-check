import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router"
import type { RootState } from "../store/store"
import { USERTOKEN } from "../constant"
import { authInitialState, saveUserData } from "../features/auth/authSlice"

function Header(){
    const savedLen = useSelector((state: RootState)=> state.savedJobs.ids.length)
    const userData = useSelector((state: RootState)=> state.auth.userData)

    const navigator = useNavigate()
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(saveUserData(authInitialState.userData))
        localStorage.removeItem(USERTOKEN)
        navigator('/login')
    }

    return <div style={{ display: 'flex' }}>
        <Link to={"/"} style={{ marginRight: "10px" }}>Home</Link>
        <Link to={'/profile'} style={{ marginRight: "10px" }}>Profile</Link>

        {
            userData.email.trim() === '' && <Link to={'/login'} style={{ marginRight: "10px" }}>login</Link>
        }

        <div style={{ marginRight: "10px" }}> Saved Jobs: { savedLen } </div>

        {
            userData.email.trim() !== '' && 
            <div style={{ display: 'flex', alignSelf: 'end' }}>
                <div>{ userData.email }</div>
                <button onClick={logout}>logout</button>
            </div>
        }
    </div>
}

export default Header