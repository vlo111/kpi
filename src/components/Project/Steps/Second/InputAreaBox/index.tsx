import React from 'react'
import { IExpectedResult, IMilestones } from '../../../../../types/project'
import Box from './Box'
import { PlaceHolderActivityMilestone, PlaceHolderExpectedResult } from '../../../../../helpers/constants'

const InputAreaBox: React.FC<{ list: IExpectedResult[] | IMilestones[] }> = ({
  list
}) => {
  return (
    <>
      {list.map(
        (l, i) => {
          const picked = (({ id, code, measure, target, result }) => ({
            id,
            code,
            measure,
            target,
            result
          }))(Object.assign({}, l) as IExpectedResult)

          // if (!picked.result) {
          //   picked.result = (l as Milestones).milestone
          // }

          const placeholders = ['OP1.1', picked.result ? PlaceHolderExpectedResult : PlaceHolderActivityMilestone, picked.result ? '100' : '1']

          return <Box key={l.id} id={l.id} index={i} placeHolders={placeholders} />
        }
      )}
    </>
  )
}

export default InputAreaBox
