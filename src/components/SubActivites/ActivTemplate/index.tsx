/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
  `
  const confirm = async () =>
    await new Promise((resolve) => {
      setTimeout(() => resolve(null), 3000)
    })
  const title = (
   <div style={{ display: 'grid' }}>
      <div
        style={{
          display: 'grid',
          padding: '22px 0px 0px 10px',
          color: 'inherit'
        }}
      >
        <Button
          type="link"
          style={{
            display: 'grid',
            gridTemplateColumns: '21px auto',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gridGap: '11px',
            padding: '0 2px',
            color: '#263238'
          }}
        >
          <Eye style={{ SVGPathElement: '#263238' }}/>
          View
        </Button>
        <Button
          type="link"
          style={{
            display: 'grid',
            gridTemplateColumns: '21px auto',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gridGap: '11px',
            padding: '0 2px',
            color: '#263238'
          }}
        >
          <EditSvg />
          Edit
        </Button>
        <Button
          type="link"
          style={{
            display: 'grid',
            gridTemplateColumns: '21px auto',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gridGap: '11px',
            padding: '0 2px',
            color: '#263238'
          }}
        >
          <TrashSvg />
          Delete
        </Button>
        <Button
          type="link"
          style={{
            display: 'grid',
            gridTemplateColumns: '21px auto',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gridGap: '11px',
            padding: '0 2px',
            color: '#263238'
          }}
        >
          <Dublicat />
          Duplicate
        </Button>
        <Button
          type="link"
          style={{
            display: 'grid',
            gridTemplateColumns: '21px auto',
            justifyContent: 'flex-start',
            gridGap: '11px',
            padding: '0 2px',
            color: '#263238',
            alignItems: 'baseline'

          }}
        >
          <p style={{ fontSize: '20px' }}>+ </p>Use
        </Button>
      </div>
    </div>
  )
  return (
    <Container>
      <Row gutter={[32, 0]}>
        <Col>
        <Popconfirm title={title} onConfirm={confirm} okText cancelText="X" placement="bottom" >
        <Button
              type="link"
              style={{ position: 'absolute', zIndex: '1', right: '20px', color: '#111B23' }}
            >
              ...
            </Button>
    </Popconfirm>
          <Card title="Card title" className="cardInactive card">
            Card content
          </Card>
        </Col>
        <Col>
        <Popconfirm title={title} onConfirm={confirm} okText cancelText="X" placement="bottom" >
        <Button
              type="link"
              style={{ position: 'absolute', zIndex: '1', right: '20px', color: '#111B23' }}
            >
              ...
            </Button>
    </Popconfirm>
          <Card title="Card title" className="cardInactive card">
            Card content
          </Card>
        </Col>
        <Col>
        <Popconfirm title={title} onConfirm={confirm} okText cancelText="X" placement="bottom" >
        <Button
              type="link"
              style={{ position: 'absolute', zIndex: '1', right: '20px', color: '#111B23' }}
            >
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
