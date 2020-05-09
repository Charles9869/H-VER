import React from 'react';
import styled from 'styled-components';

const Purchased = () => {
  return (
    <Wrapper>
      Purchase complete!
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
`;

export default Purchased
