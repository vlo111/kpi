import React, { useState } from 'react';
import { Button, Popconfirm, Card, Col, Row } from 'antd';
import styled from 'styled-components';

import { ISubActivityAndTemplates } from '../../../../types/project';
import useDeleteActivityTemplate from '../../../../api/Activity/Template/useDeleteActivityTemplate';
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
.ant-card-extra{
    position: absolute;
    top: 0;
    background-color: rgba(0,0,0,0.2) !important;
    height: 196px;
    width: 100%;
    left: 0;
    border-radius: 20px;
    display: flex;
    align-items: center;
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
  word-wrap: break-word;
  white-space: initial;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
   display: -webkit-box;

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
.ant-card-head-title{
  word-wrap: break-word;
  white-space: initial;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
   display: -webkit-box;
  }
  .ant-popover-inner-content{
    height: 180px;
    .ant-popover-buttons{
      position: absolute;
      top: 10px;
    }
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

export const ActiveTempalate: React.FC<ISubActivityAndTemplates> = ({ templates, refetch }) => {
  // const [isOpenCreateActivityModal, setIsOpenCreateActivityModal] = useState<boolean>(false);

  // const handleOpen: AddManagerHandle = () => {
  //   setIsOpenCreateActivityModal(true);
  // };
  const [show, setShow] = useState<string | boolean>(false);
  const { mutate: deleteActivityTemplate } = useDeleteActivityTemplate(
    {
      onSuccess: (options: any) => {
        refetch();
        console.log(options);
      },
      onError: ({ response }: any) => {
        // const { data: { 0: { massage } } } = response;
        console.log(response, 'response');
      }
    }
  );

  const title = (id: string): any => {
    return (
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
          <Popup type="link" onClick={() => deleteActivityTemplate({ id })}>
            <TrashSvg />
            Delete
          </Popup>
          <Popup type="link">
            <Dublicat />
            Duplicate
          </Popup>
          <Popup type="link">
            <Plus />Use
          </Popup>
        </Col>
      </Row>
    );
  };
  return (
    <Container>
      <Row gutter={[32, 0]} style={{ width: '100%' }}>
        <Col style={{ cursor: 'pointer' }} >
          <Card className=" card">+Add Activity Template</Card>
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
              extra={show === template?.id ? template?.description : null}
              onMouseEnter={() => setShow(template?.id)}
              onMouseLeave={() => setShow(false)}
            >
               {template?.title}
            </Card>
          </Col>
        ))}
      </Row>
      {/* <CreateTemplate
          isOpenCreateActivityModal={isOpenCreateActivityModal}
          setIsOpenCreateActivityModal={setIsOpenCreateActivityModal}
        /> */}
    </Container>
  );
};
