import React from 'react';
import { Row } from 'antd';

import { AsnButton } from '../../../../Forms/Button';

const SubActivityFooter: React.FC<{ cancel?: any, add?: any }> = ({ cancel, add }) => {
  return (
    <Row align="middle" justify="end">
      <AsnButton className="default" onClick={() => cancel('1')}>Cancel</AsnButton>
      <AsnButton
        type="primary"
        className="primary"
        style={{ marginLeft: '4vw' }}
        onClick={add}
      >
        Save
      </AsnButton>
    </Row>
  );
};

export default SubActivityFooter;
