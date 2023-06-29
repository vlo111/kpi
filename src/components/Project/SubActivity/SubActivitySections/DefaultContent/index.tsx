import React, { useState } from 'react';
import { Col, Space, Typography } from 'antd';

// import SubActivityDocuments from '../DocumentsContent';
import GeneralDocuments from '../Files/GeneralDocuments';
import RequiredDocuments from '../Files/RequiredDocument';
import SubActivityUsersInfo from '../UsersInfo';
import { ReactComponent as PeopleSvg } from '../../../../../assets/icons/people.svg';
import { ReactComponent as FileSvg } from '../../../../../components/Project/SubActivity/SubActivityIcons/upload-docs.svg';

import SubActivityUsersFullInfo from '../ApplicantFullInfo';
import styled from 'styled-components';

const { Text } = Typography;

const AnsSpace = styled(Space.Compact)`
    align-items: center;
    background: var(--white);
    box-shadow: var(--base-box-shadow);
    border-radius: 6px;
    padding: 16px;
    width: 15vw;
    font-size: var(--base-font-size);
    gap: 16px;
    min-width: max-content;
    cursor: pointer;
`;

const DefaultContent: React.FC<any> = ({
  assignedUsers,
  status,
  requIredDocs,
  color,
  applicants,
  courseId,
  navigateRouteInfo,
  files,
  setOffset,
  offset,
  applicantCounts,
  isLoading,
  setSearch,
  search,
  sectionsCount,
  tabIndex
}) => {
  const [openUsersModal, setOpenUsersModal] = useState<boolean>(false);
  const [openGeneralDocs, setOpenGeneralDocs] = useState<boolean>(false);
  const [openRequiredDocs, setOpenRequiredDocs] = useState<boolean>(false);

  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 32]}>
        {status !== 'INACTIVE' && <Space direction="horizontal" size={16}>
          <AnsSpace direction="vertical" onClick={() => setOpenUsersModal(true)} >
            <PeopleSvg />
            <Text>Assigned People</Text>
          </AnsSpace>
          <AnsSpace direction="vertical" onClick={() => setOpenGeneralDocs(true)} >
            <FileSvg />
            <Text>General documents</Text>
          </AnsSpace>
          <AnsSpace direction="vertical" onClick={() => setOpenRequiredDocs(true)}>
            <FileSvg />
            <Text>Required documents</Text>
          </AnsSpace>
        </Space>}
        <Col>
          {(status === 'ACTIVE' || status === 'DONE' || applicants?.length > 0) && <SubActivityUsersFullInfo
            setOffset={setOffset}
            navigateRouteInfo={navigateRouteInfo}
            status={status}
            color={color}
            applicants={applicants}
            courseId={courseId}
            offset={offset}
            applicantCounts={applicantCounts}
            isLoading={isLoading}
            setSearch={setSearch}
            search={search}
            sectionsCount={sectionsCount}
            tabIndex={tabIndex}
          />}
        </Col>
      </Space >
      <SubActivityUsersInfo
        assignedUsers={assignedUsers}
        openUsersModal={openUsersModal}
        setOpenUsersModal={setOpenUsersModal}
      />
      <GeneralDocuments
        generalFiles={files?.filter((file: { type: string }) => file.type === 'GENERAL_DOCUMENT')}
        courseId={courseId}
        openGeneralDocs={openGeneralDocs}
        setOpenGeneralDocs={setOpenGeneralDocs}
      />
      <RequiredDocuments
        requIredDocs={requIredDocs}
        requiredFiles={files?.filter((file: { type: string }) => file.type === 'REQUIRED_DOCUMENT')}
        setOpenRequiredDocs={setOpenRequiredDocs}
        openRequiredDocs={openRequiredDocs}
        courseId={courseId}
      />
    </>
  );
};

export default DefaultContent;
