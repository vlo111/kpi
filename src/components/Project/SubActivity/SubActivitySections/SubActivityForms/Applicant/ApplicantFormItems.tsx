import React, { ReactElement, useState } from 'react';
import { Col, List, Popover, Row, Switch, Typography } from 'antd';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as EditIcon } from '../../../../../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../../../../assets/icons/delete.svg';
import { ReactComponent as MenuIcon } from '../../../../../../assets/icons/md-menu.svg';
import { ReactComponent as LinkIcon } from '../../../../../../assets/icons/link.svg';
import { ReactComponent as PreviewIcon } from '../../../../../../assets/icons/preview.svg';
import { ReactComponent as DuplicateIcon } from '../../../../../../assets/icons/copy.svg';

const StyledItems = styled(List)`
  .ant-list-item {
    border: none;
    box-shadow: 4px 4px 4px rgba(42, 85, 120, 0.05),
      -4px -4px 4px rgba(42, 85, 120, 0.05);
    border-radius: 20px;
    display: flex;
    align-items: center;
    margin-top: 3.6vh;
  }
  .ant-switch-checked {
    background-color: var(--secondary-green);
  }
`;

const ApplicationFormItem: React.FC = () => {
  const { Title } = Typography;
  const [items, setItems] = useState<Array<{ id: string, name: string }>>([
    {
      id: uuidv4(),
      name: 'Application form'
    }
  ]);
  console.log(items);

  const handleItemDuplicate = (id: string): void => {
    const newList = items.map((item) => {
      if (item.id === id) {
        return {
          id: uuidv4(),
          name: item.name
        };
      } else {
        return item;
      }
    });
    setItems(items.concat(newList));
  };

  const handleDelete = (itemId: string): void => {
    const newList = items.filter((item) => item.id !== itemId);
    setItems(newList);
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
      <Col span={24}>
        <EditIcon /> Edit
      </Col>
      <Col span={24}>
        <PreviewIcon /> Preview
      </Col>
      <Col span={24} onClick={() => handleItemDuplicate(id)}>
        <DuplicateIcon /> Duplicate
      </Col>
      <Col span={24} onClick={() => handleDelete(id)}>
        <DeleteIcon /> Delete
      </Col>
    </Row>
  );

  return (
    <StyledItems
      dataSource={items}
      renderItem={(item: any) => (
        <List.Item>
          <Row align="middle" style={{ width: '100%' }}>
            <Col span={16} xl={16} xxl={14}>
              <Row justify="end" align="middle" style={{ width: '100%' }}>
                <Title level={5}>{item.name}</Title>
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
                  <Switch defaultChecked />
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
