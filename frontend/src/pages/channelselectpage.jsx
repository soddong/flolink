import CardforChannelSelect from '../components/CardforChannelSelect';
import '../css/channelselect.css';
import { useState } from 'react';
import Logo from '../assets/flolink_logo.png'

function ChannelSelectPage() {

    let [family, setFamily] = useState([0,1,2,3,4,5,6,7])

    return (
        <div className="start">
            <div className="logo">
            <img src={Logo}/>
            </div>
            <div className="cardContainer">
            {
                family.map(function(a, i){
                    return <CardforChannelSelect key={i} a={a}/>
                })
            }
            </div>
        </div>
    );
}

export default ChannelSelectPage;