import React from 'react';
import styled from 'styled-components';

const FourOhFour = () => {
  return (
    <Wrapper>
      <Header>Sorry, we can't find what you're looking for</Header>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 50px;
`;

const Header = styled.h1`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  margin: auto;
`;

export default FourOhFour;
