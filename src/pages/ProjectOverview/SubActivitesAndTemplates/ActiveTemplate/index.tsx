import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Popconfirm, Card, Col, Row, message, Typography } from "antd";
import styled from "styled-components";

import { PATHS } from "../../../../helpers/constants";
import { ConfirmModal } from "../../../../components/Forms/Modal/Confirm";
import { IActiveTemplate } from "../../../../types/project";
import useDuplicateTemplate from "../../../../api/Activity/Template/useDuplicateTemplate";
import useDeleteActivityTemplate from "../../../../api/Activity/Template/useDeleteActivityTemplate";
import { ReactComponent as TrashSvg } from "../../../../assets/icons/trash.svg";
import { ReactComponent as EditSvg } from "../../../../assets/icons/edit.svg";
import { ReactComponent as Dublicat } from "../../../../assets/icons/duplicate.svg";
import { ReactComponent as Plus } from "../../../../assets/icons/plus.svg";

const { Meta } = Card;
const { Paragraph } = Typography;
const Container = styled.div`
  .card {
    height: 200px;
    width: 200px;
    background: var(--white);
    border-top: 5px solid var(--dark-6);
    box-shadow: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
  }
  .ant-card-extra {
    position: absolute;
    top: 0;
    background-color: var(--dark-2) !important;
    height: 196px;
    width: 100%;
    left: 0;
    border-radius: 20px;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    color: var(--white);
    z-index: 1 !important;
    opacity: 0.9;
  }
  .ant-card-body {
    word-break: break-all;
    display: flex;
    align-items: center !important;
    height: 100%;
    font-size: var(--base-font-size);
    justify-content: center;
  }
  .ant-card-head {
    border-bottom: 0;
  }
  .ant-row {
    row-gap: 16px !important;
    overflow: auto;
  }
  .cardClick {
    position: absolute;
    z-index: 2 !important;
    right: 20px;
    color: var(--dark-1);
  }
  .ant-card-head-title {
    word-wrap: break-word;
    white-space: initial;
  }
  .ant-popover {
    top: 7px !important;
  }
  .ant-popover-inner-content {
    height: 170px;
    .ant-popover-buttons {
      position: absolute;
      top: 10px;
      left: 95px;
      button {
        border: none;
      }
    }
  }
  .ant-popover-message {
    padding: 20px 0 12px;
  }
  .ant-popover-arrow {
    display: none;
  }
  .draft {
    background-color: #d4dde4;
    width: 70px;
    color: #2a5578;
    font-size: 14px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  .ant-typography strong {
    font-weight: 400;
}
  .activeCardTemplate{
    color: #111B23;
  }
  .activeCardTemplateHover{
    color: white
  }
`;
const Popup = styled(Button)`
  display: grid;
  grid-template-columns: 21px auto;
  justify-content: flex-start;
  grid-gap: 11px;
  padding: 0 2px;
  color: var(--dark-2);
  align-items: baseline;
  &:hover {
    color: inherit;
  }
`;

export const ActiveTempalate: React.FC<IActiveTemplate> = ({
  templates,
  refetch,
  setIsOpenCreateActivityModal,
}) => {
  const [show, setShow] = useState<string | boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [templateId, setTemplateId] = useState<string>("");
  const { mutate: deleteActivityTemplate } = useDeleteActivityTemplate({
    onSuccess: () => {
      refetch();
      setOpenDeleteModal(false);
    },
    onError: () => {
      void message.error("Something went wrong", 2);
    },
  });
  const { mutate: duplicateTemplate } = useDuplicateTemplate({
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      void message.error("Something went wrong", 2);
    },
  });

  const navigate = useNavigate();
  const title = (id: string): any => {
    return (
      <Row>
        <Col>
          <Popup type="link">
            <Plus />
            Use
          </Popup>
          <Popup
            type="link"
            onClick={() =>
              navigate(`/${PATHS.ACTIVITYTEMPLATE}`.replace(":id", id))
            }
          >
            <EditSvg />
            Edit
          </Popup>
          <Popup
            type="link"
            onClick={() => {
              setTemplateId(id);
              setOpenDeleteModal(true);
            }}
          >
            <TrashSvg />
            Delete
          </Popup>
          <Popup type="link" onClick={() => duplicateTemplate({ id })}>
            <Dublicat />
            Duplicate
          </Popup>
        </Col>
      </Row>
    );
  };
  return (
    <>
      <Container>
        <Row gutter={[32, 0]} style={{ width: "100%", height: "50vh" }}>
          <Col
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpenCreateActivityModal(true)}
          >
            <Card className=" card">+Add Templates</Card>
          </Col>
          {templates?.map((template) => (
            <Col key={template?.id}>
              <Popconfirm
                overlayClassName="popconFirm"
                title={() => title(template?.id)}
                okText
                cancelText="X"
                placement="bottom"
                icon={false}
                getPopupContainer={(trigger: HTMLElement) => trigger}
              >
                <Button type="link" className="cardClick">
                  ...
                </Button>
              </Popconfirm>
              <Card
                className="card"
                extra={
                  show === template?.id ? (
                    <Paragraph
                      strong
                      ellipsis={{
                        rows: 5,
                      }}
                      className="activeCardTemplateHover"
                    >
                      {template?.description}
                    </Paragraph>
                  ) : null
                }
                onMouseEnter={() => setShow(template?.id)}
                onMouseLeave={() => setShow(false)}
              >
                <Meta
                  description={
                    template?.status === "DRAFT" ? (
                      <div className="draft">DRAFT</div>
                    ) : (
                      ""
                    )
                  }
                />

                <Paragraph
                  strong
                  ellipsis={{
                    rows: 5,
                  }}
                  className="activeCardTemplate"
                >
                  {template?.title}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
        <ConfirmModal
          styles={{ gap: "3rem" }}
          yes="Delete"
          no="Cancel"
          open={openDeleteModal}
          title="Are you sure you want to delete this template?"
          onSubmit={() => deleteActivityTemplate({ id: templateId })}
          onCancel={() => setOpenDeleteModal(false)}
        />
      </Container>
    </>
  );
};
