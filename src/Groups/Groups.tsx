import React from 'react';
import { performApiRequest } from '../API';
import './Groups.scss';
import {AiFillWechat} from 'react-icons/ai'
import {NavigateFunction} from 'react-router-dom'
interface Group{
    title:string,
    desc:string,
    author:string
    convId:string
}

export class Groups extends React.Component<{navigate:NavigateFunction}, {groups:Group[]}>{
    constructor(props:any){
        super(props)

        this.state = {
            groups: []
        }
    }
    async componentDidMount(){
        let resp = await performApiRequest<Group[]>("/user/getgroups", "GET")
        if(resp.failed)return alert(resp.error)
        console.log(resp.body)

        this.setState({groups: resp.body!})
    }

    render(): React.ReactNode {
        return <div id="groups">
            {
                this.state.groups.map((group, index) => 
                <div key={index}>
                    <p>{group.title}</p>
                    <p>{group.desc}</p>
                    <AiFillWechat onClick={() => {
                        this.props.navigate(`/messages/${group.convId}`)
                    }}/>
                </div>)
            }
        </div>
    }
}