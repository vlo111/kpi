import React from 'react'
import { IExpectedResult, IProjectItemsBox } from '../../../../../../types/project'
import Box from '../Box'
import {
  PlaceHolderActivityMilestone,
  PlaceHolderExpectedResult
} from '../../../../../../helpers/constants'
import { Row } from 'antd'
import { ReactComponent as DeleteSvg } from '../../../../../../assets/icons/delete.svg'

const BoxContainer: React.FC<IProjectItemsBox> = ({ item, index, onDelete, accessDelete, form }) => {
  const picked = (({ id, code, measure, target, result }) => ({
    id,
    code,
    measure,
    target,
    result
  }))(Object.assign({}, item) as IExpectedResult)

  // if (!picked.result) {
  //   picked.result = (l as Milestones).milestone
  // }

  const placeholders = [
    'OP1.1',
    (picked.result !== '') ? PlaceHolderExpectedResult : PlaceHolderActivityMilestone,
    (picked.result !== '') ? '100' : '1'
  ]

  return (
    <Row gutter={16} justify="start" align="top" style={{ minWidth: '20vw' }}>
      <Box
        form={form}
        key={item.id}
        id={item.id}
        index={index}
        placeHolders={placeholders}
      />
      {accessDelete && (
        <div
          className="delete-result-box"
          onClick={() =>
            onDelete(
              picked.result !== undefined ? 'expected' : 'milestone',
              item.id
            )
          }
        >
          <DeleteSvg />
        </div>
      )}
    </Row>
  )
}

export default BoxContainer
