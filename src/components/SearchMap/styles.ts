import styled, { keyframes } from 'styled-components';

const revealAnimation = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }

  100% {
    transform: none;
  }
`

const revealMobileAnimation = keyframes`
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: none;
  }
`

export const MapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  overflow: hidden;

  > iframe {
    width: 100%;
    height: 100%;
  }
`

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  position: absolute;
  bottom: 5%;
  left: 0;
  right: 0;

  animation: ${revealAnimation} 1s ease;
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;

    background: white;
    
    width: 100%;
    max-width: 600px;

    padding: 1rem;
    border-radius: 1rem;

    filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.15));

    > div {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 45px;

      background: transparent;
      border: 1px black inset;
      border-style: solid none solid solid;
      
      padding: .75rem 1rem;
      border-radius: 1rem 0 0 1rem;

      cursor: text;

      > input {
        width: 100%;

        background: transparent;
        border: transparent;

        &:focus {
          outline: transparent;
        }
      }

      > button {
        background: none;
        border: none;
        
        width: 24px;
        height: 100%;

        cursor: pointer;

        > svg {
          width: 100%;
          height: 100%;

          fill: black;
        }
      }
    }

    > button {
      height: 45px;

      background: black;
      border: 1px solid transparent;

      color: white;
      
      padding: .75rem 1rem;
      border-radius: 0 1rem 1rem 0;

      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    bottom: 0;
    
    .container {
      width: 100%;
      max-width: unset;
      height: 100%;

      border-radius: 1rem 1rem 0 0;

      filter: drop-shadow(5px -5px 5px rgba(0,0,0,0.15));
    }

    animation: ${revealMobileAnimation} 1s ease;
  }
`