import React from 'react'
import { AnsCollapseStyle, Panel } from '../../../Forms/Collapse'
import { IPanelIsActive, IPanelPropData } from '../../../../types/project'
import { CaretRightOutlined } from '@ant-design/icons'
import Button from '../../../Forms/Button'
import { ResultArea } from '../../../../helpers/fakeData'
import styled from 'styled-components'
import { Form } from '../../../Forms/Form'
import AsnInput, { TextArea } from '../../../Forms/Input'

const ResultAreaContainer = styled.div`
  width: 100%;
  background: #FFFFFF;
  border-top: 3px solid #F3C262;
  box-shadow: -4px -4px 4px rgb(42 85 120 / 5%), 4px 4px 4px rgb(42 85 120 / 5%);
  border-radius: 20px;
  padding: 32px;
  
  display: flex;
  flex-direction: row;
  gap: 5px;

  .ant-collapse-content-box {
    padding: 1rem 1rem 2rem 1rem !important;
  }
`

const ProjectInfo: React.FC = () => {
  const propsData: IPanelPropData = {
    defaultActiveKey: [ResultArea[0].name],
    expandIcon: ({ isActive }: IPanelIsActive) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0}/>
    )
  }

  return (
    <div>
      <AnsCollapseStyle {...propsData}>
        <Panel key={ResultArea[0].name} header={ResultArea[0].name}>

          <ResultAreaContainer>
            <Form.Item
                name={'Code'}
                label="Code"
                rules={[{ required: true }]}
            >
              <AsnInput placeholder="Organization name"/>
            </Form.Item>
            <Form.Item
                name={'result'}
                label="Input expected result statement*"
                rules={[{ required: true }]}
            >
              <TextArea placeholder="individuals with improved technical and soft skills following participation in USG-assisted workforce development programs"/>
            </Form.Item>
            <Form.Item
                name={'l.ddid'}
                label="First Name"
                rules={[{ required: true }]}
            >
              <AsnInput placeholder="Organization name"/>
            </Form.Item>
            <Form.Item
                name={'l.sdid'}
                label="First Name"
                rules={[{ required: true }]}
            >
              <AsnInput placeholder="Organization name"/>
            </Form.Item>
          </ResultAreaContainer>

          <Button style={{ background: 'white', width: '100%' }} htmlType="submit" value="Create">+Add Result Area</Button>
        </Panel>
      </AnsCollapseStyle>
    </div>
  )
}

export default ProjectInfo
