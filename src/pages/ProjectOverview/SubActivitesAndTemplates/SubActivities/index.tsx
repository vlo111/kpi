import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Row,
  Space,
  Button,
  Card,
  Col,
  Typography,
  Tooltip,
  Avatar,
  Popover,
  message
} from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import { Void } from '../../../../types/global';
import { ISubActivities, ISubActivitiesProps } from '../../../../types/project';
import { AsnCardSubActivity } from '../../../../components/Forms/Card/SubActivityCard';
import { AsnButton } from '../../../../components/Forms/Button';
import { AssingnesFilter } from '../Filter/Assigned';
import { DateFilterCards } from '../Filter/DataPicker';
import { StatusFilter } from '../Filter/Status';
import AddSubActivity from '../AddActivity';
import EditSubCourse from '../../../../components/Project/SubActivity/SubActivityModals/Edit';
import AsnAvatar from '../../../../components/Forms/Avatar';
import { ConfirmModal } from '../../../../components/Forms/Modal/Confirm';
import useDeleteSubActivity from '../../../../api/Activity/SubActivity/useDeleteSubActivity';

import { AssignedUserType } from '../../../../types/api/activity/subActivity';
import { ReactComponent as PointSvg } from '../../../../assets/icons/point.svg';
import { ReactComponent as EditSvg } from '../../../../assets/icons/edit.svg';
import { ReactComponent as DeleteSvg } from '../../../../assets/icons/delete.svg';
import { ReactComponent as CloseSvg } from '../../../../assets/icons/closeIcon.svg';
import { ReactComponent as Calendar } from '../../../../assets/icons/calendar.svg';
import { ReactComponent as Location } from '../../../../assets/icons/location.svg';

const Container = styled.div`
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    border: none;
  }
  .ant-card-bordered {
    border: none;
  }
  .subCardTemplater {
    color: #111b23;
    margin-bottom: 0;
  }
  .ant-typography strong {
    font-weight: 400;
  }
  .point{
    cursor: pointer;
    position: absolute;
    right: 5px;
    width: 20px;
    top: 5px
  }
  .tooltip_title{
    margin-bottom: 0;
  }
  .ant-popover {
    width: 100%;
    top: 15px !important;
  }
  .ant-popover-content {
    margin: 0px 10px;
  }
  .ant-popover-placement-bottom {
    padding-top: 0;
  }
  .ant-popover-arrow {
    display: none;
  }
  svg{
    cursor: pointer;
  }
`;
const { Paragraph } = Typography;

export const SubActivity: React.FC<ISubActivitiesProps> = ({
  subActivities,
  setCheckAll,
  setIndeterminate,
  setCheckedList,
  checkAll,
  indeterminate,
  checkedList,
  setDateSearch,
  dateSearch,
  templates,
  inputActivityId,
  setAssignedUsersIds,
  selectedRowId,
  setSelectedRowId,
  refetchSubActivities
}) => {
  const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] =
    useState<boolean>(false);
  const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

  const [openPopover, setOpenPopover] = useState({
    show: false,
    id: ''
  });

  const [openCreateSubActivity, setOpenCreateSubActivity] = useState<boolean>(false);
  const [subActivityId, setSubActivityId] = useState('');
  const [courseId, setCourseId] = useState('');

  const { mutate: deleteCourse } = useDeleteSubActivity(
    {
      onSuccess: () => {
        refetchSubActivities();
      },
      onError: ({ response: { data: { message: errorMessage } } }: { response: { data: { message: string } } }) => {
        void message.error(errorMessage, 2);
      }
    }
  );

  const { id } = useParams();

  const resetFilter: Void = () => {
    setDateSearch({
      start: true,
      from: '',
      to: ''
    });
    setCheckedList([]);
    setAssignedUsersIds([]);
    setSelectedRowId([]);
  };

  const navigate = useNavigate();

  const handleOpenChange = (open: boolean, id: string): void => {
    setOpenPopover({
      show: open,
      id
    });
  };

  const handleEdit = (subActivityId: string): void => {
    setSubActivityId(subActivityId);
    setOpenCreateSubActivity(true);
    handleOpenChange(false, '');
  };

  const handleDeleteCourse = (id: string): void => {
    setCourseId(id);
    setOpenConfirmModal(true);
    handleOpenChange(false, '');
  };

  const content = (subActivityId: string, id: string): React.ReactElement => {
    return (
      <>
        <Row
          style={{ marginBottom: '10px' }}
          justify='end'
          onClick={() => handleOpenChange(false, '')}
        >
          <CloseSvg style={{ float: 'right' }} />
        </Row>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Row align={'middle'} style={{ cursor: 'pointer' }} onClick={() => handleEdit(subActivityId)}>
            <EditSvg style={{ marginRight: '10px' }} />
            <Paragraph className='tooltip_title'>Edit</Paragraph>
          </Row>
          <Row align={'middle'} style={{ cursor: 'pointer' }} onClick={() => handleDeleteCourse(id)}>
            <DeleteSvg style={{ marginRight: '10px' }} />
            <Paragraph className='tooltip_title'>Delete</Paragraph>
          </Row>
        </Space>
      </>
    );
  };

  return (
    <>
      <Container>
        <Space align="baseline">
          <StatusFilter
            setCheckAll={setCheckAll}
            setIndeterminate={setIndeterminate}
            setCheckedList={setCheckedList}
            checkAll={checkAll}
            indeterminate={indeterminate}
            checkedList={checkedList}
          />
          <AssingnesFilter
            inputActivityId={inputActivityId}
            setAssignedUsersIds={setAssignedUsersIds}
            selectedRowId={selectedRowId}
            setSelectedRowId={setSelectedRowId}
          />
          <DateFilterCards
            setDateSearch={setDateSearch}
            dateSearch={dateSearch}
          />
          <AsnButton
            type="link"
            onClick={resetFilter}
            style={{
              fontSize: 'var(--font-size-small',
              color: 'var(--dark-1)'
            }}
          >
            Reset
          </AsnButton>
        </Space>
        <Space align="baseline"></Space>
        <Row>
          <AsnCardSubActivity>
            <Row
              gutter={24}
              style={{
                gridGap: '41px',
                padding: '16px 0px',
                overflow: 'auto',
                height: 'calc(49vh)'
              }}
            >
              <Button
                type="link"
                block
                style={{
                  color: 'var(--dark-1)',
                  fontSize: 'var(--base-font-size)'
                }}
                onClick={() => setIsOpenCreateActivityModal(true)}
              >
                + Add Sub Activity
              </Button>
              {subActivities?.map((item: ISubActivities, i: number) => (
                <Popover
                  content={() => content(item?.subActivityId, item?.id)}
                  placement="bottom"
                  trigger="click"
                  key={item?.id}
                  getPopupContainer={(trigger: HTMLElement) => trigger}
                  open={!!openPopover.show && openPopover.id === item?.id}
                  onOpenChange={(open) => handleOpenChange(open, item?.id)}
                >
                  <Card
                    key={i}
                    className={`card ${item?.status === 'INACTIVE'
                        ? 'cardInactive'
                        : item?.status === 'DONE'
                          ? 'cardActive'
                          : 'carDone'
                      }`}
                  >
                    <div
                      className={`cardRound ${item?.status === 'INACTIVE'
                          ? 'cardRoundInactive'
                          : item?.status === 'DONE'
                            ? 'cardDone'
                            : ''
                        }`}
                    >
                      {item?.cardRound}
                    </div>
                    <PointSvg className='point' />
                    <Row
                      gutter={[8, 11]}
                      style={{ padding: '15px 0', cursor: 'pointer' }}
                      onClick={() => {
                        navigate(`/project/sub-activity/${item?.subActivityId}`);
                      }
                      }
                    >
                      <Col
                        style={{
                          color: 'var(--dark-1)',
                          fontSize: 'var(--headline-font-size)',
                          width: '160px',
                          lineHeight: '25px',
                          height: '45px'
                        }}
                      >
                        <Tooltip title={item?.title}>
                          <Paragraph
                            strong
                            ellipsis={{
                              rows: 2
                            }}
                            className="subCardTemplater"
                          >
                            {item?.title}
                          </Paragraph>
                        </Tooltip>
                      </Col>
                      <Col style={{ display: 'flex', gap: '3px' }}>
                        <Location /> {item?.subActivity?.region?.title}
                      </Col>
                      <Col
                        style={{ display: 'flex', gap: '1px', fontSize: '12px' }}
                      >
                        <Calendar />
                        {moment(item?.startDate).format('DD/MM/YY')} -{' '}
                        {moment(item?.endDate).format('DD/MM/YY')}
                      </Col>
                      <Space size={[10, 0]} align="start" direction="vertical">
                        <Col>
                          <Tooltip title={item?.subActivity?.sector?.title}>
                            <Paragraph
                              strong
                              ellipsis={{
                                rows: 2
                              }}
                              className="subCardTemplater"
                            >
                              {item?.subActivity?.sector?.title}
                            </Paragraph>
                          </Tooltip>
                        </Col>
                        <Col span={24}>
                          <Avatar.Group maxCount={2}>
                            {item?.subActivity?.assignees.map(
                              (i: AssignedUserType) => {
                                return (
                                  <Tooltip
                                    key={i?.id}
                                    placement="top"
                                    title={`${i?.firstName} ${i?.lastName}`}
                                  >
                                    <AsnAvatar
                                      letter={`${i?.firstName?.charAt(
                                        0
                                      )}${i?.lastName?.charAt(0)}`}
                                      src={i.photo}
                                    />
                                  </Tooltip>
                                );
                              }
                            )}
                          </Avatar.Group>
                        </Col>
                      </Space>
                    </Row>
                  </Card>
                </Popover>
              ))}
            </Row>
          </AsnCardSubActivity>
        </Row>
      </Container>
      {isOpenCreateActivityModal && (
        <AddSubActivity
          setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
          isOpenCreateActivityModal={isOpenCreateActivityModal}
          templates={templates}
        />
      )}
      {openCreateSubActivity &&
        <EditSubCourse
          setOpenCreateSubActivity={setOpenCreateSubActivity}
          openCreateSubActivity={openCreateSubActivity}
          projectId={id as string}
          InputActivityId={subActivityId}
          refetch={refetchSubActivities}
        />
      }
      <ConfirmModal
       styles={{ gap: '6rem' }}
       yes="Delete"
       no="Cancel"
       open={openConfirmModal}
       title="Are you sure you want to delete the course?"
       onSubmit={() => deleteCourse({ id: courseId })}
       onCancel={() => setOpenConfirmModal(false)}
       />
    </>
  );
};
