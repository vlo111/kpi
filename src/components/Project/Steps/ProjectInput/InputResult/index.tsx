import React from 'react'
import {
  IResultArea
} from '../../../../../types/project'
import ExpectedResult from './ExpectedResult'
import { Panel } from '../../../../Forms/Collapse'
import { AnsCollapse } from '../../../../AnsCollapse'

const InputResult: React.FC<{ resultArea: IResultArea[] }> = ({
  resultArea
}) => {
  return (
        <>
            {resultArea.map((r, i) => (
                <div key={r.id}>
                    <span className="ans-title">Input Result Area {i + 1} *</span>
                    <AnsCollapse key={r.id} id={r.id}>
                        <Panel key={r.id} header={r.name}>
                            <ExpectedResult key={r.id} results={r.expectedResult}/>
                        </Panel>
                    </AnsCollapse>
                </div>
            ))}
        </>
  )
}

export default InputResult
