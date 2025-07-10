import ReactDOM from 'react-dom/client'
import App from './App'

const persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '+358 50 1234 567'
  },
  {
    id: 2,
    name: 'Venla Lauri',
    number: '+358 40 2345 678'
  },
  {
    id: 3,
    name: 'William Stolt',
    number: '+358 50 3945 984'
  },
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App persons={persons}/>
)