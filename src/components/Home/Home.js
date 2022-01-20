import { Link } from "react-router-dom"
import "./Home.css"

const Home = () => {
    return (
        <div>
            <div className='home'>            
                <div className='home-header'>               
                    <div className="home-title">
                        <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-github" title="GitHub"></i>
                        </a>
                        <h1 className="game-h1">Mini Games ! 3 in 1</h1>
                        <a href="www.linkedin.com/in/roberto-baca" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin" title="linkedin"></i>
                        </a>
                    </div>
                </div>

                <div className="links-container">
                    <Link to ="home/hangman"><img src={require('../../assets/Hangman-Game-red.png')} alt="hangman" className="app-logo"/></Link>
                    <Link to ="home/memo"><img src={require('../../assets/Brain-Games-red.png')} alt="brain-game" className="app-logo"/></Link>
                    <Link to ="home/quiz"> <img src={require('../../assets/Quiz-Games-red.png')} alt="quiz" className="app-logo"/></Link>
                </div>  

                <div className='footer'>               
                   <p>Roberto Baca - 2022</p>
                </div>        
            </div>
        </div>
    )
}

export default Home
