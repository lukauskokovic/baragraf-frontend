import { useState } from 'react';
import { performApiRequest } from '../API';
import { LoginInfo, LoginType } from '../App';
import { FancyInput, processFile } from '../Login/Login';
import './RegisterlCel.scss';

export const RegisterCel = (props: {loginInfo:LoginInfo|null}) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [story, setStory] = useState("")
    const [selfieBase64, setSelfieBase64] = useState("")
    
    if(props.loginInfo === null || props.loginInfo.loginType !== LoginType.Admin){
        alert("Moras biti admin")
        return <></>
    }

    return <div id="register-cel">
        <FancyInput text='Ime' setter={setName}/>
        <FancyInput text='Prezime' setter={setLastName}/>
        <FancyInput text='Username' setter={setUsername}/>
        <FancyInput text='Email' setter={setEmail}/>
        <FancyInput text='Password' type='password' setter={setPassword}/>
        <span>Prica</span>
        <textarea onChange={e => setStory(e.target.value)}/>
        <FancyInput text='Slika' type='file' onChange={e => processFile(setSelfieBase64, e as File)}/>
        <button onClick={async () => {
            let resp = await performApiRequest("/user/registercelebrity", "POST", {
                name,
                lastname,
                story,
                selfie: selfieBase64,
                email,
                password,
                username
            }, props.loginInfo?.accessToken)
            if(resp.failed) return alert(resp.error)

            alert("Licnost uspesno registrovana")
        }}>Registruj</button>
    </div>
}