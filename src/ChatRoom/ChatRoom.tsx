import React from 'react';
import { SERVER_IP } from '../API';
import { LoginInfo } from '../App';
import './ChatRoom.scss';

interface Message{
    sender:string
    text:string
}

export class ChatRoom extends React.Component<{loginInfo:LoginInfo|null, roomId:string}, {messages:Message[]}>{
    private webSocket?:WebSocket
    private closed = false
    private unauth = false
    private username?:string
    constructor(props:any){
        super(props)

        this.state = {
            messages: []
        }
    }

    componentDidMount(){
        if(this.props.loginInfo === null)
            return alert("Moras biti ulogovan kako bi koristio chat")
        
        this.connect()
    }

    connect(){
        if(this.unauth)return
        console.log(this.props.loginInfo)
        this.webSocket = new WebSocket(`ws://${SERVER_IP}:8080`)
        this.webSocket.onclose = () => {
            if(this.closed)return
            this.connect()
        }
        this.webSocket.onopen = () => {
            this.webSocket?.send(JSON.stringify({
                token: this.props.loginInfo!.accessToken,
                roomId: this.props.roomId,
                type: "authorize"
            }))
        }

        this.webSocket.onmessage = (e : MessageEvent<string>) => {
            try{
                let obj = JSON.parse(e.data)
                console.log(obj)
                if(obj.type === "unauthorized"){
                    this.webSocket?.close()
                    this.unauth = true
                    return alert("Zabranjen pristup")
                }
                else if(obj.type === "messagelist"){
                    this.username = obj.username
                    this.setState({messages:obj.messages})
                }
                else if(obj.type === "typing"){

                }
                else if(obj.type === "message"){
                    this.setState({messages: [...this.state.messages, obj.message]})
                }
            }catch{
                console.log("Error receiving message")
            }
        }
    }

    componentWillUnmount(){
        this.closed = true
        this.webSocket?.close()
    }


    render(): React.ReactNode {
        console.log(this.username)
        return <div className='chatroom'>
            {
                this.state.messages.map((message, index) => 
                <div key={index} className={this.username === message.sender? "my" : "foreign"}>
                    <div>
                        <p>{message.sender}</p>
                        <p>{message.text}</p>
                    </div>
                </div>)
            }
            <input onKeyDown={(e:any) => {
                if(e.key !== "Enter")return;
                let text = e.target.value 
                e.target.value = ""
                this.webSocket?.send(JSON.stringify({type: "send", text}))
            }} onFocus={(e:any) => {
                //console.log(e)
                //this.webSocket?.send(JSON.stringify({type: "typing", value:true}))
            }}/>
        </div>
    }
}