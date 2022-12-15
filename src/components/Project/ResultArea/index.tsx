import React, { useState } from 'react';
import { Form, Row, Tooltip } from 'antd';

import InputActivity from './Activity';
import { InputResultArea } from './style';
import InputExpectedResult from './Expected';
import { AsnCollapse } from '../../Collapse';
import { Panel } from '../../Forms/Collapse';
import { AsnButton } from '../../Forms/Button';
import { ConfirmModal } from '../../Forms/Modal/Confirm';
import { TollTipText, HeaderElement } from '../../../helpers/utils';
import { ReactComponent as InfoSvg } from '../../../assets/icons/info.svg';
import { ReactComponent as DeleteSvg } from '../../../assets/icons/delete.svg';
import { IProjectResultAreaDelete } from '../../../types/project';
import { Void } from '../../../types/global';
import { AsnForm } from '../../Forms/Form';

const tooltipText = [
  'Must include at least one result area and at least one expected result measurement.',
  'Must include at least one result area and at least one expected result measurement.',
  'Code is optional; can contain: A-Z letters, 0-9 digits, symbol (.).',
  'Expected result statement is required; can contain: A-Z letters, 0-9 digits; maximum of 256 characters.',
  'Target for Percentage: Range 1-100.',
  'Target for Number: Range 1-999999.'
];

const InputResult: React.FC = () => {
  const form = AsnForm.useFormInstance();

  const [openDeleteResultModal, setOpenDeleteResultModal] = useState<boolean>();
  const [selectDeleteId, setSelectDeleteId] = useState<IProjectResultAreaDelete>();

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
    }
    setOpenDeleteResultModal(false);
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
                  <span>Input Result Area {index + 1} *</span>
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
                          `${index + 1}.`,
                          'Example: Skill gap reduced',
                          'result_area_header_'
                        )}
                      >
                        <InputExpectedResult resultId={field.key} />
                        <InputActivity resultId={field.key} />
                      </Panel>
                    </AsnCollapse>
                  </div>
                  {fields.length > 1 && (
                    <div
                      className="delete-result"
                      onClick={() => {
                        setOpenDeleteResultModal(true);
                        setSelectDeleteId({ remove, field: field.name });
                      }}
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
                onClick={() =>
                  add({
                    title: '',
                    expectedResults: [{ measurement: 'NUMBER' }],
                    inputActivities: [{ title: '', milestones: [{ measurement: 'NUMBER' }] }]
                  })
                }
              >
                +Add Result Area
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
