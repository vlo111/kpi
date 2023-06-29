import React from 'react';
import { AsnModal } from '../../../../../Forms/Modal';
import { AsnTable } from '../../../../../Forms/Table';
import { AsnButton } from '../../../../../Forms/Button';
import { IFailedApplicantsModal } from '../../../../../../types/api/activity/subActivity';
import { ReactComponent as WarningSvg } from '../icons/warning_triangle_svg.svg';
import styled from 'styled-components';

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: end;
    gap: 1rem;
`;

const FailedApplicantsModal: React.FC<IFailedApplicantsModal> = ({ showFailedModal, setShowFailedModal, failedData }) => {
  const warningsColumns = [
    {
      title: 'Name/Surname',
      key: 'fullName',
      dataIndex: 'fullName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      key: 'phone',
      dataIndex: 'phone'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender'
    }
  ];
  return (
    <AsnModal
      open={showFailedModal}
      footer={false}
      width={'80%'}
      title={<TitleWrapper><WarningSvg/> <div>Insufficient file format</div></TitleWrapper> }
      onCancel={() => setShowFailedModal(false)}
    >
      <AsnTable
        columns={warningsColumns}
        pagination={false}
        dataSource={failedData}
        style={{ overflow: 'auto', maxHeight: '50vh' }}
      />
      <AsnButton
        className="primary"
        style={{ float: 'right', marginTop: '20px' }}
        onClick={() => setShowFailedModal(false)}
      >
        OK
      </AsnButton>
    </AsnModal>
  );
};

export default FailedApplicantsModal;
