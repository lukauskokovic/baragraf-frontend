import React from 'react';
import { ReactNode } from 'react';
import { performApiRequest } from '../API';
import { LoginInfo, LoginType } from '../App';
import './Unanswered.scss';

interface Answer{
    text:string,
    conversationId:string
}

export class Unanswered extends React.Component<{loginInfo: LoginInfo|null}, {list:Answer[]}>{
    constructor(props:any){
        super(props)
        this.state = {
            list: []
        }
    }

    async componentDidMount(){
        if(this.props.loginInfo?.loginType !== LoginType.Doctor && this.props.loginInfo?.loginType !== LoginType.Admin){
            return alert("Moras biti doktro da bi video ovu listu")
        }
        let resp = await performApiRequest<Answer[]>("/user/getunansweredconvos", "GET", undefined, this.props.loginInfo.accessToken)
        if(resp.failed)return alert(resp.error)
        this.setState({list: resp.body!})
    }

    render(): ReactNode {
        return <div id="unanwered">
            {
                this.state.list.map((answer, index) => 
                <div key={index}>
                    <p>{answer.text}</p>
                    <button onClick={() => {
                        
                    }}>Odgovori</button>
                    {
                        this.props.loginInfo?.loginType === LoginType.Admin &&
                        <button onClick={async () => {
                            let resp = await performApiRequest("/user/deleteconvo", "DELETE", {id: answer.conversationId}, this.props.loginInfo?.accessToken)
                            if(resp.failed)return alert(resp.error)
                            alert("Konverzacija obrisana")
                            this.setState({list: this.state.list.filter(x=> x.conversationId !== answer.conversationId)})
                        }}>Obrisi</button>
                    }
                </div>)
            }
        </div>
    }
}