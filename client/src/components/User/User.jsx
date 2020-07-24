import React from 'react';
import CustomNavbar from '../navbar/navbar';
import './style.css';

function UserProfile(props) {
    return (
        <>
            <CustomNavbar user={props.user} />
            <div className="user-data">
                <div className="img">
                    <img src={props.user.userBackground} className="bkg-img" />
                    <br/>
                    <img src={props.user.userProfile} className="pfl-img" />
                </div>
                <div className="username">{props.user.username}</div>
            </div>
        </>
    );
}

export default UserProfile;