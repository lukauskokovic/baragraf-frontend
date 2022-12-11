import React from 'react';
import { performApiRequest } from '../API';
import { LoginInfo } from '../App';
import { ChatRoom } from '../ChatRoom/ChatRoom';
import './Messages.scss';

interface Message{
    sender:string
    text:string
}

interface Conversation{
    conversationId:string,
    lastMessage:Message
}

export class Messages extends React.Component<{loginInfo:LoginInfo|null}, {roomId?:string, conversations:Conversation[]}>{
    constructor(props:any){
        super(props)
        this.state = {
            conversations: [],
        }
    }

    async componentDidMount(){
        if(this.props.loginInfo === null){
            return alert("Moras biti ulogovan da bi pisao poruke")
        }
        let resp = await performApiRequest<Conversation[]>("/user/messages", "GET", undefined, this.props.loginInfo.accessToken)
        if(resp.failed) return alert(resp.error)
        this.setState({conversations: resp.body!})
        
    }

    render(){
        return <div id="messages">
            <div id="room-list">
                {
                    this.state.conversations.map(conv => 
                    <div key={conv.conversationId}
                        onClick={() => this.setState({roomId: conv.conversationId})} 
                        style={ this.state.roomId !== conv.conversationId ? undefined : {backgroundColor: "orange"}}>
                        <span>{conv.lastMessage.sender}: {conv.lastMessage.text.length > 20? conv.lastMessage.text.substring(0, 20) + "..." : conv.lastMessage.text.length}</span>
                    </div>)
                }
            </div>
            <div id="room">
                {
                    this.state.roomId === undefined?
                    <></>:
                    <ChatRoom roomId={this.state.roomId} loginInfo={this.props.loginInfo}/>
                }
            </div>
        </div>
    }
}