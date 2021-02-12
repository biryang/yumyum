import React, {} from 'react';
import styled from 'styled-components';
import {animated} from 'react-spring';

const BackgroundButton = styled(animated.div)`
            margin-top:20px;
            box-shadow: 0px 2px 5px -2px rgb(51, 50, 50);
            border-radius: 2%;
            color:black;
            width:100%;
            height:${props => (props.height || '30%')};
            display:flex;
            align-items: center;
            align-content: space-between;
            background-color: white;
            outline: none;
            cursor: pointer;
            transition: 0.2s ease-in;
            :hover{
                box-shadow: 0px 2px 10px -2px rgb(51, 50, 50);
                transform: translateY(4px);
            }
            `;

const ColorLine = styled.div`
            width:3%;
            height:${props => (props.height || '100%')};
            background-color: ${props => (props.color || '#ffc246')}
            `;
            

const Button = (props) => {

    const {title,para,img_src} = props.buttons;

    const AddRandomMenu = () =>{
        props.onAddRandomMenu(props.buttons);
    }
        return (
            <>
            <BackgroundButton  
                className="recommend-button" 
                onClick={AddRandomMenu}>
                    <ColorLine></ColorLine>
                    <div className="text">
                        <div className="title">{title}</div>
                        <div className="para">{para}</div>
                    </div>
                    <div className="img">
                        <img src={`${img_src}`} alt=""></img>
                    </div>
            </BackgroundButton>
            </>
        );
}


export default Button;