import ReactDOM from 'react-dom/client'
import App from './App'

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '+358 50 1234 567'
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App persons={persons}/>
)