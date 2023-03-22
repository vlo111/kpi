import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button, Popover, Card, Col, Row, message, Typography } from 'antd';
import styled from 'styled-components';

// import { PATHS } from '../../../../helpers/constants';
import { ConfirmModal } from '../../../../components/Forms/Modal/Confirm';
import CreateTemplate from '../../../../components/CreateTemplateModal';
import { IActiveTemplate, IOutletContext } from '../../../../types/project';
import useDuplicateTemplate from '../../../../api/Activity/Template/useDuplicateTemplate';
import useDeleteActivityTemplate from '../../../../api/Activity/Template/useDeleteActivityTemplate';
import { ReactComponent as TrashSvg } from '../../../../assets/icons/trash.svg';
import { ReactComponent as EditSvg } from '../../../../assets/icons/edit.svg';
import { ReactComponent as Dublicat } from '../../../../assets/icons/duplicate.svg';
import { ReactComponent as Plus } from '../../../../assets/icons/plus.svg';
import CreateSubCourse from '../../../../components/Project/SubActivity/SubActivityModals/Create';

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
  .ant-card-head-title {
    word-wrap: break-word;
    white-space: initial;
  }
  .ant-popover {
    top: 7px !important;
  }
  .ant-popover-inner-content {
    display: none;
    .ant-popover-buttons {
      position: absolute;
      top: 10px;
      left: 95px;
      button {
        border: none;
      }
    }
  }
  .ant-popover-title {
    padding: 15px 26px 4px !important;
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
  .activeCardTemplate {
    color: #111b23;
  }
  .activeCardTemplateHover {
    color: white;
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
  resultAreaOrder,
  inputActivityId,
  activityTitle,
  resultAreaTitle,
  setActiveTemplate
}) => {
  const [show, setShow] = useState<string | boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [templateId, setTemplateId] = useState<string>('');
  const [openCreateSubActivity, setOpenCreateSubActivity] = useState<boolean>(false);
  const [editTemplate, setEditTemplate] = useState<boolean>(false);

  const { setProjectOverview } = useOutletContext<IOutletContext>();

  const { mutate: deleteActivityTemplate } = useDeleteActivityTemplate({
    onSuccess: () => {
      refetch();
      setOpenDeleteModal(false);
    },
    onError: () => {
      void message.error('Something went wrong', 2);
    }
  });
  const { mutate: duplicateTemplate } = useDuplicateTemplate({
    onSuccess: () => {
      refetch();
    },
    onError: () => {
      void message.error('Something went wrong', 2);
    }
  });
  // const navigate = useNavigate();

  const title = (id: string, template: any): any => {
    return (
      <Row>
        <Col>
          {template?.status !== 'DRAFT' && (
            <Popup
              type="link"
              onClick={() => {
                setTemplateId(id);
                setOpenCreateSubActivity(true);
                hide();
              }}
            >
              <Plus />
              Use
            </Popup>
          )}
          {template?.used === false && (
            <Popup
              type="link"
              onClick={() => {
                // navigate(`/${PATHS.ACTIVITYTEMPLATE}`.replace(':id', id));
                setTemplateId(id);
                setEditTemplate(true);
                setProjectOverview({
                  areaOrder: resultAreaOrder,
                  activityId: inputActivityId,
                  resultAreaTitle,
                  activityTitle,
                  templateTab: '2'
                });
              }
              }
            >
              <EditSvg />
              Edit
            </Popup>
          )}
          {template?.used === false && (
            <Popup
              type="link"
              onClick={() => {
                setTemplateId(id);
                setOpenDeleteModal(true);
                hide();
              }}
            >
              <TrashSvg />
              Delete
            </Popup>
          )}
          <Popup
            type="link"
            onClick={() => {
              duplicateTemplate({ id });
              hide();
              setActiveTemplate('2');
            }}
          >
            <Dublicat />
            Duplicate
          </Popup>
        </Col>
      </Row>
    );
  };
  const [openPopOver, setOpenPopOver] = useState<{ id: string, show: boolean }>(
    {
      id: '',
      show: false
    }
  );
  const hide = (): void => {
    setOpenPopOver({
      show: false,
      id: ''
    });
  };

  const handleOpenChange = (newOpen: boolean, fileId: string): void => {
    setOpenPopOver({
      show: newOpen,
      id: fileId
    });
  };

  const addTemplates = (): void => {
    setProjectOverview({
      areaOrder: resultAreaOrder,
      activityId: inputActivityId,
      resultAreaTitle,
      activityTitle,
      templateTab: '2'
    });
    setIsOpenCreateActivityModal(true);
  };

  return (
    <>
      <Container>
        <Row gutter={[32, 0]} style={{ width: '100%', height: '50vh' }}>
          <Col
            style={{ cursor: 'pointer' }}
            onClick={() => addTemplates()}
          >
            <Card className="card">+Add Templates</Card>
          </Col>
          {templates?.map((template) => (
            <Col key={template?.id}>
              <Popover
                title={() => title(template?.id, template)}
                placement="bottom"
                trigger="click"
                getPopupContainer={(trigger: HTMLElement) => trigger}
                open={!!openPopOver.show && openPopOver.id === template?.id}
                onOpenChange={(newOpen) =>
                  handleOpenChange(newOpen, template?.id)
                }
              >
                <Card
                  className="card"
                  extra={
                    show === template?.id
                      ? (
                      <Paragraph
                        strong
                        ellipsis={{
                          rows: 5
                        }}
                        className="activeCardTemplateHover"
                      >
                        {template?.description}
                      </Paragraph>
                        )
                      : null
                  }
                  onMouseEnter={() => setShow(template?.id)}
                  onMouseLeave={() => setShow(false)}
                >
                  <Meta
                    description={
                      template?.status === 'DRAFT'
                        ? (
                        <div className="draft">DRAFT</div>
                          )
                        : (
                            ''
                          )
                    }
                  />

                  <Paragraph
                    strong
                    ellipsis={{
                      rows: 5
                    }}
                    className="activeCardTemplate"
                  >
                    {template?.title}
                  </Paragraph>
                </Card>
              </Popover>
            </Col>
          ))}
        </Row>
        <ConfirmModal
          styles={{ gap: '3rem' }}
          yes="Delete"
          no="Cancel"
          open={openDeleteModal}
          title="Are you sure you want to delete this template?"
          onSubmit={() => deleteActivityTemplate({ id: templateId })}
          onCancel={() => setOpenDeleteModal(false)}
        />
      </Container>
      {Boolean(openCreateSubActivity) && (
        <CreateSubCourse
          openCreateSubActivity={openCreateSubActivity}
          setOpenCreateSubActivity={setOpenCreateSubActivity}
          templateId={templateId}
        />
      )}
      {editTemplate && <CreateTemplate
       isOpenCreateActivityModal={editTemplate}
       setIsOpenCreateActivityModal={setEditTemplate}
       edit={true}
       templateId={templateId}
        />}
    </>
  );
};
