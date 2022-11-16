import React from 'react'
import { IExpectedResult } from '../../../../../types/project'
import { AsnButton } from '../../../../Forms/Button'
import { Row } from 'antd'
import InputAreaBox from '../InputAreaBox'
import { useProjectInput } from '../../../../../hooks/project/useProjectInput'
import { FormInstance } from 'antd/lib/form/hooks/useForm'

const ExpectedResult: React.FC<{
  id: string
  results: IExpectedResult[]
  form: FormInstance
}> = ({ id, results, form }) => {
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
