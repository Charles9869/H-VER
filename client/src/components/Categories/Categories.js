import React from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import {
  requestAllProducts,
  receiveAllProducts,
  receiveProductsError,
} from '../../actions';

const Categories = () => {
  //
  const [categories, SetCategories] = React.useState([]);
  const [isSelected, SetIsSelected] = React.useState(false);

  const dispatch = useDispatch();

  // Fetch all the categories to display on the side
  React.useEffect(() => {
    fetch('/categories')
      .then((res) => res.json())
      .then((data) => SetCategories(data));
  }, []);

  const fetchProduct = () => {
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

  const getProductsByCategories = () => {
    SetIsSelected(!isSelected);
    if (!isSelected) fetchProduct();
    else {
      window.localStorage.removeItem('category');
      fetchProduct();
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <span style={{ fontWeight: 'bold' }}>CATEGORIES</span>
      {categories.map((caterogyName, index) => {
        return (
          <CategoriesLabel
            key={index}
            onClick={(e) => {
              window.localStorage.setItem('category', e.target.id);
              getProductsByCategories();
            }}
            id={caterogyName}
            isSelected={
              caterogyName === window.localStorage.getItem('category') &&
              isSelected
            }
          >
            {caterogyName === window.localStorage.getItem('category') &&
              isSelected &&
              '+ '}
            {caterogyName}
          </CategoriesLabel>
        );
      })}
    </div>
  );
};

const CategoriesLabel = styled.div`
  margin: 5px 0px;
  cursor: pointer;
  font-weight: ${(props) => props.isSelected && 'bold'};

  &:hover {
    text-decoration: underline;
  }
`;

export default Categories;
