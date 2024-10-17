import Cookies from "js-cookie"
import FooterF from "../components/Footer"
import { StickyNavbar } from "../components/navbars/StickyNavbar"
import {  Outlet } from 'react-router-dom'

function AppLayout2() {

    // const location = useLocation()
    const toke = Cookies.get('toke')
    toke;
    // console.log(toke)

    return (
        <div>
            <>
                <nav>
                    <StickyNavbar />
                </nav>
                <main>
                    <Outlet />
                </main>
                <FooterF />
            </>
        </div>
    )
}

export default AppLayout2
