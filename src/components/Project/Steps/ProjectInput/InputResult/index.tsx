import React from 'react'
import {
  IPanelIsActive,
  IResultArea
} from '../../../../../types/project'
import ExpectedResult from './ExpectedResult'
import { AnsCollapseStyle, Panel } from '../../../../Forms/Collapse'
import { CaretRightOutlined } from '@ant-design/icons'

const InputResult: React.FC<{ resultArea: IResultArea[] }> = ({
  resultArea
}) => {
  const getPropsData: any = (name: any) => ({
    defaultActiveKey: [name],
    expandIcon: ({ isActive }: IPanelIsActive) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0}/>
    )
  })

  return (
        <>
            {resultArea.map((r) => (
                <AnsCollapseStyle key={r.id} {...getPropsData(r.name)}>
                    <Panel key={r.id} header={r.name}>
                        <ExpectedResult key={r.id} results={r.expectedResult}/>
                    </Panel>
                </AnsCollapseStyle>
            ))}
        </>
  )
}

export default InputResult
