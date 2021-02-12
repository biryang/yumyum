import React, {Component} from 'react';
import styled from 'styled-components';
import Selection from './selection';
import foods from '../foods.json';

const BackgroundResult = styled.div `
            margin-top:20px;
            box-shadow: 0px 2px 5px -2px rgb(51, 50, 50);
            border-radius: 2%;
            color:black;
            width:100%;
            height:65%;
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
const ColorLine = styled.div `
            width:3%;
            height:100%;
            background-color: ${props => (
    props.color || '#ffc246'
)}
            `;
const RecGroup = styled.div `
            width:100%;
            display:flex;
            flex-direction: column;
            justify-content: center;
            margin-left:10px;
            font-size:${props => (
    props.size || '1rem'
)}
`;
const SelectionGroup = styled.div `
            width:95%;
            height:130px;
            display:flex;
            flex-direction: column;
            flex-wrap:wrap;
            margin-left:-5px;
            justify-content: center;
`;

class Result extends Component {
    state ={
        answers: [],
        food: foods.food,
        questions:[
          {
            key:1,
            question:'어떤 종류의 음식이 끌리시나요?',
            answers:['양식','일식','중식','한식','분식','세계음식']
          },
          {
            key:2,
            question:'조리는 어떻게 할까요?',
            answers:['면류','찌개/국/찜','구이','볶음','식사류','기타']
          },
          {
            key:3,
            question:'재료는 뭐가 좋을까요?',
            answers:['고기','해산물','밥','채소','밀가루','기타']
          },
          {
            key:4,
            question:'오늘은 어떤 맛을 드시고 싶으세요?',
            answers:['단맛','짠맛','매운맛','새콤달콤','고소함','기타']
          }
        ],
        answerCount : 0 
    };

    
    SelectAnswer = (answer) =>{
        const answers =this.state.answers;
    
        answers.push(answer);
        console.log(answers);
        this.setState({answers});

        this.ChangeQuestion(answers);
    }

    ChangeQuestion=(answers)=>{
        const answerCount =this.state.answerCount;
        const newState = {...this.state,answerCount:answerCount<3 ? answerCount+1 : 3};
        this.setState(newState)
        if(answerCount===3) this.ShowFilteredMenu(answers);
}


    ShowFilteredMenu=(answer)=>{
        let new_button = {};
        let filters=[];

        const foodFiltering = (국가별, 조리법별, 주재료별, 맛별) => {
            filters = [
            (o) => o.국가.includes(국가별),
            (o) => o.조리법.includes(조리법별),
            (o) => o.주재료.includes(주재료별),
            (o) => o.맛.includes(맛별),
        ];

        const allSatisfied = this.state.food.filter((o) => filters.every((fn) => fn(o)));

        if(allSatisfied.length===0){
            const partlySatisfied = this.state.food.filter((o) => filters.some((fn) => fn(o))).filter(
                (o) =>o.국가===국가별&&o.조리법===조리법별
            ); 
            return partlySatisfied;
            }

            return allSatisfied;
    };

        try{
        const selectedFood = foodFiltering(answer[0],answer[1],answer[2],answer[3]);
        let rN = Math.floor(Math.random()*selectedFood.length);
        console.log(selectedFood);
        console.log(`랜덤 숫자 : ${rN}`);
        const foodName = selectedFood[rN].이름;
        const foodImage = selectedFood[rN].이미지링크;
        

        new_button={
            key: 3,
            title:`${foodName}`,
            para: '',
            colorline:'#ff9100',
            type:'rec',
            img_src: `${foodImage}`
        }
        this.props.onShowFilteredMenu(new_button);
        
        const newState = {...this.state,answers:[],answerCount:0};
        this.setState(newState);
        }catch(e){
            new_button={
                key: 3,
                title:`미안해요`,
                para: '추천할만한 음식이 없어요!',
                colorline:'#ff9100',
                type:'rec',
                img_src: ``
            }
            this.props.onShowFilteredMenu(new_button);
            
            const newState = {...this.state,answers:[],answerCount:0};
            this.setState(newState);
        }
        }

    render() {
        const {title, img_src, colorline, type,para} = this.props.buttons;
        const {answers, question, key} = this.state.questions[this.state.answerCount];

        const selections = answers.map((answer,index)=>(
            <Selection key ={index} answer={answer} onAnswer={this.SelectAnswer}></Selection>
        ));

        return (
            <> 
            <BackgroundResult> 
            <ColorLine color={`${colorline}`}></ColorLine>
            <RecGroup size="4vh">
                {
                    type === 'rec'
                        ? (
                            <>
                            <div className="title">{
                                title==='미안해요' ? '미안해요'
                                :
                                `${title} 어떠세요?`}
                            </div>
                            <div className="para">{para}</div>
                            <div className="img_randomRec">
                                <img src={
                                    title==='미안해요' ? 'https://memegenerator.net/img/instances/62259161.jpg'
                                :
                                `${img_src}`} alt=""></img>
                            </div>
                            </>
                        )
                        : (
                            <> 
                            <div className = "title" > {title} {key}</div>
                            <span id="question">{`${question}`}</span>
                                <SelectionGroup>
                                    {selections}
                                </SelectionGroup>
                            </>
                        )
                }
            </RecGroup>
        </BackgroundResult>
    </>
        );
    }
}

export default Result;