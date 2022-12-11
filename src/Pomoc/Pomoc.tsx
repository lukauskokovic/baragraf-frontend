import { useState } from 'react';
import { performApiRequest } from '../API';
import { LoginInfo } from '../App';
import './Pomoc.scss';

export const Pomoc = (props: {loginInfo:LoginInfo|null}) => {
    const [text, setText] = useState("") 
    if(props.loginInfo === null){
        alert("Morate biti ulogovani da bi potrazili pomoc")
        return <></>
    }
    return <div id="help">
        <span>Objasnite vas problem?</span>
        <textarea onChange={e => setText(e.target.value)}/>
        <button onClick={async () => {
            if(text.length < 10)
                return alert("Text mora imati makar 10 karatera")
            if(text.length > 300)
                return alert("Text ne moze biti duzi od 300 karatera")

            let resp = await performApiRequest("/user/help", "POST", {text}, props.loginInfo!.accessToken)
            if(resp.failed) return alert("Greska pri slanju poruke")
            alert("Tvoj problem je poslat mozes ga naci u sekciji poruke!")
        }}>Zatrazi pomoc</button>
    </div>
}