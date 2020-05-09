import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <WrapperDiv>
        <AboutUsDiv>
          <GridTitle>ABOUT US</GridTitle>
          <ul>
            <FooterLink to='/about'>+ ABOUT</FooterLink>
            <FooterLink to='#'>+ PRESS</FooterLink>
            <FooterLink to='#'>+ CONTACT</FooterLink>
            <FooterLink to='#'>+ CAREER</FooterLink>
          </ul>
        </AboutUsDiv>
        <CustomerServiceDiv>
          <GridTitle>CUSTOMER SERVICE</GridTitle>
          <ul>
            <FooterLink to='#'>+ FAQ</FooterLink>
            <FooterLink to='#'>+ REPAIR SERVICE</FooterLink>
            <FooterLink to='#'>+ SIZE GUIDE</FooterLink>
            <FooterLink to='#'>+ TERMS & CONDITIONS</FooterLink>
            <FooterLink to='#'>+ PRIVACY POLICY</FooterLink>
          </ul>
        </CustomerServiceDiv>
        <FollowUsDiv>
          <GridTitle>FOLLOW US!</GridTitle>
          <ul>
            <FooterLink to='#'>+ FACEBOOK</FooterLink>
            <FooterLink to='#'>+ INSTAGRAM</FooterLink>
            <FooterLink to='#'>+ PINTREST</FooterLink>
          </ul>
        </FollowUsDiv>
      </WrapperDiv>
    </div>
  );
};

const GridTitle = styled.div`
  text-decoration: underline;
  margin-bottom: 15px;
`;

const WrapperDiv = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  font-family: 'Open Sans', sans-serif;
  margin-bottom: 50px;
`;

const AboutUsDiv = styled.div`
  width: 97%;
  text-align: left;
  border: 1px solid black;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 0px;
  padding: 25px 0 25px 25px;
`;
const CustomerServiceDiv = styled.div`
  width: 97%;
  text-align: left;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-right: none;
  margin: auto;
  margin-top: 50px;
  padding: 25px 0 25px 50px;
`;
const FollowUsDiv = styled.div`
  width: 97%;
  text-align: left;
  border: 1px solid black;
  margin: auto;
  margin-top: 50px;
  margin-bottom: 0px;
  margin-left: -1px;
  padding: 25px 0 25px 25px;
`;

const FooterLink = styled(Link)`
  display: block;
  color: #000;
  text-decoration: none;
  &:hover {
    font-weight: bold;
  }
`;

export default Footer;
