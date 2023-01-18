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

const ApplicationFormItem: React.FC<IApplicationFormItem> = ({ form, refetchSingleStatus }) => {
  const { Title } = Typography;

  const { mutate: updateApplicationFormStatus } = updateApplicationStatus({
    onSuccess: () => {
      console.log('ekav');
      refetchSingleStatus();
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
      <Col span={24}>
        <EditIcon /> Edit
      </Col>
      <Col span={24}>
        <PreviewIcon /> Preview
      </Col>
      <Col span={24}>
        <DuplicateIcon /> Duplicate
      </Col>
      <Col span={24}>
        <DeleteIcon /> Delete
      </Col>
    </Row>
  );

  const onChange = (id: string): void => {
    updateApplicationFormStatus({ id });
  };

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
                  <LinkIcon />
                </Col>
                <Col>
                  <Switch defaultChecked={item.active} onChange={() => { onChange(item.id); }}/>
                </Col>
                <Popover
                  placement="bottomRight"
                  content={() => content(item.id)}
                  trigger="click"
                  overlayClassName="menuPopover"
                >
                  <Col>
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
