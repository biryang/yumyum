import React from 'react';
import styled from 'styled-components';
import {animated,useSpring} from 'react-spring';

const SelectionButton = styled(animated.div)`
            width:100px;
            padding : 5px 10px;
            margin : 5px 10px;
            box-shadow: 0px 2px 5px -2px rgb(51, 50, 50);
            display:flex;
            border-radius:10%;
            flex-direction: column;
            justify-content: center;
            margin-left:10px;
            background-color:#ffc246; 
            text-align:center;
            font-size:${props => (props.size || '1rem')}
        
`;

const Selection = (props) => {

    const SelectAnswer = () =>{
        props.onAnswer(props.answer);
    }
    const [props1,set] = useSpring(() => ({
        transform: `translate3d(0,0%,0)`,
        opacity:0,
        config: { mass: 1, tension: 80, friction: 10 }
    })
    );
    
    return(
        <>
        <SelectionButton
            onMouseMove={() => set({transform: `translate3d(0,8%,0)`})}
            onMouseLeave={() => set({transform: `translate3d(0,0%,0)`})}
            style={
                {
                    transform:props1.transform,
                    opacity:1
                }
        }
            onClick={SelectAnswer}>
                {props.answer}
                </SelectionButton>
        </>
    );
}
export default Selection;