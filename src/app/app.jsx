import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import TodoList from '../todo/todo'
import {HeroUIProvider} from '@heroui/react'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
    <TodoList/>
    </HeroUIProvider>
  </StrictMode>,
)
