import React, { useState, Fragment, useEffect, ReactElement } from 'react'
import styled from 'styled-components'
import { Checkbox, Col, Popover, Radio, Row, Switch, Tooltip } from 'antd'
import { AsnButton } from '../../../../Forms/Button'
import AsnInput from '../../../../Forms/Input'
import CreateFields from './CreateField'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type { RadioChangeEvent } from 'antd'
import { ReactComponent as HelperTextIcon } from '../../../../../assets/icons/helperText.svg'
import { ReactComponent as MenuIcon } from '../../../../../assets/icons/mdMenu.svg'
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/delete.svg'
import { ReactComponent as EditIcon } from '../../../../../assets/icons/edit.svg'

import { courseTemplateData } from '../../../../../helpers/fakeData'
import { ITemplateData } from '../../../../../types/project'

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

  .subTitleContainer {
    display: flex;
    flex-direction: row;
    gap: 5px;
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

  .switchContainer {
    display: flex;
    align-items: center;
    gap: 16px;
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
  width: 1rem;
`

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 3.75rem;
  padding: 3.75rem 6.25rem 3.75rem 0px;
`

const FormsStructureContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 3rem;

  .title {
    font-size: clamp(0.5rem, 2.5vw, 1.25rem);
    color: var(--dark-2);
    margin-bottom: 2rem;
  }

  .titleItems {
    font-size: clamp(0.5rem, 2.5vw, 1.25rem);
    color: var(--dark-2);
  }

  .ant-row {
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

  .ant-row {
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .content {
    font-size: var(--font-size-small);
    color: var(--dark-2);
    cursor: pointer;
    gap: 8px;
  }
`

const ActivityTemplate: React.FC = () => {
  const [rowId, setRowId] = useState<string[]>([])
  const [isVisibleAddField, setIsVisibleAddField] = useState<boolean>(false)
  const [templateData, setTemplateData] = useState<ITemplateData[] | []>([])
  const [questionType, setQuestionType] = useState('')

  useEffect(() => {
    setTemplateData(courseTemplateData)
  }, [])

  const onChange = (checked: boolean): void => {
    console.log(checked)
  }

  const onOpenInputClick = (id: string): void => {
    if (!rowId.includes(id)) {
      setRowId([id, ...rowId])
    }
    if (rowId.length > 0 && rowId.includes(id)) {
      setRowId(rowId.filter((item) => item !== id))
    }
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

  const onDeletedQuestion = (id: string): void => {
    setTemplateData(templateData.filter((item) => item.id !== id))
  }

  const onEditedQuestion = (id: string): void => {
    const item: ITemplateData | undefined = templateData.find(
      (elem) => elem.id === id
    )
    console.log(item)
    if (item?.subTitle[0] === 'Dropdown options') {
      setIsVisibleAddField(true)
      setQuestionType('Dropdown options')
    } else {
      setIsVisibleAddField(true)
      setQuestionType(item?.subTitle[0] ?? '')
    }
  }

  const content = (id: string): ReactElement => (
    <ContentContainer>
      <div className="content" onClick={() => onOpenInputClick(id)}>
        <HelperTextIcon /> Add help text
      </div>
      <div className="content" onClick={() => onEditedQuestion(id)}>
        <EditIcon /> Edit
      </div>
      <div className="content" onClick={() => onDeletedQuestion(id)}>
        <DeleteIcon /> Delete
      </div>
    </ContentContainer>
  )

  return (
    <>
      <ActivityTemplateContainer>
        <CourseTitle>Course activity template</CourseTitle>
        {templateData?.map((item) => (
          <Fragment key={item.id}>
            <CourseList>
              <div>
                <div className="listTitle">{item.title}</div>
                <div className="subTitleContainer">
                  {item?.option?.length > 0
                    ? item.option.map((option: string) => (
                        <div key={option} className="subTitle">
                          {`${option}`}
                        </div>
                    ))
                    : item.subTitle.map((subtitle: string) => (
                        <div key={subtitle} className="subTitle">
                          {`${subtitle}`}
                        </div>
                    ))}
                </div>
              </div>
              <div className="switchContainer">
                <Switch
                  defaultChecked={item.switch}
                  onChange={onChange}
                  disabled={item.disabled}
                />
                {item.status === 0
                  ? (
                  <Tooltip
                    placement="topLeft"
                    title={<span>Add help text</span>}
                    overlayClassName="tooltipHelper"
                  >
                    <IconButton onClick={() => onOpenInputClick(item.id)}>
                      <HelperTextIcon />
                    </IconButton>
                  </Tooltip>
                    )
                  : (
                  <Popover
                    placement="topLeft"
                    content={() => content(item.id)}
                    trigger="click"
                    overlayClassName="menuPopover"
                  >
                    <IconButton>
                      <MenuIcon />
                    </IconButton>
                  </Popover>
                    )}
              </div>
            </CourseList>
            {rowId.includes(item.id)
              ? (
              <AsnInput
                className="courseDescriptionInput"
                placeholder="Add help text"
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
          : (
          <CreateFields
            setIsVisibleAddField={setIsVisibleAddField}
            templateData={templateData}
            setTemplateData={setTemplateData}
            questionType={questionType}
            setQuestionType={setQuestionType}
          />
            )}
        <FormsStructureContainer>
          <Row gutter={[0, 0]}>
            <Col span={24}>
              <div className="title">Include Forms</div>
            </Col>
            <Col span={24}>
              <Checkbox onChange={onCheckboxChange}>
                <div className="titleItems"> Application Form</div>
              </Checkbox>
              <Checkbox onChange={onCheckboxChange}>
                <div className="titleItems">Assessment Form</div>
              </Checkbox>
            </Col>
          </Row>
          <Row gutter={[0, 0]}>
            <Col span={24}>
              <div className="title">Course Structure</div>
            </Col>
            <Col span={24}>
              <Radio.Group onChange={onRadioChange}>
                <Radio value={1}>
                  <div className="titleItems">One Section</div>
                </Radio>
                <Radio value={2}>
                  <div className="titleItems">Multi-Section</div>
                </Radio>
              </Radio.Group>
            </Col>
          </Row>
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
