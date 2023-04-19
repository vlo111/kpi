import React, { useState } from 'react';

import RejectModal from '../Reject';
import ApproveModal from '../Approve';

import { AsnButton } from '../../../../../../../Forms/Button';
import { INext } from '../../../../../../../../types/applicant';
import { AsnCol } from '../../../../../../../Forms/Col';

const Next: React.FC<INext> = ({
  applicant,
  sectionDataId,
  isAllowEdit
}) => {
  const [openApprove, setOpenApprove] = useState<string>('');
  const [openReject, setOpenReject] = useState<string>('');

  return (
    <>
      {isAllowEdit && (
        <AsnCol span={24} className="next">
          <AsnButton
            className="reject"
            onClick={() => setOpenReject(sectionDataId)}
            disabled={applicant?.id === undefined}
          >
            Reject
          </AsnButton>
          <AsnButton
            className="approve"
            onClick={() => setOpenApprove(sectionDataId)}
            disabled={applicant?.id === undefined}
          >
            Approve
          </AsnButton>
        </AsnCol>
      )}
      <ApproveModal
        applicants={[applicant]}
        open={openApprove}
        onCancel={() => setOpenApprove('')}
      />
      <RejectModal
        applicants={[applicant]}
        open={openReject}
        onCancel={() => setOpenReject('')}
      />
    </>
  );
};

export default Next;
