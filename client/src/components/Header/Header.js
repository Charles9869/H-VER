import React from 'react';
import styled from 'styled-components';

import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartNumber = useSelector((state) => state.cart);
  return (
    <HeaderDiv>
      <Container>
        <Link to='/'>
          <Logo>H+VER</Logo>
        </Link>
        <LinkDiv>
          <li>
            <NavLink
              exact
              to='/'
              activeStyle={{
                borderBottom: '2px solid #000',
                paddingBottom: '5px',
              }}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to='/shop'
              activeStyle={{
                borderBottom: '2px solid #000',
                paddingBottom: '5px',
              }}
            >
              SHOP
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to='/about'
              activeStyle={{
                borderBottom: '2px solid #000',
                paddingBottom: '5px',
              }}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to='/cart'
              style={{ display: 'flex' }}
              activeStyle={{
                borderBottom: '2px solid #000',
                paddingBottom: '5px',
              }}
            >
              CART
              {Object.values(cartNumber).length > 0 ? (
                <div>&thinsp;&#40;{Object.values(cartNumber).length}&#41;</div>
              ) : null}
            </NavLink>
          </li>
        </LinkDiv>
      </Container>
    </HeaderDiv>
  );
};

const Logo = styled.div`
  font-size: 30px;
  font-family: 'Righteous', cursive;

  @media only screen and (max-width: 600px) {
    padding-bottom: 5px;
  }
`;

const LinkDiv = styled.ul`
  list-style: none;
  display: flex;
  @media only screen and (max-width: 600px) {
    margin: 0 auto;
  }

  li {
    margin: 10px;
  }
`;

const HeaderDiv = styled.div`
  width: 100%;
  border: 1px solid black;
  margin-top: 50px;
  font-family: 'Open Sans', sans-serif;
  padding: 30px 0px 30px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    text-decoration: none;
    color: black;
  }
`;

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;
export default Header;
