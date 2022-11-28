import React from 'react'
import { Result, Space } from 'antd'
import { ReactComponent as Pages404 } from '../../assets/icons/errorPages/pages404.svg'
import { AsnButton } from '../../components/Forms/Button'
const PagesNotFound: React.FC = () => {
  return (
    <Result
      className="errorPages"
      icon={<Pages404 />}
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

export default PagesNotFound
