import React, { ReactElement } from 'react';
import { Col, List, Popover, Row, Switch, Typography, message } from 'antd';
import styled from 'styled-components';

import { ReactComponent as DeleteIcon } from '../../../../../../assets/icons/delete.svg';
import { ReactComponent as MenuIcon } from '../../../../../../assets/icons/md-menu.svg';
import { ReactComponent as EditIcon } from '../../../../../../assets/icons/edit.svg';
import { ReactComponent as LinkIcon } from '../../../SubActivityIcons/link.svg';
import { ReactComponent as DuplicateIcon } from '../../../SubActivityIcons/copy.svg';
import updateApplicationStatus from '../../../../../../api/ApplicationForm/updateApplicationStatus';
import { IApplicationFormItem } from '../../../../../../types/api/activity/subActivity';
import duplicateApplicationForm from '../../../../../../api/ApplicationForm/useApplicationFormDuplicate';
import useDeleteApplicationForm from '../../../../../../api/ApplicationForm/useDeleteApplicationForm';
import changeStatusAssessmentFormDataById from '../../../../../../api/AssessmentForm/useChangeStatusAssessmentFormById';
import useDeleteAssessmentFormDataById from '../../../../../../api/AssessmentForm/useDeleteAssessmentFormById';
import useDuplicateAssessmentFormDataById from '../../../../../../api/AssessmentForm/useDuplicateAssessmentFormById';
import { PATHS } from '../../../../../../helpers/constants';
import { useNavigate, useParams } from 'react-router';
import { AsnButton } from '../../../../../Forms/Button';
import { useProject } from '../../../../../../hooks/useProject';

const StyledItems = styled(List)`
  .ant-list-item {
    border: none;
    box-shadow: 4px 4px 4px rgba(42, 85, 120, 0.05),
      -4px -4px 4px rgba(42, 85, 120, 0.05);
    border-radius: 20px;
    display: flex;
    align-items: center;
    margin-top: 3.6vh;
    margin-bottom: 3.6vh;
  }
  .ant-switch-checked {
    background-color: var(--secondary-green);
  }
`;

const ApplicationFormItem: React.FC<IApplicationFormItem> = ({
  form,
  refetchSingleStatus,
  formType,
  createAssessmentForm,
  navigateRouteInfo,
  courseId
}) => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const { projectId } = useProject();
  const { id: SubActivityId } = useParams<{ id: string | undefined }>();

  const { mutate: updateApplicationFormStatus } = updateApplicationStatus({
    onSuccess: () => {
      refetchSingleStatus();
    },
    onError: (e: { response: { data: { message: string } } }) => {
      void message.error(e.response.data.message);
    }
  });
  const { mutate: deleteApplicationFormById } = useDeleteApplicationForm({
    onSuccess: () => {
      refetchSingleStatus();
    },
    onError: (error: {
      response: {
        data: {
          message: string
        }
      }
    }) => {
      void message.error(error.response.data.message, 2);
    }
  });
  const { mutate: duplicateApplicationFormById } = duplicateApplicationForm({
    onSuccess: () => {
      refetchSingleStatus();
    },
    onError: () => {
      console.log('err');
    }
  });

  const { mutate: changeAssessmentFormStatus } =
    changeStatusAssessmentFormDataById({
      onSuccess: () => {
        refetchSingleStatus();
      },
      onError: (e: { response: { data: { message: string } } }) => {
        void message.error(e.response.data.message);
      }
    });

  const { mutate: deleteAssessmentFormById } = useDeleteAssessmentFormDataById({
    onSuccess: () => {
      refetchSingleStatus();
    },
    onError: (error: {
      response: {
        data: {
          message: string
        }
      }
    }) => {
      void message.error(error.response.data.message, 2);
    }
  });

  const { mutate: duplicateAssessmentFormById } =
    useDuplicateAssessmentFormDataById({
      onSuccess: () => {
        refetchSingleStatus();
      }
    });

  const redirectAssessment = (id: string): void => {
    if (formType === 'APPLICATION') {
      navigate(`/${PATHS.APPLICATIONFORM.replace(':id', id)}`, {
        state: { edit: true, SubActivityId }
      });
    } else {
      navigate(`/${PATHS.ASSESSMENTFORMCREATE.replace(':id', courseId)}`, {
        state: {
          preview: true,
          footerButtons: { id },
          type: formType,
          navigateRouteInfo: { ...navigateRouteInfo, projectId },
          edit: true
        }
      });
    }
  };

  const content = (id: string): ReactElement => (
    <Row
      style={{
        fontSize: 'var(--font-size-small)',
        color: 'var(--dark-2)',
        cursor: 'pointer'
      }}
      gutter={[8, 8]}
    >
      <Col span={24} onClick={() => redirectAssessment(id)}>
        <EditIcon /> Edit
      </Col>
      <Col span={24} onClick={() => duplicate(id)}>
        <DuplicateIcon /> Duplicate
      </Col>
      <Col span={24} onClick={() => deleteForm(id)}>
        <DeleteIcon /> Delete
      </Col>
    </Row>
  );

  const duplicate = (id: string): void => {
    if (formType === 'APPLICATION') {
      duplicateApplicationFormById({ id });
    } else {
      duplicateAssessmentFormById({ id });
    }
  };

  const deleteForm = (id: string): void => {
    if (formType === 'APPLICATION') {
      deleteApplicationFormById({ id });
    } else {
      deleteAssessmentFormById({ id });
    }
  };

  const onChange = (id: string): void => {
    if (formType === 'APPLICATION') {
      updateApplicationFormStatus({ id });
    } else {
      changeAssessmentFormStatus({ id });
    }
  };

  const renderButtonsText = (param: string): any => {
    switch (param) {
      case 'APPLICATION':
        return 'Publish Application form';
      case 'PRE_ASSESSMENT':
        return 'Publish Pre-assessment form';
      case 'POST_ASSESSMENT':
        return 'Publish Post-assessment form';
      default:
        return 'Publish Application form';
    }
  };

  const createLick = (id: string): string => {
    if (formType === 'APPLICATION') {
      return `${
        process.env.REACT_APP_BASE_URL_HOST ?? ''
      }${PATHS.APPLYAPPLICANTFORM.replace(':id', id !== null ? id : '')}`;
    } else {
      return `${process.env.REACT_APP_BASE_URL_HOST ?? ''}${
        PATHS.ASSESSMENTFORM
      }?id=${id !== null ? id : ''}`;
    }
  };

  return (
    <>
      <Row justify="center" style={{ width: '100%' }}>
        <AsnButton
          className="primary"
          type="primary"
          onClick={() => {
            createAssessmentForm(formType);
          }}
        >
          {renderButtonsText(formType)}
        </AsnButton>
      </Row>
      <StyledItems
        dataSource={form}
        renderItem={(item: any) => (
          <List.Item>
            <Row align="middle" style={{ width: '100%' }}>
              <Col span={16} xl={16} xxl={14}>
                <Row justify="end" align="middle" style={{ width: '100%' }}>
                  <Title level={5}>{item.title}</Title>
                </Row>
              </Col>
              <Col span={8} xl={8} xxl={10}>
                <Row
                  justify="end"
                  align="middle"
                  style={{ width: '100%', paddingRight: '1vw' }}
                  gutter={[10, 10]}
                >
                  <Col>
                    <Title
                      level={4}
                      copyable={{
                        icon: [
                          <LinkIcon key="copy-icon" />,
                          <LinkIcon key="copied-icon" />
                        ],
                        text: createLick(item.id)
                      }}
                    />
                  </Col>
                  <Col>
                    <Switch
                      defaultChecked={item?.active}
                      checked={item?.active}
                      disabled={item?.active}
                      onChange={() => onChange(item.id)}
                    />
                  </Col>
                  <Popover
                    placement="bottomRight"
                    content={() => content(item.id)}
                    trigger="click"
                    overlayClassName="menuPopover"
                  >
                    <Col style={{ cursor: 'pointer' }}>
                      <Row align="middle">
                        <MenuIcon />
                      </Row>
                    </Col>
                  </Popover>
                </Row>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  );
};
export default ApplicationFormItem;
