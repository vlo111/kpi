import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const TitleContainer = styled(Title)`
  font-size: var(--headline-font-size) !important;
  color: var(--dark-border-ultramarine) !important;
`;

export const ChartTitleContainer = styled(Title)`
  font-size: var(--base-font-size) !important;
  color: var(--dark-1) !important;
  border-bottom: 1px solid var(--light-border-gray);
  padding-bottom: 1rem;
`;

export const CardContainer = styled.div<{ width: string }>`
  background-color: var(--white);
  box-shadow: var(--base-box-shadow);
  padding: 1rem;
  border-radius: 20px;
  width:  ${(props) => props.width};
  height: 400px;
`;

export const InfoCardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
`;
