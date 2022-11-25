import React from 'react'
import { Button, Popconfirm, Card, Col, Row } from 'antd'
import styled from 'styled-components'

import { ReactComponent as Eye } from '../../../assets/icons/eye.svg'
import { ReactComponent as TrashSvg } from '../../../assets/icons/trash.svg'
import { ReactComponent as EditSvg } from '../../../assets/icons/edit.svg'
import { ReactComponent as Dublicat } from '../../../assets/icons/duplicate.svg'

export const ActiveTempalate: React.FC = () => {
  const Container = styled.div`
    .card {
      height: 200px;
      width: 200px;
      background: var(--white);
      border-top: 2px solid var(--secondary-light-orage);
      box-shadow: rgba(255, 255, 255, 0.7);
      border-radius: 20px;
    }
    .ant-card-body {
      padding: 0 28px;
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
      color: #111b23;
    }
  `
  const Popup = styled(Button)`
    display: grid;
    grid-template-columns: 21px auto;
    justify-content: flex-start;
    grid-gap: 11px;
    padding: 0 2px;
    color: #263238;
    align-items: baseline;
  `
  const title = (
    <div style={{ display: 'grid' }}>
      <div
        style={{
          display: 'grid',
          padding: '22px 0px 0px 10px',
          color: 'inherit'
        }}
      >
        <Popup type="link">
          <Eye style={{ SVGPathElement: '#263238' }} />
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
          <div style={{ fontSize: '20px' }}>+ </div>Use
        </Popup>
      </div>
    </div>
  )
  return (
    <Container>
      <Row gutter={[32, 0]}>
        <Col>
          <Popconfirm
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
          <Card title="Card title" className="cardInactive card">
            Card content
          </Card>
        </Col>
        <Col>
          <Popconfirm
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
          <Card title="Card title" className="cardInactive card">
            Card content
          </Card>
        </Col>
        <Col>
          <Popconfirm
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
          <Card title="Card title" className="cardInactive card">
            Card content
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
