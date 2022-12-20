import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Col, Popover, Row, Switch, Tooltip } from 'antd';
import { ReactComponent as HelperTextIcon } from '../../../assets/icons/helper-text.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/md-menu.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { AsnInput } from '../../Forms/Input';
import { AsnModal } from '../../Forms/Modal';
import { AsnButton } from '../../Forms/Button';
import {
  FormFinish,
  Onchange,
  StringVoidType,
  Void
} from '../../../types/global';
import {
  ContentType,
  IQuestionsRow
  // ITemplateData
} from '../../../types/project';
import useDeleteSetting from '../../../api/Activity/Template/Settings/useDeleteSingleSetting';

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
`;
const IconButton = styled.div`
  cursor: pointer;
  width: 1rem;
`;

const QuestionsRow: React.FC<IQuestionsRow> = ({
  item,
  templateData,
  // setTemplateData,
  setQuestionType,
  setIsVisibleAddField,
  helpTextValue,
  setHelpTextValue,
  refetch
}) => {
  const [rowId, setRowId] = useState<string[]>([]);
  const [itemId, setItemId] = useState<string>('');
  const [isDeletedFieldModal, setIsDeletedFieldModal] =
    useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const { mutate: deleteSettingsById } = useDeleteSetting({
    onSuccess: (options: any) => {
      refetch();
      console.log(options);
    },
    onError: ({ response }: any) => {
      // const { data: { 0: { massage } } } = response;
      console.log(response, 'response');
    }
  });

  const handleOpenChange: Onchange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  const onOpenInputClick: StringVoidType = (id) => {
    if (!rowId.includes(id)) {
      setRowId([id, ...rowId]);
    }
    if (rowId.length > 0 && rowId.includes(id)) {
      setRowId(rowId.filter((item) => item !== id));
    }
    setOpenPopover(false);
  };

  const onDeletedQuestion: StringVoidType = (id) => {
    setItemId(id);
    setIsDeletedFieldModal(true);
    setOpenPopover(false);
  };

  const onEditedQuestion: StringVoidType = (id) => {
    const item: any | undefined = templateData.find(
      (elem: any) => elem.id === id
    );
    if (item?.subTitle[0] === 'Dropdown options') {
      setIsVisibleAddField(true);
      setQuestionType('Dropdown options');
    } else {
      setIsVisibleAddField(true);
      setQuestionType(item?.subTitle[0] ?? '');
    }
    setOpenPopover(false);
  };

  const handleCancel: Void = () => {
    setIsDeletedFieldModal(false);
  };
  const handleDelete: Void = () => {
    console.log(itemId, '_________', item);
    deleteSettingsById({ id: itemId });
    setIsDeletedFieldModal(false);
  };

  const onHelpText: FormFinish = (event) => {
    if (event.key === 'Enter') {
      setHelpTextValue([
        ...helpTextValue,
        {
          id: item.id,
          value: event.target.value
        }
      ]);
      event.preventDefault();
    }
  };

  const content: ContentType = (id) => (
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
  );

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
            {item?.setting?.title}
          </Col>
          <Row gutter={[5, 0]}>
            {item?.setting?.data?.length > 0
              ? (
                  item?.setting?.data?.map((option: string) => (
                <Col
                  key={option}
                  style={{
                    color: 'var(--dark-2)',
                    fontSize: 'var(--font-size-small)'
                  }}
                >
                  {option}
                </Col>
                  ))
                )
              : (
              <Col>
                {item?.setting?.answerType === 'SHORT_TEXT'
                  ? 'Short Text'
                  : item?.setting?.answerType === 'NUMBER'
                    ? 'Number'
                    : item?.setting?.answerType === 'ATTACHMENT'
                      ? 'Attachment'
                      : 'Dropdown options'}
              </Col>
                )}
          </Row>
        </Row>
        <Row>
          <Col>
            <Switch
              defaultChecked={item?.active}
              disabled={item?.setting?.changeable === false}
            />
          </Col>
          <Col>
            {item?.setting?.type === 'DEFAULT'
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
                content={() => content(item.setting.id)}
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
        <AsnInput
          onKeyPress={onHelpText}
          className="courseDescriptionInput"
          placeholder="Add help text"
        />
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
            <AsnButton className="primary" onClick={handleDelete}>
              Delete
            </AsnButton>
          </Col>
          <Col>
            <AsnButton onClick={handleCancel} className="default">
              Cancel
            </AsnButton>
          </Col>
        </Row>
      </AsnModal>
    </Fragment>
  );
};

export default QuestionsRow;
