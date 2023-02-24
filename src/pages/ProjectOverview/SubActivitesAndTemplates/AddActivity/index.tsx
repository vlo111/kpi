import React, { useState } from "react";
import { Card, Row, Col } from "antd";
import styled from "styled-components";

import { AddManagerHandle, IAddActivity } from "../../../../types/project";
import { AsnModal } from "../../../../components/Forms/Modal";
// import CreateSubActivityModal from '../../../../components/Project/SubActivity/SubActivityModals/CreateModal';
import CreateSubCourse from "../../../../components/Project/SubActivity/SubActivityModals/Create";

const SubModal = styled(AsnModal)`
  padding: 4.3vh 1.3vw 4.5vh 2.3vh !important;
  background: var(--white);
  border-radius: 20px;
  top: 30vh;

  .ant-modal-body {
    max-height: 43vh;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-right: 1.8vw;
    word-break: break-all;
  }
  .ant-modal-close {
    top: -25px;
    right: -14px;
  }
  .ant-modal-content {
    box-shadow: none !important;
    position: inherit !important;
    padding: 0;
  }
  .ant-modal-title {
    font-size: var(--headline-font-size);
  }
  .ant-card-head {
    border-bottom: 0;
  }
  .cardActive {
    border-top: 2px solid var(--dark-5);
    width: 140px;
    height: 140px;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
  }
  .ant-card-body {
    color: var(--dark-1);
    font-size: var(--font-size-small);
    height: 138px;
    display: flex;
    align-items: center;
  }
`;

const AddSubActivity: React.FC<IAddActivity> = ({
  isOpenCreateActivityModal,
  setIsOpenCreateActivityModal,
  templates,
}) => {
  const [openCreateSubActivity, setOpenCreateSubActivity] =
    useState<boolean>(false);
  const [templateId, setTemplateId] = useState<string>("");
  const handleCancel: AddManagerHandle = () => {
    setIsOpenCreateActivityModal(false);
  };

  return (
    <>
      <SubModal
        footer={false}
        open={isOpenCreateActivityModal}
        title="Active Templates "
        onCancel={handleCancel}
      >
        <Row gutter={[64, 20]} style={{ width: "100%", cursor: "pointer" }}>
          {templates?.map((template, i) => (
            <>
              {template?.status !== "DRAFT" ? (
                <Col
                  key={i}
                  span={8}
                  onClick={() => {
                    setTemplateId(template?.id);
                    setOpenCreateSubActivity(true);
                  }}
                >
                  <Card className="cardActive">
                    {template?.title}/{template?.courseStructure}
                  </Card>
                </Col>
              ) : null}
            </>
          ))}
        </Row>
      </SubModal>
      {/* {(Boolean(openCreateSubActivity)) &&
        <CreateSubActivityModal
          openCreateSubActivity={openCreateSubActivity}
          setOpenCreateSubActivity={setOpenCreateSubActivity}
          templateId={templateId}
        />
      } */}
      {Boolean(openCreateSubActivity) && (
        <CreateSubCourse
          openCreateSubActivity={openCreateSubActivity}
          setOpenCreateSubActivity={setOpenCreateSubActivity}
          templateId={templateId}
        />
      )}
    </>
  );
};

export default AddSubActivity;
