import styled from "styled-components";
import { ModalProps } from "../../models/modal";

export const ModalWrapper = styled.div<ModalProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  
  height: calc(100svh - calc(80px - 2px));
  width: 50vw;
  max-width: 400px;

  background: var(--gray-800);
  color: var(--gray-100);

  position: absolute;
  top: 0;

  ${(props) => (props.right ? "right: 0;" : "left: 0;")};

  z-index: 11;

  > .title {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 2rem 1rem 1rem;

    width: 100%;

    > .content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      font-size: 1.5rem;
      font-weight: 700;

      padding: 0 0 1rem;
      gap: 1rem;

      width: 100%;

      border-bottom: 1px solid #2F2F2F;
      color: var(--gray-100);

      > .label {
        font-size: .75rem;
        font-weight: normal;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: .25rem .75rem;

        background: var(--gray-800);
        border: 1px solid var(--gray-500);
        border-radius: 9999px;
      }
    }
  }

  > .subtitle {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 1rem;

    width: 100%;
  }

  > ul {
    display: flex;
    flex: 1 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
    height: 100%;

    gap: 1rem;
    padding: 1rem;

    list-style-type: none;

    overflow: auto;
    -webkit-overflow-scrolling: touch;

    > a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-self: stretch;

      border: 1px solid var(--gray-500);
      border-radius: .5rem;

      width: 100%;

      padding: 1rem;
      cursor: pointer;

      outline: 2px solid transparent;
      transition: outline .25s ease;

      > .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        align-self: stretch;

        position: relative;

        width: calc(100% - 2rem);
        gap: .5rem;
        
        > span {
          color: var(--gray-300);
          /* text-transform: capitalize; */
        }

        > p {
          display: block;
          color: var(--gray-400);

          width: 100%;
          height: 14px;

          font-weight: 400;
          font-size: 1rem;
          line-height: .85rem;

          white-space: nowrap;
          text-overflow: ellipsis;

          overflow: hidden;
        }

        > pre {
          display: flex;
          justify-content: center;
          align-items: center;
          
          position: absolute;
          top: -1.75rem;
          left: -1.75rem;

          width: .75rem;
          height: .75rem;
          padding: .75rem;

          font-size: .75rem;

          background: var(--gray-800);
          outline: 2px solid var(--gray-500);
          border-radius: 50%;
        }
      }

      > button {
        display: flex;
        justify-content: center;
        align-items: center;

        background: none;
        border: none;

        padding: .5rem;

        cursor: pointer;
        z-index: 2;

        > svg {
          width: 1.25rem;
          height: 1.25rem;

          color: var(--gray-400);
        }

        &:hover {
          > svg {
            color: var(--gray-300);
          }
        }
      }

      &:not(.clear):hover {
        outline: 2px solid var(--gray-400);

        .info {
          span {
            color: var(--gray-300);
          }

          p {
            color: var(--gray-400);
          }
        }
      }

      &.clear {
        justify-content: center;
        text-align: center;

        border: none;

        &:hover {
          outline: 2px solid var(--red);
          color: var(--red);
        }
      }
    }
  }

  .warning {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    text-align: center;

    width: 100%;
    height: 100%;

    gap: 1rem;
    color: var(--gray-400);
    
    > svg {
      font-size: 5rem;
    }

    > .message {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  > div:not(.title, .subtitle) {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    
    padding: 0 1rem;
    margin-bottom: 1rem;

    overflow: hidden;

    &.theme-switcher {
      > button {
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 1rem;

        width: 100%;
        min-height: 50px;
        height: 100%;
        max-height: 50px;

        background: var(--gray-700);
        color: var(--gray-100);
        border: unset;

        cursor: pointer;

        &.selected {
          background: var(--gray-500);
        }

        &:first-child {
          border-radius: 1rem 0 0 1rem;
        }

        &:last-child {
          border-radius: 0 1rem 1rem 0;
        }

        > svg {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }

    > button {
      display: flex;
      align-items: center;
      justify-content: center;

      gap: 1rem;

      width: 100%;
      min-height: 50px;
      height: 100%;
      max-height: 50px;

      background: var(--gray-700);
      color: var(--gray-100);

      border-radius: 1rem;
      border: unset;

      cursor: pointer;

      > svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      &:disabled {
        opacity: .5;
        cursor: not-allowed;
      }
    }

    &:last-child {
      margin-bottom: unset;
    }
  }

  @media (max-width: 650px) {
    width: 100%;
    max-width: unset;

    border-bottom: 1px solid var(--gray-500);
  }
`