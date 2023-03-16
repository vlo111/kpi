import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export const TitleContainer = styled(Title)`
  font-size: var(--headline-font-size) !important;
  color: var(--dark-border-ultramarine) !important;
`;

export const CardContainer = styled.div<any>`
  background-color: var(--white);
  box-shadow: var(--base-box-shadow);
  padding: 1rem;
  border-radius: 20px;
  width:  ${(props) => props.width};
  height: 400px;
`;
