import React, { useState } from 'react';
import { Form, FormInstance, Row, Tooltip } from 'antd';

import InputActivity from './../Activity';
import { InputResultArea } from '../style';
import InputExpectedResult from '../Expected';
import { AsnCollapse } from '../../../Collapse';
import { Panel } from '../../../Forms/Collapse';
import { AsnButton } from '../../../Forms/Button';
import { ConfirmModal } from '../../../Forms/Modal/Confirm';
import { TollTipText, HeaderElement } from '../../../../helpers/utils';
import { ReactComponent as InfoSvg } from '../../../../assets/icons/info.svg';
import { ReactComponent as DeleteSvg } from '../../../../assets/icons/delete.svg';
import {
  DeleteResultArea,
  IProjectResultAreaDelete,
  IResultAreaData,
  IResultAreas,
  ResultAreaOrder
} from '../../../../types/project';
import { Void } from '../../../../types/global';
import { AsnForm } from '../../../Forms/Form';

const tooltipText = [
  'Code is optional; can contain: A-Z letters, 0-9 digits, symbol (.).',
  'Expected result statement is required; can contain: A-Z letters, 0-9 digits; maximum of 256 characters.',
  'Target for Percentage: Range 1-100.',
  'Target for Number: Range 1-999999.'
];

const initialResultArea: (order: number) => IResultAreaData = (order) => ({
  title: '',
  order,
  expectedResults: [{ measurement: 'NUMBER' }],
  inputActivities: [
    { title: '', order: 1, milestones: [{ measurement: 'NUMBER' }] }
  ]
});

const InputResult: React.FC = () => {
  const form: FormInstance = AsnForm.useFormInstance();

  const [openDeleteResultModal, setOpenDeleteResultModal] = useState<boolean>();
  const [selectDeleteId, setSelectDeleteId] =
    useState<IProjectResultAreaDelete>();

  const onSubmitDelete: Void = () => {
    if (selectDeleteId !== undefined) {
      const { remove, field } = selectDeleteId;

      const deleteName = 'deletedResultAreaIds';

      const deletedFields = form.getFieldValue(deleteName) ?? [];

      const currentId = form.getFieldValue('resultAreas')[field ?? ''].id;

      if (currentId !== undefined) {
        const updateDeletedIds = deletedFields.concat(currentId);

        form.setFieldsValue({ [deleteName]: updateDeletedIds });
      }

      remove(field);

      form.setFieldValue(
        'resultAreas',
        form.getFieldValue('resultAreas').map((d: IResultAreas, i: number) => {
          d.order = i + 1;
          return d;
        })
      );
    }
    setOpenDeleteResultModal(false);
  };

  const deleteResultHandler: DeleteResultArea = (remove, field) => {
    setOpenDeleteResultModal(true);
    setSelectDeleteId({ remove, field });
  };

  const order: ResultAreaOrder = (index) => {
    return form.getFieldValue('resultAreas')[index].order;
  };

  return (
    <>
      <Form.List name="resultAreas">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index: number) => (
              <InputResultArea key={field.key}>
                <span
                  id={`ans-title-${field.key}`}
                  className="ans-title result_area_title"
                >
                  <span>Input Objective {order(field.name)} *</span>
                  <Tooltip
                    overlayClassName="result-area-tooltip"
                    placement="right"
                    style={{ width: '600px' }}
                    title={TollTipText(...tooltipText)}
                  >
                    <InfoSvg />
                  </Tooltip>
                </span>
                <div className="result-container">
                  <div className="result-area">
                    <AsnCollapse id={`${field.key}`}>
                      <Panel
                        key={`${field.key}`}
                        header={HeaderElement(
                          field.key,
                          [field.name, 'title'],
                          `${order(field.name)}.`,
                          'Example: Skill gap reduced',
                          'result_area_header_'
                        )}
                      >
                        <InputExpectedResult resultId={field.name} />
                        <InputActivity resultId={field.name} />
                      </Panel>
                    </AsnCollapse>
                  </div>
                  {fields.length > 1 && (
                    <div
                      className="delete-result"
                      onClick={() => deleteResultHandler(remove, field.name)}
                    >
                      <DeleteSvg />
                    </div>
                  )}
                </div>
              </InputResultArea>
            ))}
            <Row>
              <AsnButton
                className="transparent"
                value="Create"
                onClick={() => add(initialResultArea(fields.length + 1))}
              >
                +Add Objective
              </AsnButton>
            </Row>
          </>
        )}
      </Form.List>
      <ConfirmModal
        styles={{ gap: '6rem' }}
        yes="Delete"
        no="Cancel"
        open={openDeleteResultModal}
        title="Are you sure you want to delete  the field?"
        onSubmit={onSubmitDelete}
        onCancel={() => setOpenDeleteResultModal(false)}
      />
    </>
  );
};

export default InputResult;
