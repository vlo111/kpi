import React from 'react'
import { ExpectedResultType } from '../../../../../types/project'
import { AsnButton } from '../../../../Forms/Button'
import { Row } from 'antd'
import InputAreaBox from '../InputAreaBox'
import { useProjectInput } from '../../../../../hooks/project/useProjectInput'

const ExpectedResult: React.FC<{
  id: string
  results: ExpectedResultType[]
}> = ({ id, results }) => {
  const { addNewResult } = useProjectInput()

  return (
    <>
      <div className="panel">
        <InputAreaBox list={results} />
        <Row>
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
