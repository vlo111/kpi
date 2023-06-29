import React from 'react';
import { Col, Row, Space } from 'antd';
import styled from 'styled-components';

import { ReactComponent as DeleteSvg } from '../../../../assets/icons/delete.svg';
import { AsnForm } from '../../../Forms/Form';
import { AsnCollapse } from '../../../Collapse';
import { Panel } from '../../../Forms/Collapse';
import { AsnInput } from '../../../Forms/Input';
import { AsnButton } from '../../../Forms/Button';
import { IProjectDetailsItems, IProjectRegion } from '../../../../types/project';
import { AsnCheckbox } from '../../../Forms/Checkbox';
import { defaultRegions } from '../../../../helpers/constants';

const FormList = styled(AsnForm.List)`
  button {
    height: 44px !important;
    box-shadow: 0 4px 4px rgba(42, 85, 120, 0.05);
    border-radius: 6px;
  }
`;

const AntCheckbox = styled(AsnCheckbox)`
  .ant-checkbox+span{
    background: var( --white);
    width: 100%;
    padding: 10px;
    box-shadow: none;
    border: 1px solid var(--dark-5);
    margin-left: 10px;
  }
`;

const placeHolderInputDetails: (name: string) => string = (name) =>
  name === 'Organizations'
    ? 'Your Organization'
    : name === 'Regions'
      ? 'Region/Marz* '
      : 'Example: IT*';

export const Items: React.FC<IProjectDetailsItems> = ({ title, name, onDelete, regions }) => {
  const form = AsnForm.useFormInstance();

  const handleChecked = (checked: boolean, region: string): void => {
    if (checked) {
      const error = form.getFieldError('regions');
      (error.length > 0) && form.setFields(([{ name: 'regions', errors: [] }]));
      const regions = form.getFieldValue('regions');
      const regionTitles: string[] = regions.map((item: IProjectRegion) => item.title);
      if (!regionTitles.includes(region)) {
        form.setFieldValue(['regions'], [...regions, { title: region }]);
      }
      if (regionTitles.includes(region)) {
        const regionId = regions.filter((item: IProjectRegion) => item.title === region)[0].id;
        const filterRegionsId = form.getFieldValue('deletedRegionIds').filter((id: string) => id !== regionId);
        form.setFieldValue(['deletedRegionIds'], [...filterRegionsId]);
      }
    }

    if (!checked) {
      const checkedRegion = form.getFieldValue('regions')?.filter((item: IProjectRegion) => item.title === region)[0];
      if (checkedRegion?.id !== undefined) {
        const deletedRegions = form.getFieldValue('deletedRegionIds');
        form.setFieldValue(['deletedRegionIds'], [...deletedRegions, checkedRegion.id]);
      } else {
        const regions = form.getFieldValue('regions')?.filter((item: IProjectRegion) => item.title !== region);
        form.setFieldValue(['regions'], [...regions]);
      }
    }
  };

  return (
    <FormList
      name={name}
      rules={[
        {
          validator: async (_, file) => {
            const regions = form.getFieldValue('regions');
            const deletedRegions = form.getFieldValue('deletedRegionIds');
            if ((file.length === 0 || (regions.length === deletedRegions.length)) && name === 'regions') {
              return await Promise.reject(new Error('Please check at least one answer'));
            }
          }
        }
      ]}
    >
      {(fields: any[], { add, remove }: any, { errors }: any) => (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <AsnCollapse key={title} id={title}>
              <Panel key={title} className="input-rows" header={title}>
                {name === 'regions' &&
                  <>
                    <AsnForm.ErrorList errors={errors} />
                    <Space direction="vertical" size={16} style={{ width: '100%' }}>
                      {defaultRegions?.map((region, i) => (
                        <AsnForm.Item
                          style={{ marginBottom: '0px' }}
                          key={i}
                        >
                          <AntCheckbox
                            value={region}
                            defaultChecked={regions?.includes(region)}
                            onChange={(e) => handleChecked(e.target.checked, region)}
                            style={{ fontSize: 'var( --base-font-size)', width: '100%' }}
                          >
                            {region}
                          </AntCheckbox>
                        </AsnForm.Item>
                      ))}
                    </Space>
                  </>
                }
                {name !== 'regions' && fields.map((field, index) => (
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
                                    onClick={() => {
                                      onDelete(remove, field.name, title);
                                    }}
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
                {name !== 'regions' && <Row className="last-item-footer">
                  <Col span={24}>
                    <AsnForm.Item>
                      <AsnButton className="transparent" onClick={() => add()}>+Add {name}</AsnButton>
                    </AsnForm.Item>
                  </Col>
                </Row>}
              </Panel>
            </AsnCollapse>
          </Col>
        </Row>
      )}
    </FormList>
  );
};
