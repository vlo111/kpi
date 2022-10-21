import React from 'react'
import { message } from 'antd'
import Button from '../../../Forms/Button'
import styled from 'styled-components'
import { Form } from '../../../Forms/Form'

const Action = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`

const StepContainer: React.FC<{ current: number, onSubmit: (current: number) => void, stepLength: number }> = ({
  stepLength,
  current,
  onSubmit
}) => {
  const next: () => void = () => {
    onSubmit(current + 1)
  }

  const prev: () => void = () => {
    onSubmit(current - 1)
  }

  return (
    <Action>
      <Form.Item>
        {current === 0 && (
          <Button onClick={() => prev()} value="Create">Create</Button>
        )}

        {current > 0 && (
          <Button onClick={() => prev()} value="Previous">Previous</Button>
        )}

        {current === 1 && (
          <Button onClick={() => prev()} value="Draft">Save as Draft</Button>
        )}

        {current < stepLength - 1 && (
          <Button type="primary" onClick={() => next()} value="Next">Next</Button>
        )}

        {current === stepLength - 1 && (
          <Button type="primary"
                  onClick={() => {
                    void message.success('Processing complete!')
                  }}
                  value="Next">Publish</Button>
        )}
      </Form.Item>
    </Action>
  )
}

export default StepContainer
