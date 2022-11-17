import React from 'react'
import { AsnButton } from '../../../../Forms/Button'
import { Row } from 'antd'
import InputAreaBox from '../InputAreaBox'
import { useProjectInput } from '../../../../../hooks/project/useProjectInput'
import { IExpectedResultProps } from '../../../../../types/project'

const ExpectedResult: React.FC<IExpectedResultProps> = ({ id, results, form }) => {
  const { addNewResult } = useProjectInput()

  return (
    <>
      <div className="panel">
        <InputAreaBox form={form} resultAreaId={id} list={results} />
        <Row style={{ width: 'calc(100% - 10px)' }}>
          <AsnButton
            style={{ background: 'white', width: '100%', height: '44px' }}
            value="Create"
            onClick={() => addNewResult(id)}
          >
            +Add expected result
          </AsnButton>
        </Row>
      </div>
    </>
  )
}

export default ExpectedResult
