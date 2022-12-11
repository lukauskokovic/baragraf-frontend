import { useEffect, useState } from 'react';
import { performApiRequest } from '../API';
import { LoginInfo, LoginType } from '../App';
import { NotFoundLabel } from '../NotFoundlabel';
import './AcceptDoctors.scss';

interface UnAcceptedDoctor{
    name:string
    lastname:string
    id:string
    idphoto:string
    certphoto:string
}

export const AcceptDoctors = (props: {loginInfo:LoginInfo|null}) => {
    
    const [list, setList] = useState<UnAcceptedDoctor[]>([])
    useEffect(() => {
        if(props.loginInfo === null)return
        performApiRequest<UnAcceptedDoctor[]>("/user/getunregistered", "GET", undefined, props.loginInfo.accessToken).then(res => {
            if(res.failed || !res.body){
                return alert("Greska pri dobijanju doktora")
            }
            setList(res.body)
        })
    }, [])
    if(props.loginInfo === null){
        alert("Moras biti ulogovan")
        return <></>
    }
    if(props.loginInfo.loginType !== LoginType.Admin){
        alert("Moras biti admin da bi pristupio ovoj strani")
        return <></>
    }
    return <div id="unaccepteddoctors">
        {
            list.length === 0?
            <NotFoundLabel text='Trenutno nema zahteva za registraciju...'/>:
            list.map(doctor => 
            <div key={doctor.id}>
                <span>{doctor.name} {doctor.lastname}</span>
                <span>Sertifikat</span>
                <img src={doctor.certphoto} alt=""/>
                <span>Licna karta</span>
                <img src={doctor.idphoto} alt=""/>
                <div>
                    <button onClick={async () => {
                        let resp = await performApiRequest("/user/acceptregistration", "POST", {id: doctor.id}, props.loginInfo!.accessToken)
                        if(resp.failed)return alert("Greska pri prihvatanju specijaliste")
                        setList(list.filter(x => x.id !== doctor.id))
                        alert("Specijalista prihvacen")
                    }}>Prihvati</button>
                    <button onClick={async () => {
                        let resp = await performApiRequest("/user/denyregistration", "DELETE", {id: doctor.id}, props.loginInfo!.accessToken)
                        if(resp.failed)return alert("Greska pri odbijanju specijaliste")
                        setList(list.filter(x => x.id !== doctor.id))
                        alert("Specijalista odbijen")
                    }}>Odbij</button>
                </div>
            </div>)
        }
    </div>
}