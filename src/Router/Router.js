import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hangman from '../components/Hangman/Hangman'
import Quiz from '../components/Quiz/Quiz'
import Memo from '../components/Memo/Memo'
import Home from '../components/Home/Home'

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = {<Home/>}></Route>                    
                    <Route path = "/home/Hangman" element = {<Hangman/>}></Route>       
                    <Route path = "/home/quiz" element = {<Quiz/>}></Route>
                    <Route path = "/home/memo" element = {<Memo/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default Router
