import React, {Component} from 'react';
import Logo from '../resources/Logo.png';

class Header extends Component {
    render() {
        return (
            <> 
            <div className = "header"> 
            <a href="index.html"><img id='logo' src={Logo} alt=""></img></a>
            <div className="login">
                <a href="#">Login</a>
            </div>
        </div>
        <div className="intro">오늘의<br></br> 메뉴를 고민하세요?</div>
            </>
        );
    }
}

export default Header;