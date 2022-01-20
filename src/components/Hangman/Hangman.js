import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import "./Hangman.css"

const Hangman = () => {    
  
    const baseURL = "https://random-words-api.vercel.app/word";   

    const [word, setWord] = useState("");
    const [definition, setDefinition] = useState("");
    const [correctGuesses, setCorrectGuesses] = useState([]);
    const [mistakes, setMistakes] = useState(5);
    const [guesses, setGuesses] = useState([]);
    
    const alphabet = ["A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X", "Y", "Z"];
   
    let maskedWord = "";    

    const getWord = async () => {             

        try {
            const response = await fetch(baseURL, {
                method: "GET"                        
            });

            const data = await response.json();   
            //console.log(data[0].word.toUpperCase());
            setWord(data[0].word.toUpperCase()); 
            setDefinition(data[0].definition);   
            setMistakes(0);       
            setCorrectGuesses([]);  
            setGuesses([]);  
            
        } catch (error) {
            alert(error);
        }  
    };

    const guessLetter = (e) => {  
        
        if (mistakes < 5) {
            let letter = e.target.value;
            setGuesses([...guesses, letter + "-"]);

            if (word.includes(letter)) {
                setCorrectGuesses([...correctGuesses, letter]);  
    
            } else {
                setMistakes(1 + mistakes);
            }
        }
    }        

    useEffect(() => {       
        getWord();        
    }, [])  


    return (
        <div className='hangman'>            
            <div className='hangman-header'>               
                <div className="hangman-title">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github" title="GitHub"></i>
                    </a>
                    <h1 className="hangman-h1">Hangman</h1>
                    <a href="www.linkedin.com/in/roberto-baca" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin" title="linkedin"></i>
                    </a>
                </div>
            </div>                    
            
            <div className='hangman-body'>
                <div className='word-container'>
                    <p className='masked-word'>{maskedWord = word.split('').map(letter => correctGuesses.includes(letter) ? letter : "_").join(" ")}</p>           
                    <p className='hint'><span>Hint: </span>{definition}</p> 
                </div>
                {alphabet.map((letter, index) => <button className="letter"  key={index} onClick={guessLetter} value={alphabet[index]}>{alphabet[index]}</button>)}  
            </div>

            <div className='hangman-mistakes'>
                <p className='mistakes-count'>{guesses}</p>
                <p className='mistakes-count'>Mistakes: {mistakes}</p>
                <div>
                    {!maskedWord.includes("_") && mistakes < 5 && <p className='win-msg'>CONGRATULATIONS! YOU WON!!!</p>}
                    {maskedWord.includes("_") && mistakes >= 5 && <p className='lost-msg'>GAME OVER - The word was {word}</p>}                 
                </div>
            </div>           

            <div className='hangman-UI'>
                <Link to ="/"><i className="fas fa-home" title="home"></i></Link>       
                <i className="fas fa-undo-alt" title="new-game" onClick={getWord}></i>             
            </div>           
        </div>
    )
}

export default Hangman









