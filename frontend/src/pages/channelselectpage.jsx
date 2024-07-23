import CardforChannelSelect from '../components/CardforChannelSelect';
import styles from '../css/channelselect.module.css';
import { useState } from 'react';
import Logo from '../assets/flolink_logo.png'
import SettingIcon from '../assets/setting_icon.png'

function ChannelSelectPage() {

    let [family, setFamily] = useState([
        {
            title : '방이름1',
            familySize : 5,
        },
        {
            title : '방이름2',
            familySize : 5,
        },
        {
            title : '방이름3',
            familySize : 5,
        },       
    ])

    return (
        <div className={styles.startforselect}>
            <div className={styles.headerforselect}>
                <h3>OOO님</h3>
                <img src={SettingIcon}/>
            </div>
            <div className={styles.logo}>
                <img src={Logo}/>
            </div>
            <div className={styles.cardContainerforselect}>
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