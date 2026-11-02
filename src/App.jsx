import { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import './App.css';

function App() {
  const [showProducts, setShowProducts] = useState(false);

  return (
    <>
      {!showProducts ? (
        <div className="landing-page">
          <h1>Paradise Nursery</h1>
          <p>Where Green Meets Serenity</p>
          <button className="get-started-btn" onClick={() => setShowProducts(true)}>
            Get Started
          </button>
          <AboutUs />
        </div>
      ) : (
        <ProductList />
      )}
    </>
  );
}

export default App;
