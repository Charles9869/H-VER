import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import parsePrice from 'parse-price';

import CartItem from '../Cart/CartItem';

import { clearCart } from '../../actions';

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  const grandTotal = () => {
    let price = 0;
    Object.values(products).forEach((item) => {
      return (price += parsePrice(item.price) * parseInt(item.quantity));
    });
    return price;
  };

  const handleSubmit = () => {
    fetch('https://hover-backend.herokuapp.com/products/purchase-item', {
      method: 'PUT',
      body: JSON.stringify(Object.values(products)),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(clearCart());
        window.location.reload();
      });
  };
  return (
    <Wrapper>
      <Top>
        <Title>YOUR CART</Title>
      </Top>

      <ItemList>
        <ItemHeader>
          <Header>Item</Header>
          <Header></Header>
          <Header>Price</Header>
          <Header>Qty</Header>
          <Header>Total</Header>
        </ItemHeader>

        {Object.values(products).map((product) => (
          <CartItem key={product.id} product={product} products={products} />
        ))}
      </ItemList>

      <Bottom>
        <Total>Total: ${grandTotal().toFixed(2)}</Total>
        <ButtonWrapper>
          <Button to='/shop'>CONTINUE SHOPPING</Button>
          <PurchaseButton
            onClick={handleSubmit}
            disabled={Object.values(products).length > 0 ? false : true}
            cartEmpty={Object.values(products).length}
            style={{
              width: 90,
            }}
          >
            PURCHASE
          </PurchaseButton>
        </ButtonWrapper>
      </Bottom>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  color: white;
  border: 1px solid black;
  padding: 25px 0px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Open Sans', sans-serif;
`;

const Top = styled.div`
  max-height: calc(100vh - 240px);
  overflow: hidden;
  padding-left: 32px;
  padding-right: 32px;
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 0;
`;

const ItemList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 50px;
  margin: 30px;
  border-top: 1px solid black;
`;

const ItemHeader = styled.div`
  display: grid;
  grid-template-columns: 32% 32% 12% 12% 12%;
  color: black;
  height: 5vh;
  border: 1px solid black;
  margin: 2px;
`;

const Header = styled.div`
  justify-items: center;
  text-align: center;
  margin-top: 10px;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 25px;
  padding-left: 32px;
  padding-right: 32px;
`;

const Total = styled.div`
  font-size: 22px;
  color: black;
  padding: 25px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled(Link)`
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  background: white;
  color: black;
  padding: 5px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid black;
  text-decoration: none;
  transition: 500ms;
  &:hover {
    background: black;
    color: white;
  }
`;

const PurchaseButton = styled.button`
  margin: 10px;
  display: block;
  width: 100%;
  background-color: ${(props) => (props.cartEmpty > 0 ? '#fff' : '#808080')};
  color: ${(props) => (props.cartEmpty > 0 ? '#000' : '#fff')};
  cursor: ${(props) => (props.cartEmpty > 0 ? 'pointer' : 'not-allowed')};
  padding: 5px;
  text-align: center;
  font-size: 16px;
  border: 1px solid #000;
  text-decoration: none;
  transition: 500ms;
  &:hover {
    background-color: ${(props) => props.cartEmpty > 0 && '#000'};
    color: #fff;
  }
`;

export default Cart;
