import React from 'react'

import { ProjectInputInitialValue, VALIDATE_MESSAGES_PROJECT_INPUT } from '../../../../helpers/constants'
import { SetResultArea, SetTitleColor } from '../../../../types/project'
import { ProjectInputForm } from '../../../Forms/ProjectInputForm'
import { useProject } from '../../../../hooks/project/useProject'
import { FormFinish } from '../../../../types/global'
import { AsnButton } from '../../../Forms/Button'
import { Form } from '../../../Forms/Form'
import InputResult from './InputResult'

const setTitleColor: SetTitleColor = (element, color) => {
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

const setError: SetResultArea = (values) => {
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

  const onFinish: FormFinish = (values: FormData) => {
    console.log(values, 'finish')
    nextCurrent()
  }

  const onFinishFailed: FormFinish = (values: FormData) => {
    console.log(values, 'failed')

    setError(values)
  }

  return (
    <ProjectInputForm
      form={form}
      initialValues={ProjectInputInitialValue}
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
