import React from 'react'
import { message } from 'antd'
import Button from '../../../Forms/Button'
import styled from 'styled-components'
import { Form } from '../../../Forms/Form'

const FormItem = styled(Form.Item)`
  margin: 0;
  
  .ant-form-item-control-input-content {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
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
        <FormItem>
            {current === 0 && (
                <Button htmlType="submit" onClick={() => prev()} value="Create">Create</Button>
            )}

            {current > 0 && (
                <Button htmlType="submit" onClick={() => prev()} value="Previous">Previous</Button>
            )}

            {current === 1 && (
                <Button htmlType="submit" onClick={() => prev()} value="Draft">Save as Draft</Button>
            )}

            {current < stepLength - 1 && (
                <Button type="primary" htmlType="submit" onClick={() => next()} value="Next">Next</Button>
            )}

            {current === stepLength - 1 && (
                <Button type="primary"
                        htmlType="submit"
                        onClick={() => {
                          void message.success('Processing complete!')
                        }}
                        value="Next">Publish</Button>
            )}
        </FormItem>
  )
}

export default StepContainer
