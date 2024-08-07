import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const Page = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  overflow: hidden;
  position: relative;
`;

const waveAnimation = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
`;

const Wave = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 40%;
  height: 100%;
  background-color: #ffc0cb;
  animation: ${waveAnimation} 2s ease-out forwards;
  clip-path: path('M0,100 C30,120 70,80 100,100 L100,0 L0,0 Z');
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const SelectionBox = styled.div`
  width: 80%;
  height: 50px;
  background-color: white;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  opacity: 0;
  animation: ${fadeInAnimation} 0.5s ease-out forwards;
  animation-delay: ${props => props.delay}s;
`;

const MobilePage = () => {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행될 로직
  }, []);

  return (
    <Page>
      <Wave />
      <SelectionBox delay={1.5} />
      <SelectionBox delay={1.8} />
      <SelectionBox delay={2.1} />
      <SelectionBox delay={2.4} />
    </Page>
  );
};

export default MobilePage;