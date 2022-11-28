import React from 'react'
import { Result, Space } from 'antd'
import { ReactComponent as Pages403 } from '../../assets/icons/errorPages/pages403.svg'
import { AsnButton } from '../../components/Forms/Button'
const Error403: React.FC = () => {
  return (
    <Result
      className="errorPages"
      icon={<Pages403 />}
      extra={
        <Space size="middle" direction="vertical">
          <AsnButton type="primary" href="/" style={{ padding: '0 !important' }}>
            Back Home
          </AsnButton>
        </Space>
      }
    />
  )
}

export default Error403
