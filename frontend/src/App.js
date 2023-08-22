import { Button } from '@chakra-ui/react'
import { Route } from 'react-router-dom/cjs/react-router-dom.min'
import HomePage from './Pages/HomePage'
import ChatPage from './Pages/ChatPage'
import './App.css'
function App () {
  return (
    <div className='App'>
      <Route path='/' component={HomePage} exact />
      <Route path='/chats' component={ChatPage} exact />
    </div>
  )
}

export default App
