import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

const loadingStyle = { fontSize: 80, color: 'var(--dark-border-ultramarine)' };

const antIcon = <LoadingOutlined style={loadingStyle} spin />;

const AsnSpin = styled(Spin)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Spinner: React.FC = () => <AsnSpin indicator={antIcon} />;

export default Spinner;
