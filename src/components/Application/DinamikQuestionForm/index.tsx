import React from 'react';
import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from '../../../../../assets/icons/delete.svg';
import { Col } from 'antd';
import { AsnForm } from '../../Forms/Form';
import { AsnInput } from '../../Forms/Input';
import { AsnButton } from '../../Forms/Button';

const BottomField = styled.div`
  width: 100%;
  border-radius: 6px;
  gap: 1rem;
  border: 1px solid var(--light-border-gray);
  padding: 0.5rem;
  margin-top: 2rem;

  .ant-form-item-control-input-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 11px;
  }

  .ant-input {
    width: 95% !important;
    border: 1px solid var(--light-border-gray);
  }
  .ant-btn {
    width: 95% !important;
    border: 1px solid var(--light-border-gray);
    margin-top: 1rem;
  }

  .ant-col-sm-20 {
    max-width: 100% !important;
    margin-left: 0px !important;
  }

  svg {
    cursor: pointer;
    margin-right: 1rem;
  }

  .ant-form-item {
    margin: 0 0 8px !important;
  }
`;

const DynamicQuestionForm: React.FC = () => {
  return (
    <BottomField>
      <AsnForm.List name="names">
        {(fields, { add, remove }, { errors }) => (
          <>
            <Col
              style={{
                maxHeight: '16.3rem',
                overflow: 'auto',
                width: '100%'
              }}
            >
              {fields.map((field) => (
                <AsnForm.Item key={field.key}>
                  <AsnForm.Item
                    {...field}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        min: 1,
                        max: 256,
                        message:
                          'Field must have at least 1 character and maximum 255 characters.'
                      }
                    ]}
                    noStyle
                  >
                    <AsnInput placeholder="Add option" />
                  </AsnForm.Item>
                  {fields.length > 2
                    ? (
                    <DeleteIcon
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                      )
                    : null}
                </AsnForm.Item>
              ))}
            </Col>
            <AsnForm.Item>
              <AsnButton onClick={() => add()}>+Add options</AsnButton>
              <AsnForm.ErrorList errors={errors} />
            </AsnForm.Item>
          </>
        )}
      </AsnForm.List>
    </BottomField>
  );
};

export default DynamicQuestionForm;
