import React from 'react';
import { Button, Popconfirm, Card, Col, Row } from 'antd';
import styled from 'styled-components';

import { ReactComponent as Eye } from '../../../../assets/icons/eye.svg';
import { ReactComponent as TrashSvg } from '../../../../assets/icons/trash.svg';
import { ReactComponent as EditSvg } from '../../../../assets/icons/edit.svg';
import { ReactComponent as Dublicat } from '../../../../assets/icons/duplicate.svg';
import { ReactComponent as Plus } from '../../../../assets/icons/plus.svg';
// import { AddManagerHandle } from '../../../../../../types/project';

const Container = styled.div`
.card {
  height: 200px;
  width: 200px;
  background: var(--white);
  border-top: 5px solid #EDF0F4;
  box-shadow: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
}
.ant-card-body {
  padding: 0 45px;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: var(--base-font-size);
  text-align: center;

}
.ant-card-head {
  border-bottom: 0;
}
.ant-row {
  row-gap: 16px !important;
  height: 52vh;
  overflow: auto;
}
.cardClick {
  position: absolute;
  z-index: 1;
  right: 20px;
  color: var(--dark-1);
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

export const ActiveTempalate: React.FC = () => {
  // const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] = useState<boolean>(false);

  // const handleOpen: AddManagerHandle = () => {
  //   setIsOpenCreateActivityModal(true);
  // };

  const title = (
    <Row>
      <Col>
        <Popup type="link">
          <Eye />
          View
        </Popup>
        <Popup type="link">
          <EditSvg />
          Edit
        </Popup>
        <Popup type="link">
          <TrashSvg />
          Delete
        </Popup>
        <Popup type="link">
          <Dublicat />
          Duplicate
        </Popup>
        <Popup type="link">
          <Plus/>Use
        </Popup>
      </Col>
    </Row>
  );
  return (
    <Container>
      <Row gutter={[32, 0]} style={{ width: '100%' }}>
        <Col style={{ cursor: 'pointer' }} >
          <Card className=" card">+Add Activity Template</Card>
        </Col>
        <Col>
          <Popconfirm
            overlayClassName="popconFirm"
            title={title}
            okText
            cancelText="X"
            placement="bottom"
            icon={false}
          >
            <Button type="link" className="cardClick">
              ...
            </Button>
          </Popconfirm>
          <Card className="card">Card content</Card>
        </Col>
        <Col>
          <Popconfirm
            overlayClassName="popconFirm"
            title={title}
            okText
            cancelText="X"
            placement="bottom"
            icon={false}
          >
            <Button type="link" className="cardClick">
              ...
            </Button>
          </Popconfirm>
          <Card className="card">Card content</Card>
        </Col>
        <Col>
          <Popconfirm
            overlayClassName="popconFirm"
            title={title}
            okText
            cancelText="X"
            placement="bottom"
            icon={false}
          >
            <Button type="link" className="cardClick">
              ...
            </Button>
          </Popconfirm>
          <Card className="card">Card content</Card>
        </Col>
      </Row>
      {/* <CreateTemplate
          isOpenCreateActivityModal={isOpenCreateActivityModal}
          setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
        /> */}
    </Container>
  );
};
