import './App.css';
import {Route, Routes} from 'react-router-dom';
import Timer from './components/Timer';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Timer/>}/>
      <Route path='/timer' element={<Timer/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;
