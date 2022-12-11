import {Routes, Route, BrowserRouter as Router, Link} from 'react-router-dom';
import { Landing } from './Landing/Landing';
import { Licnosti } from './Licnosti/Licnosti';
import { Pomoc } from './Pomoc/Pomoc';
import './App.scss';
import { useEffect, useState } from 'react';
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineClose} from 'react-icons/ai'
import {FaUserCircle} from 'react-icons/fa'
import { LoginPage } from './Login/Login';
import { Messages } from './Messages/Messages';
import { AcceptDoctors } from './AcceptDoctors/AcceptDoctors';
import { RegisterCel } from './RegisterCel/RegisterCel';
import { ChatRoom } from './ChatRoom/ChatRoom';
import { Leaderboard } from './Leaderboard/Leaderboard';
import { Unanswered } from './Unaswered/Unanswered';
function GetLinks(props:{logout:()=>void, loginInfo:LoginInfo|null, leaveMenu:()=>void}){
    return <>
        <Link to={"/"} onClick={props.leaveMenu}>Početna</Link>
        <Link to={"/licnosti"} onClick={props.leaveMenu}>Iskustva poznatih</Link>
        <Link to={"/pomoc"} onClick={props.leaveMenu}>Pomoć psihologa</Link>
        <Link to={"/leaderboard"} onClick={props.leaveMenu}>Rang lista</Link>
        {
            (props.loginInfo?.loginType === LoginType.Doctor || props.loginInfo?.loginType === LoginType.Admin) &&
            <Link to={"/unanswered"} onClick={props.leaveMenu}>Neodgovoreni zahtevi</Link>
        }
        {
            props.loginInfo !== null?
            // eslint-disable-next-line
            <>
                <Link to={"/messages"} onClick={props.leaveMenu}>Poruke</Link>
                {
                    props.loginInfo.loginType === LoginType.Admin &&
                    <>
                        <Link to={"/accept"} onClick={props.leaveMenu}>Prihvati specijaliste</Link>
                        <Link to={"/registercel"} onClick={props.leaveMenu}>Registruj licnost</Link>
                    </>
                }
                <a onClick={props.logout} href="#">Izloguj se</a>
            </>:
            <Link to={"/login"} onClick={props.leaveMenu}>Uloguj se</Link>
        }
    </>
}

export enum LoginType{
    Admin,
    User,
    Pro,
    Doctor,
    Celebrity
}

export interface LoginInfo{
    loginType:LoginType
    email:string,
    accessToken:string
}



var alertTimeout:any|undefined = undefined
export const App = () => {
    //{email:'test@gmail.com',accessToken:"dadwa",loginType:LoginType.Admin}
    const [loginInfo, setLoginInfo] = useState<LoginInfo|null>(null)
    useEffect(() => {
        window.alert = showMessage
    }, [loginInfo])
    const [hamOpen, setHamOpen] = useState(false)
    const [alertShown, setAlertShown] = useState(false) 
    const [alertText, setAlertText] = useState("")
    const links = GetLinks({
        logout: () => {
            setLoginInfo(null);
            window.location.reload();
        },
        loginInfo,
        leaveMenu: () => setHamOpen(false)
    })

    const loginTypeName = ():string => {
        if(loginInfo === null || loginInfo.loginType === LoginType.User)return ""
        if(loginInfo.loginType === LoginType.Admin) return "(Admin)"
        if(loginInfo.loginType === LoginType.Celebrity) return "(Licnost)"
        if(loginInfo.loginType === LoginType.Doctor) return "(Specijalista)"
        if(loginInfo.loginType === LoginType.Pro) return "(Premium)"
        return ""
    }

    const showMessage = (text:string) => {
        clearTimeout(alertTimeout)
        alertTimeout = setTimeout(() => {
            setAlertShown(false)
        }, 3000)
        setAlertText(text)
        setAlertShown(true)
    }

    return <Router >
        <div id="alert" className={alertShown? "visible" : undefined}>
            <span>{alertText}</span>
        </div>
        <header>
            {
                loginInfo !== null &&
                <div id="logininfo">
                    <FaUserCircle />
                    <span>{loginInfo.email}{loginTypeName()}</span>
                </div>
            }
            {
                links
            }
            <GiHamburgerMenu onClick={() => setHamOpen(true)} size={30} color="red"/>
            <div id="hamburger-menu" className={hamOpen ? "visible" : undefined}>
                <div>
                    <AiOutlineClose onClick={() => setHamOpen(false)} size={30} color="red"/>
                    {
                        links
                    }
                </div>
            </div>
        </header>
        <section>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/licnosti' element={<Licnosti pro={loginInfo?.loginType === LoginType.Pro}/>} />
                <Route path='/pomoc' element={<Pomoc loginInfo={loginInfo}/>} />
                <Route path='/messages' element={<Messages loginInfo={loginInfo}/>} />
                <Route path='/accept' element={<AcceptDoctors loginInfo={loginInfo!} />} />
                <Route path='/leaderboard' element={<Leaderboard />} />
                <Route path="/registercel" element={<RegisterCel loginInfo={loginInfo}/>}/>
                <Route path="/unanswered" element={<Unanswered loginInfo={loginInfo} />}/>
                <Route path='/login' element={<LoginPage login={e => {
                    setLoginInfo(e)
                    alert("Uspesno ulogovan")
                }}/>} />
            </Routes>
        </section>
    </Router>
    
}