import { useRef, useState } from 'react';
import { performApiRequest } from '../API';
import { LoginInfo, LoginType } from '../App';
import './Login.scss';

export const LoginPage = (props: {login:(info:LoginInfo)=>void}) => {
    const [loginType, setLoginType] = useState<"login"|"registeruser"|"registerdoc">("login")
    const [idBase64, setIdBase64] = useState<string|null>(null)
    const [certBase64, setCertBase64] = useState<string|null>(null)
    const [email, setEmail] = useState<string>("")
    const [ime, setIme] = useState<string>("")
    const [prezime, setPrezime] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [username, setUsername] = useState<string>("")

   

    const validateEmail = () => {
        return email.match(
            // eslint-disable-next-line
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    return <div id="login">
        <div id="logintypes">
            <button onClick={() => setLoginType("login")} className={loginType === 'login'? "selected" : undefined}>Login</button>
            <button onClick={() => setLoginType("registeruser")} className={loginType !== 'login'? "selected" : undefined}>Register</button>
        </div>
        <FancyInput text='Email' maxLength={30} onChange={() => {}} setter={setEmail}/>
        {
            loginType === 'registerdoc' &&
            <>
                <FancyInput text='Ime' maxLength={30} onChange={() => {}} setter={setIme}/>
                <FancyInput text='Prezime' maxLength={30} onChange={() => {}} setter={setPrezime}/>
            </>
        }
        {
            loginType !== 'login' &&
            <FancyInput text='Username' maxLength={30} onChange={() => {}} setter={setUsername}/>
        }
        <FancyInput text='Password' maxLength={30} onChange={() => {}} type={"password"} setter={setPassword}/>
        {
            loginType !== 'login' &&
            <FancyInput text='Psiholog' maxLength={30} onChange={(e) => {
                let bool = e as boolean ?? false
                setLoginType(bool? "registerdoc" : "registeruser")
            }} type={"checkbox"}/>
        }
        {
            loginType === 'registerdoc' &&
            <>
                <FancyInput type='file' text='Slika licne karte: ' onChange={e => processFile(setIdBase64, e as File)}/>
                <FancyInput type='file' text='Slika sertifikata karte: ' onChange={e => processFile(setCertBase64, e as File)}/>
            </>
        }
        <button onClick={async () => {

            if(!validateEmail()){
                return alert("Ukucaj email kako treba")
            }
            if(password.length < 3){
                return alert("Ukucaj password kako treba")
            }
            if(loginType === 'registeruser'){
                if(username.length < 3) return alert("Ukucaj username kako treba")
            }

            if(loginType === 'login'){
                let result = await performApiRequest<any>("/user/login", "POST", {
                    email,
                    password
                })
                if(result.failed || result.responseCode !== 200 || !result.body)return alert(result.error)
                let type = LoginType.User
                switch(result.body.type){
                    case "admin":type = LoginType.Admin;break;
                    case "victim":type = LoginType.User;break;
                    case "specialist":type = LoginType.Doctor;break;
                    case "premium":type = LoginType.Pro;break;
                }
                result.body.loginType = type
                props.login(result.body)
            }
            else if(loginType === 'registerdoc'){
                if(ime.length < 3 || prezime.length < 3)
                    return alert("Ukucaj ime ili prezime kako treba")
                if(!idBase64 || !certBase64)
                    return alert("Moras postaviti slike licne karte i sertifikata")
                
                let result = await performApiRequest("/user/registerSpecialist", "POST", {
                    name: ime,
                    lastname: prezime,
                    password,
                    email,
                    idphoto: idBase64,
                    certphoto: certBase64,
                    username
                })
                if(result.failed) alert(result.error)
                else alert("Ubacen si na listu cekanja specijalista, sacekaj da te moderator stranice prihvati")
            }
            else{
                let result = await performApiRequest<LoginInfo>("/user/registerVictim", "POST", {
                    username,
                    password,
                    email
                })
                if(result.failed || result.responseCode !== 200 || !result.body)return alert(result.error)
                result.body.loginType = LoginType.User
                props.login(result.body)
            }
        }}>{loginType === 'login'? "Uloguj se" : "Registruj se"}</button>
    </div>
}


export const FancyInput = (props: {text:string, type?:string, onChange?:(val:string|boolean|File)=>void, maxLength?:number, accpet?:string, setter?:(val:string)=>void}) => {
    return <div className={`fancyinput ${props.type ?? "text"}`}>
        <span>{props.text}</span>
        <input type={props.type ?? "text"} onChange={(e:any) => {
            if(props.type === "checkbox") props.onChange?.(e.target.checked)
            else if(props.type === "file")props.onChange?.(e.target.files[0])
            else {
                props.setter?.(e.target.value)
                props.onChange?.(e.target.value)
            }
        }} maxLength={props.maxLength} accept={props.accpet}/>
    </div>
}

function arrayBufferToBase64( buffer:ArrayBuffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

export const processFile = async (setter:(val:string)=>void, file:File) => {
    let buffer = await file.arrayBuffer()
    let base64 = arrayBufferToBase64(buffer)
    let str = `data:${file.type};base64,${base64}`
    setter(str)
}