import React from 'react';
import AccountCircle from './AccountCircle';
import image from '../image/typing-img.jpg';

const Header = ()=>{
    return(
        <div className="header">
            <div className="logo">
                <img className='logoo' src={image}/><span>TypOmeTer</span>
            </div>
        
            <div className="user-icon">
                <AccountCircle />
                {/*user-icon here*/}
            </div>

        </div>
    )
}

export default Header;