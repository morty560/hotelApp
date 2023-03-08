import { useEffect, useState} from 'react';
import Hero from './containers/Hero/Hero';
import Hotels from './containers/Hotels/Hotels';
import HotelsContextProvider from './store/HotelsContext';
import { initialState } from './store/HotelsContext';
import { HotelProps } from './types';
import { getData } from './utils/getData';

function App() {
  const [hotels, setHotels] = useState<HotelProps[]>([]);

  useEffect(() => {
    getData('https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG').then((data) => {
      setHotels(data);
    });
  }, []);

  return (
    <div className="App">
      <HotelsContextProvider context={{...initialState, hotels}}>
        <Hero />
        <Hotels />
      </HotelsContextProvider>
    </div>
  );
}

export default App;
