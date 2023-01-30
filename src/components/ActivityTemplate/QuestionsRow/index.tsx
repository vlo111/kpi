import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Col, Popover, Row, Switch, Tooltip } from 'antd';
import { ReactComponent as HelperTextIcon } from '../../../assets/icons/helper-text.svg';
import { ReactComponent as MenuIcon } from '../../../assets/icons/md-menu.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { ReactComponent as DeleteHelpTextIcon } from '../../../assets/icons/closeIcon.svg';
import { AsnInput } from '../../Forms/Input';
import { AsnModal } from '../../Forms/Modal';
import { AsnButton } from '../../Forms/Button';
import {
  FormFinish,
  Onchange,
  Void
} from '../../../types/global';
import { ICreatedFieldItem, IQuestionsRow } from '../../../types/project';
import useDeleteSetting from '../../../api/Activity/Template/Settings/useDeleteSingleSetting';
import useAddSettingHelpText from '../../../api/Activity/Template/Settings/useAddSettingHelpText';
import useUpdateSettingStatus from '../../../api/Activity/Template/Settings/useUpdateSettingStatus';

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
const InputHelpText = styled(AsnInput)`
  cursor: pointer;
  .ant-input-suffix {
    display: none;
  }
  :hover {
    .ant-input-suffix {
      display: flex;
    }
  }
`;

const QuestionsRow: React.FC<IQuestionsRow> = ({
  item,
  setItem,
  setQuestionType,
  setIsVisibleAddField,
  refetch
}) => {
  const [rowId, setRowId] = useState<string[]>([]);
  const [itemId, setItemId] = useState<string>('');
  const [isDeletedFieldModal, setIsDeletedFieldModal] =
    useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [helpText, setHelpText] = useState<string>('');
  const { mutate: deleteSettingsById } = useDeleteSetting({
    onSuccess: () => {
      refetch();
    }
  });

  const { mutate: updateTemplateStatus } = useUpdateSettingStatus({
    onSuccess: () => {
      refetch();
    }
  });

  const { mutate: addedHelpText } = useAddSettingHelpText({
    onSuccess: () => {
      refetch();
    }
  });

  const handleOpenChange: Onchange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  useEffect(() => {
    if (item?.helpText != null) {
      setHelpText(item?.helpText);
    }
  }, [item?.helpText]);

  const handleStatusChange: Void = () => {
    updateTemplateStatus({
      id: item.id
    });
  };

  const onOpenInputClick = (item: ICreatedFieldItem): void => {
    if (!rowId.includes(item.id)) {
      setRowId([item.id, ...rowId]);
    }
    if (rowId.length > 0 && rowId.includes(item.id)) {
      setRowId(rowId.filter((id) => id !== item.id));
    }
    setOpenPopover(false);
  };

  const onDeletedQuestion = (item: ICreatedFieldItem): void => {
    setItemId(item.setting.id);
    setIsDeletedFieldModal(true);
    setOpenPopover(false);
  };

  const onEditedQuestion: FormFinish = (item) => {
    if (item?.setting.answerType === 'DROPDOWN') {
      setIsVisibleAddField(true);
      setQuestionType('DROPDOWN');
    } else {
      setIsVisibleAddField(true);
      setQuestionType(item?.answerType);
    }
    setItem(item);
    setIsVisibleAddField(true);

    setOpenPopover(false);
  };

  const handleCancel: Void = () => {
    setIsDeletedFieldModal(false);
  };

  const handleDelete: Void = () => {
    deleteSettingsById({ id: itemId });
    setIsDeletedFieldModal(false);
  };

  const onHelpText: FormFinish = (event) => {
    if (event.key === 'Enter') {
      addedHelpText({
        id: item.id,
        data: {
          text: event.target.value
        }
      });
      event.preventDefault();
    }
  };

  const onDeleteHelpText: Void = () => {
    if (item.helpText !== null && item.helpText !== '') {
      addedHelpText({
        id: item.id,
        data: {
          text: ''
        }
      });
    }
  };

  const content: (i: ICreatedFieldItem) => JSX.Element = (item) => {
    return (
    <Row
      style={{
        fontSize: 'var(--font-size-small)',
        color: 'var(--dark-2)',
        cursor: 'pointer'
      }}
      gutter={[8, 8]}
    >
      <Col onClick={() => onOpenInputClick(item)} span={24}>
        <HelperTextIcon /> Add help text
      </Col>
      <Col onClick={() => onEditedQuestion(item)} span={24}>
        <EditIcon /> Edit
      </Col>
      <Col onClick={() => onDeletedQuestion(item)} span={24}>
        <DeleteIcon /> Delete
      </Col>
    </Row>
    );
  };
  return (
    <Fragment>
      <CourseList>
        <Row
          style={{
            width: '90%'
          }}
        >
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
                  item?.setting?.data?.map((option: string, index: number) => (
                <Col
                  key={option + `${index}`}
                  style={{
                    color: 'var(--dark-4)',
                    fontSize: 'var(--font-size-small)'
                  }}
                >
                  {option},
                </Col>
                  ))
                )
              : (
              <Col
                style={{
                  color: 'var(--dark-4)',
                  fontSize: 'var(--font-size-small)'
                }}
              >
                {item?.setting?.answerType === 'SHORT_TEXT'
                  ? 'Short Text'
                  : item?.setting?.answerType === 'NUMBER'
                    ? 'Number'
                    : item?.setting?.answerType === 'ATTACHMENT'
                      ? 'Attachment'
                      : item?.setting?.answerType === 'DROPDOWN'
                        ? 'Dropdown options'
                        : ''}
              </Col>
                )}
          </Row>
        </Row>
        <Row>
          <Col>
            <Switch
              defaultChecked={item?.active}
              disabled={item?.setting?.changeable === false}
              onChange={handleStatusChange}
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
                <IconButton onClick={() => onOpenInputClick(item)}>
                  <HelperTextIcon />
                </IconButton>
              </Tooltip>
                )
              : (
              <Popover
                placement="topLeft"
                content={() => content(item)}
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
        <InputHelpText
          onKeyPress={onHelpText}
          className="courseDescriptionInput"
          placeholder="Add help text"
          suffix={<DeleteHelpTextIcon onClick={onDeleteHelpText} />}
          onChange={(even) => setHelpText(even.target.value)}
          value={helpText}
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
