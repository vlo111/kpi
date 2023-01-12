import React from 'react';
import { Col } from 'antd';
import styled from 'styled-components';

import { IWrapperProps } from '../../../../types/api/activity/subActivity';

const Wrapper = styled(Col)<{ color: string | undefined }>`
  width: 100%;
  height: auto;
  min-height: 35vh;
  background: var(--white);
  border-top: ${(props) => `3px solid var(${(props.color != null) ? props.color : '--primary-light-orange'})`};
  box-shadow: var(--base-box-shadow);
  border-radius: 20px;
  padding: 16px;
  margin-top: 4.8vh;

  h4.ant-typography {
    color: var(--dark-border-ultramarine) !important;
    font-weight: var(--font-normal);
    margin: 0;
  }
  h5.ant-typography {
    color: var(--dark-2) !important;
    font-size: var(--headline-font-size) !important;
    font-weight: var(--font-normal) !important;
    margin: 0 !important;
  }
  .users_list {
    .ant-space-item:first-child {
      min-height: calc(35vh - 14.4vh);
      max-height: calc(35vh - 14.4vh);
    }
  }
  .users_list,
  .documents_info {
    padding: 0 !important;
  }
  .participant_form,
  .per_assessment_form,
  .post_assessment_form,
  .applicant_form {
    padding: 1.6vh 16.2vw;
    height: 100%;

    .ant-btn-primary {
      width: 100%;
    }
  }
  .selection_form {
    padding: 1.6vh 15.9vw;
  }
`;
const FormWrapper: React.FC<IWrapperProps> = ({
  children,
  className,
  margin,
  color
}) => {
  return (
    <Wrapper style={{ margin }} color={color}>
      <Col style={{ width: '100%' }} className={className}>
        {children}
      </Col>
    </Wrapper>
  );
};

export default FormWrapper;
