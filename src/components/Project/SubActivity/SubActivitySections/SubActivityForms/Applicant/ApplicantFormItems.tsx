import React, { ReactElement } from 'react';
import { Col, List, Popover, Row, Switch, Typography } from 'antd';
import styled from 'styled-components';

import { ReactComponent as EditIcon } from '../../../../../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../assets/icons/delete.svg';
import { ReactComponent as MenuIcon } from '../../../../../../assets/icons/md-menu.svg';
import { ReactComponent as LinkIcon } from '../../../SubActivityIcons/link.svg';
import { ReactComponent as PreviewIcon } from '../../../../../../assets/icons/preview.svg';
import { ReactComponent as DuplicateIcon } from '../../../SubActivityIcons/copy.svg';
import updateApplicationStatus from '../../../../../../api/ApplicationForm/updateApplicationStatus';
import { IApplicationFormItem } from '../../../../../../types/api/activity/subActivity';
import duplicateApplicationForm from '../../../../../../api/ApplicationForm/useApplicationFormDuplicate';
import useDeleteApplicationForm from '../../../../../../api/ApplicationForm/useDeleteApplicationForm';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../../../../../helpers/constants';
// import { Onchange } from '../../../../../../types/global';

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
  refetchSingleStatus
}) => {
  const { Title } = Typography;
  const navigate = useNavigate();

  // const [openPopover, setOpenPopover] = useState(false);

  const { mutate: updateApplicationFormStatus } = updateApplicationStatus({
    onSuccess: () => {
      refetchSingleStatus();
    },
    onError: () => {
      console.log('err');
    }
  });

  const { mutate: deleteApplicationFormById } = useDeleteApplicationForm({
    onSuccess: () => {
      refetchSingleStatus();
    },
    onError: () => {
      console.log('err');
    }
  });
  const { mutate: duplicateApplicationFormById } = duplicateApplicationForm({
    onSuccess: () => {
      refetchSingleStatus();
      // setOpenPopover(!openPopover);
    },
    onError: () => {
      console.log('err');
    }
  });

  const content = (id: string): ReactElement => (
    <Row
      style={{
        fontSize: 'var(--font-size-small)',
        color: 'var(--dark-2)',
        cursor: 'pointer'
      }}
      gutter={[8, 8]}
    >
      <Col span={24} onClick={() => navigate(`/${PATHS.APPLICATION.replace(':id', id)}`)}>
        <EditIcon /> Edit
      </Col>
      <Col span={24}>
        <PreviewIcon /> Preview
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
    duplicateApplicationFormById({ id });
  };

  const deleteForm = (id: string): void => {
    deleteApplicationFormById({ id });
  };

  const onChange = (id: string): void => {
    updateApplicationFormStatus({ id });
  };

  // const handleOpenChange: Onchange = (newOpen) => {
  //   setOpenPopover(newOpen);
  // };

  return (
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
                  <Title level={4} copyable={{ text: `${process.env.REACT_APP_BASE_URL_HOST ?? ''}${PATHS.APPLICATION.replace(':id', item.id !== null ? item.id : '')}` }}>
                   <LinkIcon />
                  </Title>
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
                  // onOpenChange={handleOpenChange}
                  // open={openPopover}
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
  );
};
export default ApplicationFormItem;
