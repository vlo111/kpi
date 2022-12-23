import React from 'react';
import { Row } from 'antd';
import styled from 'styled-components';

import { AsnButton } from '../../../../Forms/Button';

const Footer = styled(Row)``;
const SubActivityFooter: React.FC = () => {
  return (
    <Footer align="middle" justify="end">
      <AsnButton className="default">Cancel</AsnButton>
      <AsnButton
        type="primary"
        className="primary"
        style={{ marginLeft: '4vw' }}
      >
        Save
      </AsnButton>
    </Footer>
  );
};

export default SubActivityFooter;
