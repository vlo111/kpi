import { Card } from 'antd';
import styled from 'styled-components';

export const AsnCardSubActivity = styled(Card)`
  button {
    background: rgba(42, 85, 120, 0.05);
    border-top: 2px solid var(--dark-border-ultramarine);
    border-radius: 20px;
    height: 200px;
    width: 200px !important;
  }
  .card {
    height: 200px;
    width: 200px;
    background: rgba(246, 151, 109, 0.05);
    border-top: 2px solid var(--secondary-light-orage) !important;
    box-shadow: 0px 4px 4px rgba(246, 151, 109, 0.2);
    border-radius: 20px;
  }
  .ant-card-body {
    padding: 0 28px;
  }
  .cardRound {
    z-index: 1;
    background: white;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    position: absolute;
    top: -16px;
    left: 47px;
    border: 2px solid var(--secondary-light-orage);
    color: var(--secondary-light-orage);
    justify-content: center;
    display: flex;
  }
  .cardInactive {
    background: var(--dark-5);
    border-top: 2px solid var(--dark-5) !important;
    box-shadow: 0px 4px 4px rgba(104, 163, 149, 0.2);
  }
  .cardActive {
    background: rgba(104, 163, 149, 0.05);
    border-top: 2px solid var(--secondary-green) !important;
    border: 2px solid var(--secondary-green) !important;
    box-shadow: 0px 4px 4px rgba(104, 163, 149, 0.2);
    ::before {
      position: absolute;
      left: 51px;
      content: "🗸";
      z-index: 2;
      top: -19px;
      color: var(--secondary-green);
      font-size: 25px;
    }
  }
  .cardRoundInactive {
    border: 2px solid var(--dark-5);
  }
  .carDone {
    ::before {
      position: absolute;
      left: 55px;
      content: "...";
      z-index: 2;
      top: -22px;
      color: var(--secondary-light-orage);
      font-size: 20px;
    }
  }
  .active {
    border: 2px solid var(--secondary-green);
    align-items: center;
  }
  .ant-card-head-title {
    font-size: var(--headline-font-size);
  }
  .ant-card-head {
    border-bottom: 0;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none !important;
  }
  .cardDone {
    border: 2px solid #68a395 !important;
  }
`;
