import React from 'react';
import styled from 'styled-components';

const About = () => {
  return (
    <SuperDiv>
      <StockImage
        src='https://images.pexels.com/photos/9051/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
        alt='Product Advert'
      />
      <WrapperDiv>
        <MyComponent
          src='https://images.pexels.com/photos/3094799/pexels-photo-3094799.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
          alt='Advert'
        />
        <TextDiv>
          <ParagraphTitle>Lorem</ParagraphTitle>
          <Paragraph>
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Nibh cras
            pulvinar mattis nunc sed blandit libero volutpat. Vel turpis nunc
            eget lorem. Nunc aliquet bibendum enim facilisis gravida neque
            convallis a. Sagittis nisl rhoncus mattis rhoncus. Sem integer vitae
            justo eget magna fermentum. Viverra aliquet eget sit amet. Facilisi
            morbi tempus iaculis urna id volutpat. Malesuada fames ac turpis
            egestas. Leo duis ut diam quam nulla porttitor massa
          </Paragraph>
          <ParagraphTitle>Nunc</ParagraphTitle>
          <Paragraph>
            Leo in vitae turpis massa sed elementum tempus egestas sed. Turpis
            nunc eget lorem dolor sed viverra. Purus faucibus ornare suspendisse
            sed nisi. Facilisis gravida neque convallis a cras. ipsum dolor sit
            amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Nibh cras pulvinar mattis nunc sed
            blandit libero volutpat. Vel turpis nunc eget lorem. Nunc aliquet
            bibendum enim facilisis gravida neque convallis a. Sagittis nisl
            rhoncus mattis rhoncus. Sem integer vitae justo eget magna
            fermentum. Viverra aliquet eget sit amet.
          </Paragraph>
          <ParagraphTitle>Maecenas</ParagraphTitle>
          <Paragraph>
            Accumsan lacus vel facilisis volutpat est velit. Neque vitae tempus
            quam pellentesque nec nam aliquam sem. Sit amet tellus cras
            adipiscing enim eu turpis egestas pretium. Leo in vitae turpis massa
            sed elementum tempus egestas sed. Turpis nunc eget lorem dolor sed
            viverra. Purus faucibus ornare suspendisse sed nisi. Facilisis
            gravida neque convallis a cras.ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Nibh cras pulvinar mattis nunc sed blandit
            libero volutpat. Vel turpis nunc eget lorem. Nunc aliquet bibendum
            enim facilisis gravida neque convallis a.
          </Paragraph>
          <ParagraphTitle>Facilisi</ParagraphTitle>
          <Paragraph>
            Turpis nunc eget lorem dolor sed viverra. Purus faucibus ornare
            suspendisse sed nisi. Facilisis gravida neque convallis a cras.ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Nibh cras pulvinar
            mattis nunc sed blandit libero volutpat. Vel turpis nunc eget lorem.
            Nunc aliquet bibendum enim facilisis gravida neque convallis a.
            Sagittis nisl rhoncus mattis rhoncus. Sem integer vitae justo eget
            magna fermentum. Viverra aliquet eget sit amet. Facilisi morbi
            tempus iaculis urna id volutpat. Malesuada fames ac turpis egestas.
            Leo duis ut diam quam nulla porttitor massa.
          </Paragraph>
        </TextDiv>
      </WrapperDiv>
    </SuperDiv>
  );
};

const SuperDiv = styled.div`
  padding: 0 20% 0 20%;
`;
const WrapperDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: 'left right';
  font-family: 'Open Sans', sans-serif;
  padding: '50% 50% 50% 50%';
`;
const StockImage = styled.img`
  grid-area: right;
  width: 100%;
  padding: 25px 0 10px 0;
  margin-top: 25px;
`;
const MyComponent = styled.img`
  grid-area: right;
  padding: 35px 0 20px 0;
  width: 100%;
`;

const ParagraphTitle = styled.div`
  font-weight: 900;
  text-decoration: underline;
  padding: 5px;
`;

const Paragraph = styled.div`
  padding: 5px;
  width: 90%;
  text-align: justify;
`;

const TextDiv = styled.div`
  font-family: 'Open Sans', sans-serif;
`;

export default About;
