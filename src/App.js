  import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

  import PolicyData from './components/PolicyData';
  import Visualize from './components/Visualization';
  import Navbar from './components/Nav';

  function App() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <div>
            <Routes>
              <Route path='/policy' element={<PolicyData/>} />
              <Route path='/visualize' element={<Visualize/>} />
              <Route path='/' element={<PolicyData/>} />
            </Routes>
          </div>
        </Router>
      </div>
    );
  }

  export default App;
