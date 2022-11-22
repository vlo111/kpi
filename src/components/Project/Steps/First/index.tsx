import React from 'react'
import InputResult from './InputResult'
import { VALIDATE_MESSAGES_PROJECT_INPUT } from '../../../../helpers/constants'
import { AsnButton } from '../../../Forms/Button'
import { Form } from '../../../Forms/Form'
import { ProjectInputForm } from '../../../Forms/ProjectInputForm'
import { useProject } from '../../../../hooks/project/useProject'

const setTitleColor: (element: HTMLElement, color: string) => void = (element, color) => {
  if (element) {
    const titleElement = element.firstChild as HTMLElement

    const pathElement = element.lastChild?.firstChild as HTMLElement

    if (titleElement) {
      titleElement.style.color = color
    }

    if (pathElement) {
      pathElement.style.fill = color
    }
  }
}

const setError: () => void = () => {
  // @ts-expect-error
  const errorsIndex = [...new Set(values.errorFields.map((r) => r.name[1]))]

  const resultAreaElement: (id: string) => void = (id) => {
    const resultAreaElement = document.getElementById(`ans-title-${id}`) as HTMLElement

    setTitleColor(resultAreaElement, 'var(--error)')
  }

  const resultAreaElements = document.getElementsByClassName('result_area_title') as HTMLCollectionOf<HTMLElement>

  if (resultAreaElements) {
    Array.from(resultAreaElements).forEach(element => {
      setTitleColor(element, 'var(--dark-2)')
    })
  }

  errorsIndex.map((i) => resultAreaElement(i))
}

export const First: React.FC = () => {
  const { nextCurrent, prevCurrent } = useProject()
  const [form] = Form.useForm()

  const onFinish: any = (values: any) => {
    console.log(values, 'finish')
    nextCurrent()
  }

  const onFinishFailed: any = (values: any) => {
    console.log(values, 'failed')

    setError()
  }

  return (
    <ProjectInputForm
      form={form}
      initialValues={{
        result_area_form: [
          {
            resultAreaInput: '',
            expectedList: [{}],
            activities: [{ activityInput: '', milestones: [{}] }]
          }
        ]
      }}
      layout="vertical"
      validateMessages={VALIDATE_MESSAGES_PROJECT_INPUT}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <InputResult />
      <div className="footer">
        <AsnButton
          onClick={() => {
            prevCurrent()
          }}
        >
          Cancel
        </AsnButton>
        <AsnButton>Save as Draft</AsnButton>
        <AsnButton type="primary" htmlType="submit">
          Next
        </AsnButton>
      </div>
    </ProjectInputForm>
  )
}
