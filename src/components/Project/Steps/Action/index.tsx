import React from 'react'
import { message } from 'antd'
import Button from '../../../Forms/Button'
import styled from 'styled-components'

const Action = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const StepContainer: React.FC<{ current: number, setCurrent: (current: number) => void }> = ({ current, setCurrent }) => {
  const next: () => void = () => {
    setCurrent(current + 1)
  }

  const prev: () => void = () => {
    setCurrent(current - 1)
  }

  return (
    <Action>
      {current === 0 && (
        <Button onClick={() => prev()} value="Create">Create</Button>
      )}

      {current > 0 && (
        <Button onClick={() => prev()} value="Previous">Previous</Button>
      )}

      {current === 1 && (
        <Button onClick={() => prev()} value="Draft">Save as Draft</Button>
      )}

      {current < 3 - 1 && (
        <Button type="primary" onClick={() => next()} value="Next">Next</Button>
      )}

      {current === 3 - 1 && (
        <Button type="primary"
                onClick={() => {
                  void message.success('Processing complete!')
                }}
                value="Next">Publish</Button>
      )}
    </Action>
  )
}

export default StepContainer
