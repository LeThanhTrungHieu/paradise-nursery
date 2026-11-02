import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const img = (seed) => `https://picsum.photos/seed/${seed}/300/200`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('snake'), cost: 15 },
      { name: 'Spider Plant', image: img('spider'), cost: 12 },
      { name: 'Peace Lily', image: img('peace'), cost: 18 },
      { name: 'Boston Fern', image: img('boston'), cost: 14 },
      { name: 'Rubber Plant', image: img('rubber'), cost: 20 },
      { name: 'ZZ Plant', image: img('zzplant'), cost: 22 },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', image: img('lavender'), cost: 10 },
      { name: 'Mint', image: img('mint'), cost: 8 },
      { name: 'Rosemary', image: img('rosemary'), cost: 9 },
      { name: 'Basil', image: img('basil'), cost: 7 },
      { name: 'Jasmine', image: img('jasmine'), cost: 16 },
      { name: 'Lemon Balm', image: img('lemonbalm'), cost: 11 },
    ],
  },
  {
    category: 'Succulents',
    plants: [
      { name: 'Aloe Vera', image: img('aloe'), cost: 13 },
      { name: 'Jade Plant', image: img('jade'), cost: 17 },
      { name: 'Echeveria', image: img('echeveria'), cost: 9 },
      { name: 'Haworthia', image: img('haworthia'), cost: 10 },
      { name: 'Cactus', image: img('cactus'), cost: 8 },
      { name: 'String of Pearls', image: img('pearls'), cost: 19 },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const isInCart = (name) => items.some((i) => i.name === name);

  return (
    <div>
      <nav className="navbar">
        <a href="/">Home</a>
        <a href="#plants" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
        <a href="#cart" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
          🛒 Cart <span className="cart-count">{totalCount}</span>
        </a>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        plantsArray.map((group) => (
          <section key={group.category}>
            <h2>{group.category}</h2>
            <div className="plant-grid">
              {group.plants.map((plant) => (
                <div className="plant-card" key={plant.name}>
                  <img src={plant.image} alt={plant.name} />
                  <h3>{plant.name}</h3>
                  <p>${plant.cost}</p>
                  <button
                    disabled={isInCart(plant.name)}
                    onClick={() => dispatch(addItem(plant))}
                  >
                    {isInCart(plant.name) ? 'Added' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}

export default ProductList;
