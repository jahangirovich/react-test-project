import {BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import Tasks from './pages/tasks'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/page/:id' exact component={Tasks}/>
      </Switch>
    </Router>
   );
}

export default App;
