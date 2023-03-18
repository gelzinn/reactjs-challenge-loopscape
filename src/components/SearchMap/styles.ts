import styled from 'styled-components';

export const SearchMapContainer = styled.main`
  height: calc(100vh - calc(100vh - 100%));
  min-height: fill-available;
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

    background: var(--gray-800);

    z-index: 0;
  }

  background: var(--gray-800);
`

export const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 80px;

  background: var(--gray-800);
  border-top: 1px solid var(--gray-500);

  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;

  z-index: 10;

  filter: drop-shadow(5px 0px 50px #000000);

  > a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    padding: 1rem 2rem;

    gap: 1rem;
    color: var(--gray-400);

    text-decoration: none;
    user-select: none;
    cursor: pointer;

    > svg {
      width: 1.5rem;
      height: 1.5rem;

      color: var(--gray-400);
    }

    &.active {
      color: var(--gray-100);

      > svg {
        color: var(--gray-100);
      }

      &:hover {
        color: var(--gray-300);

        > svg {
          color: var(--gray-300);
        }
      }
    }

    > span {
      display: block;

      @media (max-width: 978px) {
        display: none;
      }
    }

    @media (min-width: 650px) {
      &:hover {
        color: var(--gray-300);

        > svg {
          color: var(--gray-300);
        }
      }
    }

    @media (max-width: 650px) {
      height: 100%;
    }
  }
  
  > form {
    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 100%;

    padding: 1rem;
    /* border-radius: 1rem; */

    border: 1px var(--gray-500) inset solid;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      max-width: 600px;

      min-height: 50px;
      height: 100%;
      max-height: 50px;

      background: transparent;
      border: 1px var(--gray-500) solid;
      
      padding: .75rem 0 .75rem 1rem;
      border-radius: 1rem;

      cursor: text;

      > input {
        width: 100%;
        height: 50px;

        background: transparent;
        border: transparent;
        
        font-size: 1rem;
        color: var(--gray-200);

        &:focus {
          outline: transparent;
        }

        @media (max-width: 650px) {
          font-size: .85rem;
        }
      }

      > button {
        display: flex;
        justify-content: center;
        align-items: center;
        
        background: none;
        border: none;
        
        min-width: 50px;
        width: 100%;
        max-width: 50px;

        min-height: 50px;
        height: 100%;
        max-height: 50px;

        cursor: pointer;

        > svg {
          width: 100%;
          max-width: 16px;
          height: 100%;
          max-height: 16px;

          color: var(--gray-400);
        }

        &:focus {
          outline: 2px solid var(--gray-400);
          outline-offset: -.5rem;

          border-radius: 9999px;
        }
      }

      &:focus-within {
        outline: 2px solid var(--gray-400);
        outline-offset: -1px;   
      }
    }

    /* @media (min-width: 1300px) {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    } */

    @media (max-width: 650px) {
      position: absolute;
      transform: translateY(-40px);

      background: var(--gray-800);
      border-radius: 1rem 1rem 0 0;

      border-bottom: 1px solid var(--gray-500);

      height: 100%;
      max-height: 80px;

      > div {
        border: unset;
      }
    }
  }

  .save-location {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;
    max-height: 64px;
    width: fit-content;

    position: absolute;
    bottom: 80px;
    left: 0px;
    right: 0px;

    z-index: 10;

    .location {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 0 2rem;

      text-transform: capitalize;

      > span {
        color: var(--gray-100)
      }

      > p {
        color: var(--gray-400);
      }
    }

    .save {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 .5rem;

      width: 64px;
      height: 64px;

      background: transparent;
      border: none;

      cursor: pointer;

      > svg {
        color: var(--red);
        font-size: 1.25rem;

        transition: font-size .2s ease;
      }
    }

    @media (min-width: 650px) {
      background: var(--gray-800);
      border-radius: 0 1rem 0 0;

      .save {
        border-left: 1px solid var(--gray-500);
      }
    }

    @media (max-width: 650px) {
      bottom: 160px;
      right: 0;
      left: unset;

      .location {
        display: none;
      }
    }
  }

  @media (max-width: 650px) {
    /* width: 100%; */
    height: 160px;
    border-radius: 1rem 1rem 0 0;

    border-top: unset;

    > a {
      height: 100%;
      max-height: 80px;

      transform: translateY(40px);
    }
  }
`