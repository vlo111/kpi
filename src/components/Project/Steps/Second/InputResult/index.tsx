import React from 'react'
import { IResultArea } from '../../../../../types/project'
import { AnsCollapse } from '../../../../AnsCollapse'
import { Panel } from '../../../../Forms/AnsCollapse'
import { InputResultArea } from '../../../../Forms/InputResultArea'
import InputExpectedResult from '../InputExpectedResult'
import InputActivity from '../InputActivity'

const InputResult: React.FC<{ resultArea: IResultArea[] }> = ({
  resultArea
}) => {
  return (
    <>
        {resultArea.map((r, i) => (
          <InputResultArea key={r.id}>
            <span className="ans-title">Input Result Area {i + 1} *</span>
            <div className="result-area">
              <AnsCollapse key={r.id} id={r.id}>
                <Panel key={r.id} header={r.name}>
                  <InputExpectedResult id={r.id} results={r.expectedResult} />
                  <InputActivity id={r.id} index={i + 1} activities={r.activity} />
                </Panel>
              </AnsCollapse>
            </div>
          </InputResultArea>
        ))}
    </>
  )
}

export default InputResult
