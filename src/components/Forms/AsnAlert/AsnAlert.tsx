
import { Alert, Typography } from 'antd';
import styled from 'styled-components';

const { Text } = Typography;

export const AsnAlert = styled(Alert)`
  margin-bottom: 24px;
  .ant-alert-message{
    color: var(--error);
  }
  &.ant-alert-error{
    border: 1px solid var(--error);
  }
`;

export const AsnText = styled(Text)`
  text-decoration: underline;
  color: var(--error);
  cursor: pointer;
`;
