import React, { useState } from 'react';
import { Col } from 'antd';

import RejectModal from '../Reject';
import ApproveModal from '../Approve';

import { AsnButton } from '../../../../../Forms/Button';
import { INext } from '../../../../../../types/applicant';

const Next: React.FC<INext> = ({
  applicant,
  sectionDataId,
  isAllowEdit,
  applicantId
}) => {
  const [openApprove, setOpenApprove] = useState<string>('');
  const [openReject, setOpenReject] = useState<string>('');

  return (
    <>
      {isAllowEdit && (
        <Col span={24} className="buttons">
          <AsnButton
            className="reject"
            onClick={() => setOpenReject(sectionDataId)}
            disabled={applicantId !== undefined}
          >
            Reject
          </AsnButton>
          <AsnButton
            className="approve"
            onClick={() => setOpenApprove(sectionDataId)}
            disabled={applicantId !== undefined}
          >
            Approve
          </AsnButton>
        </Col>
      )}
      <ApproveModal
        applicant={applicant}
        open={openApprove}
        onCancel={() => setOpenApprove('')}
      />
      <RejectModal
        applicant={applicant}
        open={openReject}
        onCancel={() => setOpenReject('')}
      />
    </>
  );
};

export default Next;
