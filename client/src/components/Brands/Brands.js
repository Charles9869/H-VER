import React from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import {
  requestAllProducts,
  receiveAllProducts,
  receiveProductsError,
} from '../../actions';

const Brands = ({ companies }) => {
  const dispatch = useDispatch();

  // Change the state array and store all products by a brand
  const getProductsByBrands = () => {
    dispatch(requestAllProducts());
    fetch(
      `/search?brand=${window.localStorage.getItem(
        'brand'
      )}&category=${window.localStorage.getItem('category')}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) dispatch(receiveAllProducts(data));
        else dispatch(receiveProductsError(data));
      });
  };

  const getAllProducts = () => {
    /// Clears the localstorage
    window.localStorage.clear();
    dispatch(requestAllProducts());
    fetch('/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) dispatch(receiveAllProducts(data));
        else dispatch(receiveProductsError(data));
      });
  };
  return (
    <React.Fragment>
      <AllBrand
        onClick={() => {
          window.localStorage.removeItem('brand');
          if (window.localStorage.getItem('category') !== null) {
            getProductsByBrands();
          } else getAllProducts();
        }}
      >
        + ALL BRANDS
      </AllBrand>
      <span style={{ fontWeight: 'bold' }}>BRANDS</span>
      {companies.map((company) => {
        return (
          <Brand
            isSelected={
              company.id === parseInt(window.localStorage.getItem('brand'))
            }
            onClick={(e) => {
              window.localStorage.setItem('brand', e.target.id);
              getProductsByBrands();
            }}
            id={company.id}
            key={company.id}
          >
            {company.id === parseInt(window.localStorage.getItem('brand')) &&
              '+ '}
            {company.name}
          </Brand>
        );
      })}
    </React.Fragment>
  );
};

const Brand = styled.div`
  margin: 5px 0px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  font-weight: ${(props) => props.isSelected && 'bold'};
`;

const AllBrand = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

export default Brands;
