import './CreateGroup.scss';
import {NavigateFunction} from 'react-router-dom'
import { FancyInput } from '../Login/Login';
import { performApiRequest } from '../API';
import { LoginInfo, LoginType } from '../App';

export const CreateGroup = (props: {navigation: NavigateFunction, loginInfo:LoginInfo|null}) => {
    if(props.loginInfo?.loginType !== LoginType.Admin && props.loginInfo?.loginType !== LoginType.Pro){
        alert("Moras biti premium ili admin")
        return <></>
    }
    return <div id="creategroup">
        <FancyInput text='Ime grupe'/>
        <FancyInput text='Krakti opis grupe'/>
        <button onClick={async () => {
            let resp = await performApiRequest("/group/create", "POST", {}, props.loginInfo?.accessToken)
            if(resp.failed)return alert(resp.error)
            props.navigation("/groups")
        }}>Napravi</button>
    </div>
}