import React from 'react';
import styled from 'styled-components';

import imgOneSrc from '../../assets/chrishand.jpg';
import imgTwoSrc from '../../assets/Casio-G-Shock-GMW-b5000-gear-patrol-full-03.jpg';

const Homepage = () => {
  return (
    <HomepageDiv>
      <NasaHandImage src={imgOneSrc} alt='NASA Hand' />
      <GShockImage src={imgTwoSrc} alt='G-Shock Advert' />
    </HomepageDiv>
  );
};

const HomepageDiv = styled.div`
  width: 100%;
  display: grid;
  border: 1px solid black;
  grid-template-columns: 50% 50%;
  grid-template-areas: 'left right';
  margin-top: 40px;
  height: auto;
`;

const NasaHandImage = styled.img`
  width: 90%;
  padding: 5% 5% 5% 5%;
  grid-area: left;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const GShockImage = styled.img`
  width: 90%;
  padding: 5% 5% 5% 5%;
  grid-area: right;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export default Homepage;
