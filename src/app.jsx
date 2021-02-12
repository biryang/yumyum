import './app.css';
import React, {Component} from 'react';
import Header from './components/header';
import Content from './components/content';
import styled from 'styled-components';
import Random_food from './resources/random-food.svg';
import Favorite_food from './resources/favorite-food.svg';
import foods from './foods.json';


const Footer = styled.div`
            width:100%;
            height: 4vh;
            text-align:center;
            color:darkgray;
            position:fixed;
            left:0px;
            bottom:0px;
            `;

class App extends Component {
  state = {
    buttons: [
        {
            key: 1,
            title: '랜덤 추천',
            para: '메뉴를 추천받고 소중한 시간을 아껴보아요!',
            colorline:'#ffc246',
            img_src:`${Favorite_food}`
        }, {
          key: 2,
            title: '당신을 위한 추천',
            para: '나도 몰랐던 내 메뉴를 추천 받으세요!',
            colorline:'#ffc246',
            img_src:`${Random_food}`
        }
    ]
};
    AddRandomMenu = button =>{
      const buttons = [...this.state.buttons];
      this.setState({buttons});
      // food 리스트에 따른 랜덤 숫자 출력
      let randomNumber = Math.floor(Math.random()*foods.food.length);

      let new_button = {};
      //버튼이 3개 이하일 때 == 초기 화면일 때
      if(buttons.length<3){
      //랜덤 추천 버튼을 눌렀을 때
      // 초기 화면에서 버튼들을 누르면 그에 따른 결과를 출력함
          if(button.key ===1){
            new_button={
              key: 3,
              title:`${foods.food[randomNumber].이름}`,
              para: '',
              colorline:'#ff9100',
              type:'rec',
              img_src: `${foods.food[randomNumber].이미지링크}`
            }
          }
          // 당신을 위한 추천을 눌렀을 때
          else if(button.key ===2){
            new_button={
              key: 3,
              title:'Question',
              para: '',
              colorline:'crimson',
              type:'question',
              img_src:`${Random_food}`
            }
          }
          // 랜덤 결과나 질문 버튼을 버튼 배열에 3번으로 추가한다
          buttons.push(new_button);
          this.setState({buttons});
        }
        // 랜덤 결과나 질문 버튼이 있을 때
        else if(buttons.length===3){
          // 랜덤 추천 버튼을 눌렀을 때
          if(button.key ===1){
            new_button={
              key: 3,
              title:`${foods.food[randomNumber].이름}`,
              para: '',
              colorline:'#ff9100',
              type:'rec',
              img_src: `${foods.food[randomNumber].이미지링크}`
            }
            buttons[2]= new_button;
            this.setState({buttons});
          }
          else if(button.key ===2){
          // 당신을 위한 추천 버튼을 눌렀을 때
            new_button={
              key: 3,
              title:'Question',
              para: '',
              colorline:'red',
              type:'question',
              img_src:`${Random_food}`
            }
            buttons[2]= new_button;
            this.setState({buttons});

            if(this.state.answerCount===3){
              const newState = {...this.state,answerCount:0};
              this.setState(newState)
            }
          }
        }     
    }
    
    ShowFilteredMenu=(menu)=>{
      const buttons = [...this.state.buttons];
      buttons[2] = menu;
      this.setState({buttons});
    }

    

    render() {
        return (
          <>
        <Header/>
        <Content 
        buttons={this.state.buttons}
        onAddRandomMenu={this.AddRandomMenu}
        onShowFilteredMenu={this.ShowFilteredMenu}
        />
        <Footer>dev stuFEED</Footer>
        </>
  );
  }
}


export default App;