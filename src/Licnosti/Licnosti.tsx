import React from 'react';
import { performApiRequest } from '../API';
import './Licnosti.scss';

interface Licnost{
    lastname:string,
    name:string,
    story:string,
    selfie:string,
    userid:string
}

export class Licnosti extends React.Component<{pro:boolean}, {licnosti:Licnost[]}>{
    constructor(props:any){
        super(props)
        this.state = {
            licnosti: []
        }
    }

    async componentDidMount(){
        let resp = await performApiRequest<Licnost[]>("/user/celebs", "GET")
        if(resp.failed)return alert("Greska pri dobijanju licnosti")
        this.setState({licnosti: resp.body!})
    }

    render(){
        return <div id="licnosti">
            {
                this.state.licnosti.map((licnost, index) => 
                <LicnostCard key={index} licnost={licnost} pro={this.props.pro}/>)
            }
        </div>
    }
}

export const LicnostCard = (props: {licnost: Licnost, pro:boolean}) => {
    return <div className='licnost'>
        <span className='licnost-ime'>{props.licnost.name} {props.licnost.lastname}</span>
        <img alt='' className='licnost-image' src={props.licnost.selfie}/>
        <p className='licnost-prica'>{props.licnost.story}</p>
        {
            props.pro &&
            <button>Pitaj za savet</button>
        }
    </div>
}