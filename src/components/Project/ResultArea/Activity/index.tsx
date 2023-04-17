import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Form, Row, Tooltip } from 'antd';

import Boxes from '../Boxes';
import { AsnCollapse } from '../../../Collapse';
import { Panel } from '../../../Forms/Collapse';
import { AsnButton } from '../../../Forms/Button';
import { ConfirmModal } from '../../../Forms/Modal/Confirm';
import { HeaderElement, TollTipText } from '../../../../helpers/utils';
import { ReactComponent as DeleteSvg } from '../../../../assets/icons/delete.svg';
import { ReactComponent as InfoSvg } from '../../../../assets/icons/info.svg';
import {
  IInputActivities,
  IProjectModalDelete,
  OnDeleteBoxHandler, ResultAreaOrder
} from '../../../../types/project';
import { Void } from '../../../../types/global';
import { AsnForm } from '../../../Forms/Form';

const tooltipText = [
  'Must include at least one activity and at least one milestone statement.',
  'Code is optional; can contain: A-Z letters, 0-9 digits, symbol (.).',
  'Milestone statement is required; can contain: A-Z letters, 0-9 digits; maximum of 256 characters.',
  'Target for Percentage: Range 1-100.',
  'Target for Number: Range 1-999999.',
  'Target for Attachment: Range 1-100.'
];

const initialActivity: (order: number) => any = (order) => ({
  title: '',
  order,
  milestones: [{ measurement: 'NUMBER' }]
});

const InputActivity: React.FC<{ resultId: number }> = ({
  resultId
}) => {
  const form = AsnForm.useFormInstance();

  const [openDeleteResultModal, setOpenDeleteResultModal] = useState<boolean>();
  const [selectDeleteId, setSelectDeleteId] = useState<IProjectModalDelete>();

  const onDelete: OnDeleteBoxHandler = (remove, field, title, activityName) => {
    setOpenDeleteResultModal(true);
    setSelectDeleteId({ remove, field, title, activityName });
  };

  const onSubmitDelete: Void = () => {
    if (selectDeleteId !== undefined) {
      const { remove, field, title, activityName } = selectDeleteId;

      const deleteName = `deleted${title}Ids`;

      const deletedFields = form.getFieldValue(deleteName) ?? [];

      const currentId = title === 'InputActivity'
        ? form.getFieldValue(['resultAreas', resultId, 'inputActivities', field, 'id'])
        : form.getFieldValue(['resultAreas', resultId, 'inputActivities', activityName ?? '', 'milestones', field, 'id']);

      if (currentId !== undefined) {
        const updateDeletedIds = deletedFields.concat(currentId);

        form.setFieldsValue({ [deleteName]: updateDeletedIds });
      }

      remove(field);

      form.setFieldValue(
        ['resultAreas', resultId, 'inputActivities'],
        form.getFieldValue(['resultAreas', resultId, 'inputActivities']).map((d: IInputActivities, i: number) => {
          d.order = i + 1;
          return d;
        })
      );
    }
    setOpenDeleteResultModal(false);
  };

  const order: ResultAreaOrder = (index) => form.getFieldValue('resultAreas')[resultId].inputActivities[index].order;

  return (
    <>
      <div className="panel">
        <div className="activity-heder">
          <span className="ans-title">
            <span>
              Please input at least one activity for the Resultasd area{' '}
              {resultId + 1} *
            </span>
          </span>
          <div className="activity-panel">
            <div>
              <span className="activity-title">Input Activity* </span>
              <Tooltip
                overlayClassName="result-area-tooltip"
                placement="right"
                style={{ width: '600px' }}
                title={TollTipText(...tooltipText)}
              >
                <InfoSvg />
              </Tooltip>
            </div>
            <div className="activity-list">
              <Form.List name={[resultId, 'inputActivities']}>
                {(activities, { add: addActivity, remove }) => (
                  <>
                    {activities.map((activity, index: number) => (
                      <div
                        key={`activity_${resultId}_${activity.key}`}
                        className="activity-block"
                      >
                        <AsnCollapse
                          id={`activity_${resultId}_${activity.key}`}
                        >
                          <Panel
                            key={`activity_${resultId}_${activity.key}`}
                            header={HeaderElement(
                              `activity_${resultId}_${activity.key}`,
                              [activity.name, 'title'],
                              `${resultId + 1}.${order(index)}.`,
                              'Individuals with improved soft skills',
                              'activity_header_'
                            )}
                          >
                            <Form.List name={[activity.name, 'milestones']}>
                              {(milestones, { add, remove }) => (
                                <Boxes
                                  type={'milestones'}
                                  key={uuid()}
                                  add={add}
                                  onDelete={(remove, field) =>
                                    onDelete(remove, field, 'Milestone', activity.name)
                                  }
                                  remove={remove}
                                  list={milestones}
                                  resultId={resultId}
                                  activityId={activity.key + 1}
                                />
                              )}
                            </Form.List>
                          </Panel>
                        </AsnCollapse>
                        {activities.length > 1 && (
                          <div
                            className="delete-activity"
                            onClick={() =>
                              onDelete(remove, activity.name, 'InputActivity')
                            }
                          >
                            <DeleteSvg />
                          </div>
                        )}
                      </div>
                    ))}
                    <Row>
                      <AsnButton
                        className="transparent"
                        value="Create"
                        onClick={() => {
                          addActivity(initialActivity(activities.length + 1));
                        }}
                      >
                        +Add Sub-Activity
                      </AsnButton>
                    </Row>
                  </>
                )}
              </Form.List>
            </div>
          </div>
        </div>
      </div>
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

export default InputActivity;
