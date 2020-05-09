import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// Import the spinner
import SpinnerSrc from '../../assets/spinner.gif';
import { decrement, increment } from '../../actions';

const pagination = (data, page, rows) => {
  let trimStart = (page - 1) * rows;
  let trimEnd = trimStart + rows;

  let trimmedData = data.slice(trimStart, trimEnd);
  let pages = Math.ceil(data.length / rows);

  return { data: trimmedData, pages: pages };
};

const ProductsList = ({ products }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState(20);

  let a = pagination(Object.values(state.products.products), state.page, rows);

  return (
    <ItemDiv>
      {state.products.status === 'idle' && state.products.status !== 'error'
        ? a.data.map((product) => {
            return (
              <PlaceholderItem key={product.id} to={`/product/${product.id}`}>
                <ProductPicture
                  key={product.id}
                  src={product.imageSrc}
                  alt={product.name}
                ></ProductPicture>
                <Test>
                  <ProductPrice>{product.price}</ProductPrice>
                  {product.name}
                </Test>
              </PlaceholderItem>
            );
          })
        : state.status !== 'error' && (
            <Spinner src={SpinnerSrc} alt='spinner'></Spinner>
          )}
      <ButtonsContainer
      >
        <Buttons
          onClick={() => {
            if (state.page > 1) dispatch(decrement());
          }}
        >
          Back
        </Buttons>
        <Buttons
          onClick={() => {
            if (
              page <
              Math.ceil(Object.values(state.products.products).length / rows)
            )
              dispatch(increment());
          }}
        >
          Next
        </Buttons>
      </ButtonsContainer>
    </ItemDiv>
  );
};

const ItemDiv = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  position: relative;
  padding-bottom: 50px;
`;

const PlaceholderItem = styled(Link)`
  width: 100%;
  height: 350px;
  text-align: center;
  background-color: white;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  font-size: 14px;
`;

const ProductPicture = styled.img`
  transition: 400ms ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const Test = styled.div`
  max-width: 80%;
  min-height: 50px;
  margin-top: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0px 10px;
  position: absolute;
  bottom: 0;
`;

const ProductPrice = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Spinner = styled.img`
  height: 70px;
  width: 70px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Buttons = styled.button`
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
  outline: none;
  margin: 5px;
  padding: 5px 15px;
  cursor: pointer;
  transition: all 200ms ease-in-out;

  &:hover {
    background-color: #000;
    color: #fff;
  }
`;

const ButtonsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ProductsList;
