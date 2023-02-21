import styled from 'styled-components';
import { Col } from 'antd';

export const AsnCol = styled(Col)`
  &.next {
    display: flex;
    justify-content: right;
    position: absolute;
    right: 18rem;
    z-index: 2;
    
    .reject,
    .approve {
      color: var(--white);
      border-radius: 8px;
      width: 6rem;
      height: 44px;

      &:hover {
        border-color: var(--white);
      }
    }

    .reject {
      background-color: var(--error);

      &:disabled {
        background-color: #ea1f4d59;
      }
    }

    .approve {
      background-color: var(--secondary-green);
      margin-right: 1rem;
      margin-left: 2rem;

      &:disabled {
        background-color: #68a39575;
      }
    }
  }

  &.end {
    display: flex;
    justify-content: right;

    .move {
      margin-right: 1rem;
      margin-left: 2rem;
      padding: 10px 20px;
      display: flex;
      flex-direction: row-reverse;
      gap: 10px;

      &:hover path {
        fill: var(--dark-border-ultramarine);
      }

      &:disabled {
        background-color: #2c547775;
      }

      &:hover {
        color: var(--white);
        path {
          fill: var(--white);
        }
      }
    }
  }
`;
