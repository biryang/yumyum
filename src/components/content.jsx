import React, {useState} from 'react';
import styled from 'styled-components';
import Button from './button';
import {useSpring, animated} from 'react-spring';
import Result from './result';


const Background = styled(animated.div)`
            width: 550px;
            background-color: white;
            border-radius: 10%;
            box-shadow: 0px 0px 10px rgb(51, 50, 50);
            display: flex;
            justify-content: center;
            align-self:center;
            position: absolute;
            `;

const ContentGroup = styled(animated.div)`
            width:80%;
            height: 90%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            `;



let isClicked =false;

const Content = (props) => {
    const AddRandomMenu = buttons =>{
        props.onAddRandomMenu(buttons);
    }
    const ShowFilteredMenu= menu =>{
        props.onShowFilteredMenu(menu);
    }

    const [isOpen,setOpen] = useState(true);
    const Background_ani = useSpring({
        transform: isOpen
            ? `translate3d(0,0%,0)`
            : `translate3d(0,-22%,0)`,
        height: isOpen
            ? `70vh`
            : `100vh`,
    });
    const ContentGroup_ani = useSpring({
        transform: isOpen
            ? `translate3d(0,0%,0)`
            : `translate3d(0,0%,0)`,
        height: isOpen
            ? `100%`
            : `80%`
    });

    
    return (
        <> 
        <Background style={Background_ani} onClick={() => {
            if(!isClicked){
                setOpen(!isOpen);
                isClicked=true;
            }
            else return;
            }}>
        <ContentGroup style={ContentGroup_ani} onClick={() => {
            if(!isClicked){
                setOpen(!isOpen);
                isClicked=true;
            }
            else return;
            }}>
            {
                props
                    .buttons
                    .map(button => button.key<3 ? (
                        <Button
                            buttons={button}
                            key = {button.key}
                            title={button.title}
                            para={button.para}
                            img_src={button.img_src}
                            onAddRandomMenu={AddRandomMenu}
                            />
                    ):
                    (
                    <Result
                            buttons={button}
                            key = {button.key}
                            title={button.title}
                            img_src={button.img_src}
                            onShowFilteredMenu={ShowFilteredMenu}
                            />
                    )
                    )
            }

        </ContentGroup>
    </Background>
</>
    );

}

export default Content;