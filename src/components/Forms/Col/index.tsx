import styled from 'styled-components';
import { Col } from 'antd';

export const AsnCol = styled(Col)`
  &.next {
    display: flex;
    justify-content: right;
    padding: 1rem;
    
    .reject,
    .approve {
      color: var(--white);
      border-radius: 8px;
      width: 6rem;

      &:hover {
        border-color: var(--white);
      }
    }

    .reject {
      margin-right: 1rem;
      background-color: var(--error);

      &:disabled {
        background-color: #ea1f4d59;
      }
    }

    .approve {
      background-color: var(--secondary-green);

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
