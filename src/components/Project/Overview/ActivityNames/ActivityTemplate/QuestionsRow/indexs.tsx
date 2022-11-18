import React, { Fragment, ReactElement, useState } from 'react'
import styled from 'styled-components'
import { Col, Popover, Row, Switch, Tooltip } from 'antd'
import AsnInput from '../../../../../Forms/Input'
import { ReactComponent as HelperTextIcon } from '../../../../../../assets/icons/helper-text.svg'
import { ReactComponent as MenuIcon } from '../../../../../../assets/icons/md-menu.svg'
import { ReactComponent as EditIcon } from '../../../../../../assets/icons/edit.svg'
import { ReactComponent as DeleteIcon } from '../../../../../../assets/icons/delete.svg'
import { Form } from '../../../../../Forms/Form'
import { IQuestionsRow, ITemplateData } from '../../../../../../types/project'
import { AsnModal } from '../../../../../Forms/Modal'
import { AsnButton } from '../../../../../Forms/Button'

const CourseList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--white);
  padding: 11.5px 18px 11.5px 8px;
  border: 0.5px solid var(--dark-6);
  svg {
    margin-left: 8px;
  }

  .ant-switch-checked {
    background-color: var(--secondary-green);
  }
`
const IconButton = styled.div`
  cursor: pointer;
  width: 1rem;
`

const QuestionsRow: React.FC<IQuestionsRow> = ({
  item,
  templateData,
  setTemplateData,
  setQuestionType,
  setIsVisibleAddField
}) => {
  const [rowId, setRowId] = useState<string[]>([])
  const [itemId, setItemId] = useState<string>('')
  const [isDeletedFieldModal, setIsDeletedFieldModal] =
    useState<boolean>(false)
  const [openPopover, setOpenPopover] = useState<boolean>(false)

  const handleOpenChange = (newOpen: boolean): void => {
    setOpenPopover(newOpen)
  }

  const onOpenInputClick = (id: string): void => {
    if (!rowId.includes(id)) {
      setRowId([id, ...rowId])
    }
    if (rowId.length > 0 && rowId.includes(id)) {
      setRowId(rowId.filter((item) => item !== id))
    }
    setOpenPopover(false)
  }

  const onDeletedQuestion = (id: string): void => {
    setItemId(id)
    setIsDeletedFieldModal(true)
    setOpenPopover(false)
  }

  const onEditedQuestion = (id: string): void => {
    const item: ITemplateData | undefined = templateData.find(
      (elem: ITemplateData) => elem.id === id
    )
    if (item?.subTitle[0] === 'Dropdown options') {
      setIsVisibleAddField(true)
      setQuestionType('Dropdown options')
    } else {
      setIsVisibleAddField(true)
      setQuestionType(item?.subTitle[0] ?? '')
    }
    setOpenPopover(false)
  }

  const handleCancel = (): void => {
    setIsDeletedFieldModal(false)
  }
  const handleDelete = (): void => {
    setTemplateData(
      templateData.filter((item: ITemplateData) => item.id !== itemId)
    )
    setIsDeletedFieldModal(false)
  }

  const content = (id: string): ReactElement => (
    <Row
      style={{
        fontSize: 'var(--font-size-small)',
        color: 'var(--dark-2)',
        cursor: 'pointer'
      }}
      gutter={[8, 8]}
    >
      <Col onClick={() => onOpenInputClick(id)} span={24}>
        <HelperTextIcon /> Add help text
      </Col>
      <Col onClick={() => onEditedQuestion(id)} span={24}>
        <EditIcon /> Edit
      </Col>
      <Col onClick={() => onDeletedQuestion(id)} span={24}>
        <DeleteIcon /> Delete
      </Col>
    </Row>
  )

  return (
    <Fragment>
      <CourseList>
        <Row>
          <Col
            span={24}
            style={{
              color: 'var(--dark-2)',
              fontSize: 'var(--headline-font-size)'
            }}
          >
            {item.title}
          </Col>
          <Row gutter={[5, 0]}>
            {item?.option?.length > 0
              ? item.option.map((option: string) => (
                  <Col
                    key={option}
                    style={{
                      color: 'var(--dark-2)',
                      fontSize: 'var(--font-size-small)'
                    }}
                  >
                    {`${option}`}
                  </Col>
              ))
              : item.subTitle.map((subtitle: string, index: number) => (
                  <Col key={subtitle + `${index}`}>{`${subtitle}`}</Col>
              ))}
          </Row>
        </Row>
        <Row>
          <Col>
            <Switch defaultChecked={item.switch} disabled={item.disabled} />
          </Col>
          <Col>
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
                onOpenChange={handleOpenChange}
                open={openPopover}
              >
                <IconButton>
                  <MenuIcon />
                </IconButton>
              </Popover>
                )}
          </Col>
        </Row>
      </CourseList>
      {rowId.includes(item.id)
        ? (
        <Form.Item name="helpText" style={{ margin: '0px' }}>
          <AsnInput
            className="courseDescriptionInput"
            placeholder="Add help text"
          />
        </Form.Item>
          )
        : null}
      <AsnModal
        footer={false}
        open={isDeletedFieldModal}
        title="Are you sure you want to delete this field?"
        onCancel={handleCancel}
      >
        <Row gutter={[60, 0]} align="middle" justify="center">
          <Col>
            <AsnButton type="primary" onClick={handleDelete}>
              Delete
            </AsnButton>
          </Col>
          <Col>
            <AsnButton onClick={handleCancel}>Cancel</AsnButton>
          </Col>
        </Row>
      </AsnModal>
    </Fragment>
  )
}

export default QuestionsRow
