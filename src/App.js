import './App.css';
import { BrowserRouter } from 'react-router-dom';
import RouterView from './pages';

function App() {
  return (
    <BrowserRouter>
      <RouterView />
    </BrowserRouter>
  );
}

export default App;