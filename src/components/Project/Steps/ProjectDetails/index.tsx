import React from 'react'
import { CaretRightOutlined } from '@ant-design/icons'
import { AnsCollapse, Panel } from '../../../Forms/Collapse'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

export const ProjectDetails: React.FC = () => {
  const onChange: (key: string | string[]) => void = (
    key: string | string[]
  ) => {
    console.log(key)
  }
  return (
    <div>
      <AnsCollapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        className="site-collapse-custom-collapse"
      >
        <Panel header="This is panel header 1" key="1">
          <p>{text}</p>
        </Panel>
      </AnsCollapse>
    </div>
  )
}
