import { useContext, useEffect, useRef, useState } from 'react';
import CartModal from './CartModal.jsx';
import { CartContext } from '../store/shopping-cart-context.jsx';

export default function Header() {
  const { items } = useContext(CartContext);
  const modal = useRef();

  const cartQuantity = items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  async function handleHttpRequest() {
    if (!navigator.onLine) {
      alert('You are offline, set online');
      return;
    }

    try {
      const response = await fetch("https://localhost:32769/api/values");
      const resData = await response.json();

      if (!response.ok) {
        throw new Error(
          resData.message || "Something went wrong, failed to send request."
        );
      }
      console.log(resData);
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button onClick={handleHttpRequest}>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
        {!navigator.onLine && <p style={{ color: 'red' }}>You are offline (simulated)</p>}
      </header>
    </>
  );
}