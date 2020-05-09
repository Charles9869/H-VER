import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeProduct } from '../../actions';

const CartItem = ({ product }) => {
  const productQuantity = useSelector(
    (state) => state.cart[product.id].quantity
  );
  const subtotal = useSelector((state) => {
    let newPrice = state.cart[product.id].price;
    newPrice = newPrice.split('$')[1];
    return state.cart[product.id].quantity * Number(newPrice);
  });

  const dispatch = useDispatch();

  return (
    <Wrapper>
      <ItemWrapper>
        <Link to={`/product/${product.id}`}>
          <PlaceholderItem src={product.imageSrc} />
        </Link>
      </ItemWrapper>

      <DescriptionWrapper>{product.name}</DescriptionWrapper>

      <PriceWrapper>
        <Price>{product.price}</Price>
      </PriceWrapper>

      <QuantityWrapper>
        <QuantityInput
          type='number'
          min='1'
          max={product.numInStock}
          value={productQuantity}
          onChange={(ev) => {
            if (product.numInStock === 0) return;
            dispatch(updateQuantity(product.id, parseInt(ev.target.value)));
          }}
        />
      </QuantityWrapper>

      <TotalWrapper>
        <RemoveButton onClick={() => dispatch(removeProduct(product.id))}>
          Remove
        </RemoveButton>
        <TotalPrice>${subtotal.toFixed(2)}</TotalPrice>
      </TotalWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 32% 32% 12% 12% 12%;
  color: black;
  height: auto;
  border: 1px solid black;
  margin: 2px;
  padding: 10px 0px;
  font-size: 18px;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-right: 1px solid black;
`;

const PlaceholderItem = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;

  width: auto;
  height: 158px;
  text-align: center;
`;

const DescriptionWrapper = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;
`;

const QuantityWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;
`;

const QuantityInput = styled.input`
  display: flex;
  justify-content: center;
  width: 30px;
  height: 25px;
  margin: auto;
  font-size: 15px;
`;

const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-evenly;
  margin: 0 auto;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  font-weight: bolder;
  outline: none;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 60px;
`;

export default CartItem;
