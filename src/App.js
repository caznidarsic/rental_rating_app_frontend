import logo from './logo.svg';
import './App.scss';
import RentalSearch from './components/SearchPage/RentalSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        RateMyRental
      </header>
      <div className='Content'>
        <RentalSearch></RentalSearch>
      </div>
    </div>
  );
}

export default App;
