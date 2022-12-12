import React from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';

import { ReactComponent as DeleteSvg } from '../../../../assets/icons/delete.svg';
import { AsnForm } from '../../../Forms/Form';
import { AsnCollapse } from '../../../Collapse';
import { Panel } from '../../../Forms/Collapse';
import { AsnInput } from '../../../Forms/Input';
import { AsnButton } from '../../../Forms/Button';
import { IProjectDetailsItems } from '../../../../types/project';

const FormList = styled(AsnForm.List)`
  button {
    height: 44px !important;
    box-shadow: 0 4px 4px rgba(42, 85, 120, 0.05);
    border-radius: 6px;
  }
`;

const placeHolderInputDetails: (name: string) => string = (name) =>
  name === 'Organizations'
    ? 'Your Organization'
    : name === 'Regions'
      ? 'Region/Marz* '
      : 'Example: IT*';

export const Items: React.FC<IProjectDetailsItems> = ({ title, name, onDelete, form }) => {
  const deleteHandler: (remove: any, fieldName: string) => void = (remove, fieldName) => {
    onDelete(remove, fieldName);

    const deleteName = `deleted${title.slice(0, -1)}Ids`;

    const deletedFields = form.getFieldValue(deleteName) ?? [];

    form.setFieldsValue({ [deleteName]: deletedFields.concat(form.getFieldValue(name)[fieldName].id) });
  };

  return (
    <FormList name={name}>
      {(fields: any[], { add, remove }: any, { errors }: any) => (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <AsnCollapse key={title} id={title}>
              <Panel key={title} className="input-rows" header={title}>
                {fields.map((field, index) => (
                  <Row key={index}>
                    <Col span={24}>
                        <Row>
                          <Col span={24}>
                            <AsnForm.Item
                              style={{ marginBottom: '22px' }}
                              name={[field.name, 'title']}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[{ required: true, min: 2, max: 256 }]}
                            >
                              <AsnInput
                                placeholder={placeHolderInputDetails(title)}
                              />
                            </AsnForm.Item>
                          </Col>
                          <Col span={1} className="delete">
                            {fields.length > 1
                              ? (
                                <Row align={'middle'} className="delete-item">
                                  <Col span={12}>
                                    <DeleteSvg
                                      className="dynamic-delete-button"
                                      onClick={() => deleteHandler(remove, field.name)}
                                    />
                                  </Col>
                                </Row>
                                )
                              : null}
                          </Col>
                        </Row>
                    </Col>
                  </Row>
                ))}
                <Row className="last-item-footer">
                  <Col span={24}>
                    <AsnForm.Item>
                      <AsnButton className="transparent" onClick={() => add()}>+Add {name}</AsnButton>
                    </AsnForm.Item>
                  </Col>
                </Row>
              </Panel>
            </AsnCollapse>
          </Col>
        </Row>
      )}
    </FormList>
  );
};
