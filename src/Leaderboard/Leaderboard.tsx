import React from 'react';
import { performApiRequest } from '../API';
import './Leaderboard.scss';

interface Rating{
    grade:number,
    text:string
}

interface LeaderboardPerson{
    name:string,
    lastname:string,
    username:string,
    email:string,
    ratings:Rating[]
}

export class Leaderboard extends React.Component<any, {people:LeaderboardPerson[]}>{
    constructor(props:any){
        super(props)

        this.state = {
            people: []
        }
    }

    async componentDidMount(){
        let resp = await performApiRequest<LeaderboardPerson[]>("/user/getleaderboard", "GET", undefined)
        if(resp.failed)return alert(resp.error)
        this.setState({people: resp.body!})
    }

    calcAvrage(person: LeaderboardPerson){
        let count = 0
        for(let i = 0; i < person.ratings.length; i++){
            count += person.ratings[i].grade
        }
        let avg = count / person.ratings.length
        return Math.round((isNaN(avg) ? 0 : avg)*100) / 100
    }

    render(){
        return <div id="leaderboard">
            {
                this.state.people.map(person => 
                <div key={person.email}>
                    <span className='leaderboard-name'>{person.name} {person.lastname}</span>
                    <span className='leaderboard-email'>Email: <span>{person.email}</span></span>
                    {
                        person.ratings.length === 0?
                        <span>Nije jos uvek ocenjen</span>:
                        <>
                            <span>Rating: {this.calcAvrage(person)}/5</span>
                            <div><div style={{width: `${this.calcAvrage(person)/0.05}%`}}></div></div>
                            <div>
                                {
                                    person.ratings.map((rating, index) => 
                                    <div key={index}>
                                        <p>{rating.grade}/5</p>
                                        <div><div style={{width: `${rating.grade/5}%`}}></div></div>
                                        <p>{rating.text}</p>
                                    </div>)
                                }
                            </div>
                        </>
                    }
                </div>)
            }
        </div>
    }
}