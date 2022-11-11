import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { Checkbox, Radio, Switch, Tooltip } from 'antd'
import { AsnButton } from '../../../../Forms/Button'
import AsnInput from '../../../../Forms/Input'
import CreateFields from './CreateField'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { RadioChangeEvent } from 'antd'
import { ReactComponent as HelperTextIcon } from '../../../../../assets/icons/helperText.svg'

import { courseTemplateData } from '../../../../../helpers/fakeData'

const ActivityTemplateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  margin: 0 auto;

  .ant-btn-primary {
    width: 100%;
    margin-top: 2rem;
  }

  .courseDescriptionInput {
    border: none;
    box-shadow: inset 0px 4px 4px rgba(42, 85, 120, 0.05);
    border-radius: 0px;

    :hover {
      border: none !important;
    }
  }

  .assignPerson {
    width: 100%;
  }
`

const CourseList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--white);
  padding: 11.5px 18px 11.5px 8px;
  border: 0.5px solid var(--dark-6);

  .listTitle {
    color: var(--dark-2);
    font-size: var(--headline-font-size);
  }

  svg {
    margin-left: 8px;
  }

  .subTitle {
    color: var(--dark-4);
    font-size: var(--font-size-small);
  }

  .ant-switch-checked {
    background-color: var(--secondary-green);
  }
`

const CourseTitle = styled.span`
  color: var(--dark-2);
  font-size: var(--headline-font-size);
  margin-bottom: 2rem;
`

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 3.75rem;
  margin: 0px 4.4rem 3.9rem 0px;
`

const FormsStructureContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 3rem;
  gap: 16%;

  .title {
    font-size: var(--headline-font-size);
    color: var(--dark-2);
    margin-bottom: 2rem;
  }

  .titleItems {
    font-size: var(--headline-font-size);
    color: var(--dark-2);
  }

  .includesForm {
    display: flex;
    flex-direction: column;

    .ant-checkbox-inner {
      width: 2rem;
      height: 2rem;
      border: 3px solid var(--dark-border-ultramarine);

      ::after {
        width: 10px;
        height: 18px;
        border: 3px solid var(--white);
        border-top: 0;
        border-left: 0;
        top: 12px;
      }
    }

    .ant-checkbox-checked {
      .ant-checkbox-inner {
        background-color: var(--dark-border-ultramarine);
      }
    }

    .ant-checkbox-wrapper {
      margin-left: 0px;
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
  }

  .courseStructure {
    .ant-radio-checked .ant-radio-inner {
      border-color: var(--dark-border-ultramarine);
    }

    .ant-radio-wrapper {
      margin-bottom: 1rem;
    }

    .ant-radio-inner {
      width: 20px;
      height: 20px;

      ::after {
        transform: scale(0.7);
        background-color: var(--dark-border-ultramarine);
      }
    }
    .ant-radio-group {
      display: flex;
      flex-direction: column;
    }
  }
`

const ActivityTemplate: React.FC = () => {
  const [rowId, setRowId] = useState<string[]>([])
  const [isVisibleAddField, setIsVisibleAddField] = useState<boolean>(false)

  const onChange = (checked: boolean): void => {
    console.log(checked)
  }

  const onOpenInputClick = (id: string): void => {
    setRowId([id, ...rowId])
  }

  const onCheckboxChange = (e: CheckboxChangeEvent): void => {
    console.log(e.target.checked)
  }

  const onRadioChange = (e: RadioChangeEvent): void => {
    console.log('radio checked', e.target.value)
  }

  const onOpenAddVisibleField = (): void => {
    setIsVisibleAddField(true)
  }

  return (
    <>
      <ActivityTemplateContainer>
        <CourseTitle>Course activity template</CourseTitle>
        {courseTemplateData.map((item) => (
          <Fragment key={item.id}>
            <CourseList>
              <div>
                <div className="listTitle">{item.title}</div>
                {item.subTitle !== ''
                  ? (
                    <div className="subTitle">{item.subTitle} </div>
                    )
                  : null}
              </div>
              <div className="switchContainer">
                <Switch
                  defaultChecked={item.status}
                  onChange={onChange}
                  disabled={item.disabled}
                />
                <Tooltip
                  placement="topLeft"
                  title={<span>Add help text</span>}
                  overlayClassName="tooltipHelper"
                >
                  <IconButton onClick={() => onOpenInputClick(item.id)}>
                    <HelperTextIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </CourseList>
            {rowId.includes(item.id)
              ? (
                <AsnInput
                  className="courseDescriptionInput"
                  placeholder="Add help text "
                />
                )
              : null}
          </Fragment>
        ))}
        {!isVisibleAddField
          ? (
            <AsnButton type="primary" onClick={onOpenAddVisibleField}>
              +Add Field
            </AsnButton>
            )
          : (<CreateFields setIsVisibleAddField={setIsVisibleAddField} />)}
        <FormsStructureContainer>
          <div className="includesForm form">
            <div className="title">Include Forms</div>
            <Checkbox onChange={onCheckboxChange}>
              <div className="titleItems"> Application Form</div>
            </Checkbox>
            <Checkbox onChange={onCheckboxChange}>
              <div className="titleItems">Assessment Form</div>
            </Checkbox>
          </div>
          <div className="courseStructure form">
            <div className="title">Course Structure</div>
            <Radio.Group onChange={onRadioChange}>
              <Radio value={1}>
                <div className="titleItems">One Section</div>
              </Radio>
              <Radio value={2}>
                <div className="titleItems">Multi-Section</div>
              </Radio>
            </Radio.Group>
          </div>
        </FormsStructureContainer>
      </ActivityTemplateContainer>
      <ButtonsContainer>
        <AsnButton>Cancel</AsnButton>
        <AsnButton type="primary">Next</AsnButton>
      </ButtonsContainer>
    </>
  )
}

export default ActivityTemplate
