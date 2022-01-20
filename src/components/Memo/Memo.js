import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import "./Memo.css"

const Memo = () => {
 
    const [cards, setCards] = useState([
        { id: 0, matched: 0, img: "/assets/logo_js.png", flipped: false, state: ""},
        { id: 1, matched: 0, img: "/assets/logo_js.png", flipped: false, state: ""},
        { id: 2, matched: 1, img: "/assets/logo_html.png", flipped: false, state: ""},
        { id: 3, matched: 1, img: "/assets/logo_html.png", flipped: false, state: ""},        
        { id: 4, matched: 2, img: "/assets/logo_css.png", flipped: false, state: ""},
        { id: 5, matched: 2, img: "/assets/logo_css.png", flipped: false, state: ""},
        { id: 6, matched: 3, img: "/assets/logo_github.png", flipped: false, state: ""},
        { id: 7, matched: 3, img: "/assets/logo_github.png", flipped: false, state: ""},        
        { id: 8, matched: 4, img: "/assets/logo_react.png", flipped: false, state: ""},
        { id: 9, matched: 4, img: "/assets/logo_react.png", flipped: false, state: ""},
        { id: 10, matched: 5, img: "/assets/logo_node.png", flipped: false, state: ""},
        { id: 11, matched: 5, img: "/assets/logo_node.png", flipped: false, state: ""}
    ].sort( () => Math.random() - 0.5 ));        
    
    const [prevClicked, setPrevClicked] = useState(-1);         
    const [rerender, setRerender] = useState(false);
    //const [winCheck, setWinCheck] = useState(false);
 

    const handleClick = (e) => {
        
        let index = cards.findIndex( (element) => element.id == e.currentTarget.id);
       
        if(!cards[index].flipped){

            cards[index].flipped = true;
            setCards([...cards]);            
            setRerender(!rerender); 
            //console.log(cards);

            if(prevClicked === -1){                            
                setPrevClicked(e.currentTarget.id) // guardamos el valor del ID               
            } else {
                check(e.currentTarget.id);
            }
        }      
    }

    const check = (currentClicked) => {  

        const prevIndex = cards.findIndex( (element) => element.id == prevClicked);
        const currentIndex = cards.findIndex( (element) => element.id == currentClicked); 

        //console.log("previous card id: " + prevClicked + " index: " + prevIndex);
        //console.log("current card id: " + currentClicked + " index: " + currentIndex);
                
        if (cards[prevIndex].matched === cards[currentIndex].matched) {            
               
            //console.log("IGUALES");       
            cards[prevIndex].state = "correct";           
            cards[currentIndex].state = "correct";  
         
            setCards([...cards]);  
            setPrevClicked(-1);  
            checkWin();            
            
        } else {                                
            
            setPrevClicked(-1);         

            setTimeout(() => {

                cards[prevIndex].state = "wrong";                 
                cards[currentIndex].state = "wrong";  
                cards[prevIndex].flipped = false;
                cards[currentIndex].flipped = false;    
                setCards([...cards]);    
                setRerender(!rerender);  
                
            }, 1000)
        }      
    }

    const checkWin = () => {

        let aux = 0;

        for(let i = 0; i < cards.length; i++){           
            
            if(cards[i].state === "correct"){
               aux++;
            }
        }

        if(aux === cards.length){
            //console.log("GANASTE!!!");
            //setWinCheck(true);
        }
    }

    const handleRefresh = () => {
        window.location.reload();
    };
    

    useEffect(() => {        
        setRerender(!rerender);
    }, [])

    return (
        <div className='game'>            
            <div className='game-header'>               
                <div className="game-title">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className='link'>
                        <i className="fab fa-github" title="GitHub"></i>
                    </a>
                    <h1 className="game-h1">Memo</h1>
                    <a href="www.linkedin.com/in/roberto-baca" target="_blank" rel="noopener noreferrer" className='link'>
                        <i className="fab fa-linkedin" title="linkedin"></i>
                    </a>
                </div>
            </div>

            <div className='cards-board'>                  
                { cards.map((item,index) => (
                    <div className='card-container' onClick={handleClick} key = {index} id = {item.id}>
                        <div className= {cards[index].flipped === true ? 'card-flip': "card"}>           
                            <div className='card-inner'>                        
                                <div className='card-front'></div>
                                    <div className='card-back'>
                                        <img src={item.img} alt="" className='card-logo'/>
                                    </div>               
                                </div>
                            </div>
                        </div>
                ))} 
            </div>         

            <div className='UI'>
                <Link to ="/"><i className="fas fa-home" title="home"></i></Link>               
                <i className="fas fa-undo-alt" title="new-game" onClick={handleRefresh}></i>                  
            </div>
        </div>
    )
}

export default Memo
