import React from 'react';
import { Row, Typography } from 'antd';
import styled from 'styled-components';

import { AsnModal } from '../../components/Forms/Modal';
import { ReactComponent as SuccessfulIcon } from '../../assets/icons/successful.svg';

const { Title } = Typography;

const AsnTitle = styled(Title)`
   &.ant-typography {
    font-weight: var(--font-normal);
    font-size: var(--font-size-semilarge);
  }
  text-align: center;
`;
const SuccessModal: React.FC<{ success: boolean }> = ({ success }) => {
  return (
        <AsnModal
            footer={false}
            open={success}
            width="50vw"
        >
            <Row justify="center">
                <AsnTitle level={2}>Your form has been successfully submitted</AsnTitle>
                <SuccessfulIcon />
            </Row>
        </AsnModal>
  );
};

export default SuccessModal;
