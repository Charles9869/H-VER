import React from 'react';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import { addProduct, updateQuantityAlreadyInCart } from '../../actions';

import FourOhFour from '../FourOhFour';

const ItemDetail = () => {
  // state
  const [product, setProduct] = React.useState(null);
  const [company, setCompany] = React.useState(null);
  const [fourOhFour, setFourOhFour] = React.useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  // checking array of all products & companies
  const productArray = useSelector((state) => state.products.products);
  const companyArray = useSelector((state) => state.companies.companies);

  // checking to see if all products have been fetched
  const productStatus = useSelector((state) => state.products.status);

  const cart = useSelector((state) => state.cart);
  // Stores the related item inside the array
  let relatedArray = [];

  // setting the company state using the product's companyId. runs only when the product state updates.
  React.useEffect(() => {
    if (product !== null) {
      const idChecker = productArray.map((obj) => obj.id === parseInt(id));
      if (idChecker.includes(true)) {
        let compObj = companyArray.find((obj) => obj.id === product.companyId);
        setCompany(compObj);
      } else {
        setFourOhFour(true);
      }
    }
  }, [product, id]);

  // setting the product state using using id parameter. runs only when productStatus changes
  React.useEffect(() => {
    if (productStatus === 'idle') {
      let prodObj = productArray.find((obj) => obj.id === parseInt(id));
      setProduct(prodObj);
    }
  }, [productStatus, id]);

  // Returns an array of random numbers
  const getRandomNumbers = (length) => {
    let arr = [];
    do {
      let ran = Math.floor(Math.random() * length);
      arr = arr.indexOf(ran) > -1 ? arr : arr.concat(ran);
    } while (arr.length < 3);

    return arr;
  };

  if (company !== null && product !== null && productStatus === 'idle') {
    let related = productArray.filter((p) => p.companyId === product.companyId);
    let relatedWitoutCurrentProduct = related.filter(
      (item) => item.name !== product.name
    );

    if (related.length === 1) {
      relatedWitoutCurrentProduct = [];
    } else if (relatedWitoutCurrentProduct.length === 2) {
      relatedWitoutCurrentProduct.forEach((item) => relatedArray.push(item));
    } else if (relatedWitoutCurrentProduct.length >= 3) {
      let randomArray = [];
      for (let i = 0; i < 3; i++)
        randomArray = getRandomNumbers(relatedWitoutCurrentProduct.length);

      randomArray.forEach((element) =>
        relatedArray.push(relatedWitoutCurrentProduct[element])
      );
    }
  }
  if (fourOhFour === false) {
    return (
      <>
        {product !== null && company !== null && productStatus === 'idle' ? (
          <>
            <Wrapper>
              <ItemWrapper>
                <ItemName>
                  <ItemNameItem>{company.name}</ItemNameItem>
                  <ItemNameItem>{product.name}</ItemNameItem>
                  <ItemNameItem>{product.price}</ItemNameItem>
                </ItemName>
                <ImgWrapper>
                  <ItemImage src={product.imageSrc} alt={product.name} />
                </ImgWrapper>
              </ItemWrapper>
              <DescriptionWrapper>
                <DescriptionTitle>Lorem ipsum dolor sit amet</DescriptionTitle>
                <Description>
                  Consectetur adipiscing elit. Mauris vel leo sodales, convallis
                  nibh ac, tempus ipsum. Fusce posuere cursus tempus. Vestibulum
                  sit amet urna convallis, condimentum massa ut, vestibulum
                  dolor. Nullam ac enim sit amet leo fermentum porta semper non
                  ipsum. Nunc a neque magna. Praesent vitae lacus id sapien
                  mattis gravida. Fusce sit amet est molestie, tincidunt eros
                  sit amet, viverra leo.
                </Description>
                <Description>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Mauris vel leo sodales, convallis nibh ac, tempus ipsum. Fusce
                  posuere cursus tempus. Vestibulum sit amet urna convallis,
                  condimentum massa ut, vestibulum dolor. Nullam ac enim sit
                  amet leo fermentum porta semper non ipsum. Nunc a neque magna.
                  Praesent vitae lacus id sapien mattis gravida. Fusce sit amet
                  est molestie, tincidunt eros sit amet, viverra leo.
                </Description>
                {product.numInStock > 0 ? (
                  <AddToCart
                    onClick={() => {
                      let findProduct = Object.values(cart).find(
                        (item) => item.id === product.id
                      );
                      // If the product is already in the cart it will only increase the quantity of it else add to the cart
                      if (findProduct !== undefined) {
                        dispatch(
                          updateQuantityAlreadyInCart(
                            findProduct.id,
                            findProduct.quantity
                          )
                        );
                      } else dispatch(addProduct(product));
                    }}
                  >
                    ADD TO CART
                  </AddToCart>
                ) : (
                  <SoldOut>OUT OF STOCK</SoldOut>
                )}
              </DescriptionWrapper>
              <RelatedItemWrapper>
                <BlackBox>RELATED ITEMS</BlackBox>
                {relatedArray.length > 0 ? (
                  relatedArray.map((p) => {
                    return (
                      <RelatedItem key={p.id} to={`/product/${p.id}`}>
                        <img src={p.imageSrc} />
                      </RelatedItem>
                    );
                  })
                ) : (
                  <NoItemsContainer>
                    <h1
                      style={{ textAlign: 'center', fontFamily: 'Open Sans' }}
                    >
                      There's no related items for this product
                    </h1>
                  </NoItemsContainer>
                )}
              </RelatedItemWrapper>
            </Wrapper>
          </>
        ) : (
          <h1>Loading...</h1>
        )}
      </>
    );
  } else {
    return <FourOhFour />;
  }
};

const RelatedItem = styled(Link)`
  width: 25%;
  border-left: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BlackBox = styled.div`
  background-color: black;
  color: white;
  font-family: 'Open Sans', sans-serif;
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: underline;
`;

const RelatedItemWrapper = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid black;
  margin-top: 50px;
  height: 250px;
  grid-area: related;
`;

const AddToCart = styled.button`
  text-decoration: underline;
  background-color: black;
  color: white;
  font-family: 'Open Sans', sans-serif;
  border: none;
  outline: none;
  height: 100px;
  bottom: 0;
  position: absolute;
  width: 100%;
  cursor: pointer;
  transition: 500ms;
  &:hover {
    background-color: #808080;
  }
`;

const SoldOut = styled.button`
  text-decoration: underline;
  background-color: grey;
  color: white;
  font-family: 'Open Sans', sans-serif;
  border-top: 1px solid black;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
  outline: none;
  height: 100px;
  bottom: 0;
  position: absolute;
  width: 100%;
  cursor: not-allowed;
`;

const Description = styled.div`
  font-family: 'Open Sans', sans-serif;
  padding: 15px;
  font-size: 15px;
`;

const DescriptionTitle = styled.div`
  font-family: 'Open Sans', sans-serif;
  padding: 15px;
  font-size: 15px;
  font-weight: 600;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  position: relative;
`;

const ItemImage = styled.img`
  margin: auto;
`;

const ImgWrapper = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
  height: 100%;
`;

const ItemNameItem = styled.div`
  text-align: center;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 500px 200px;
  margin-top: 50px;
  margin-bottom: 100px;
  grid-template-areas:
    '. .'
    'related related';
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemName = styled.div`
  background-color: black;
  color: white;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const NoItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 20px;
  font-weight: bold;
`;
export default ItemDetail;
