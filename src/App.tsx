import './App.css'
import DigitalEncoder from './components/comps/DigitalEncoder'
import DarkModeToggle from './components/comps/ThemeButton'
import { ThemeProvider } from './components/comps/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className='flex flex-wrap justify-center w-full m-0'>
        <div className='flex flex-col items-center mb-5'>
          <p className='text-3xl mb-3 font-doto-black'>Data Communications and Networking</p>
          <DarkModeToggle/>
        </div>
        <DigitalEncoder/>
      </div>
    </ThemeProvider>
  )
}

export default App
