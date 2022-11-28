import React from 'react'
import { Result, Space } from 'antd'
import { ReactComponent as Pages500 } from '../../assets/icons/errorPages/pages500.svg'
import { AsnButton } from '../../components/Forms/Button'
const ServerError: React.FC = () => {
  return (
    <Result
      className="errorPages"
      icon={<Pages500 />}
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

export default ServerError
