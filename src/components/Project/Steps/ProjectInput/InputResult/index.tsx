import React from 'react'
import { IResultArea } from '../../../../../types/project'
import ExpectedResult from './ExpectedResult'

const InputResult: React.FC<{ resultArea: IResultArea[] }> = ({ resultArea }) => {
  return (
        <>
            {resultArea.map((r: any) => <ExpectedResult key={r.id} results={r.expectedResult}/>)}
        </>
  )
}

export default InputResult
