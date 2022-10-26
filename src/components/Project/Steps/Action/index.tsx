import React from 'react'
import { message } from 'antd'
import Button from '../../../Forms/Button'
import styled from 'styled-components'
import { Form } from '../../../Forms/Form'
import { HandleSubmit, IStepAction } from '../../../../types/project'

const FormItem = styled(Form.Item)`
  margin: 0;
  
  .ant-form-item-control-input-content {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }
`

const StepContainer: React.FC<IStepAction> = ({
  stepLength,
  current,
  onSubmit
}) => {
  const next: HandleSubmit = () => {
    onSubmit(+current + 1)
  }

  const prev: HandleSubmit = () => {
    onSubmit(current - 1)
  }

  return (
        <FormItem className="form-footer">
            {current === 0 && (
                <Button htmlType="submit" onClick={() => prev()} value="Create">Create</Button>
            )}

            {current > 0 && (
                <Button htmlType="submit" onClick={() => prev()} value="Previous">Previous</Button>
            )}

            {current > 0 && (
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
