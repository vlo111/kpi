import React from 'react';
import styled from 'styled-components';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { Col, Form } from 'antd';
import { AsnInput } from '../../Forms/Input';
import { AsnButton } from '../../Forms/Button';

const BottomField = styled.div`
  width: 100%;
  background-color: var(--white);
  border-radius: 20px;
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 1rem 1rem 1rem 2rem;
  margin-bottom: 1rem;

  .ant-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .formInputContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 11px !important;
    margin-right: 10px;
  }

  .ant-input {
    width: 98% !important;
    border: 1px solid var(--light-border-gray);
  }
  .ant-btn {
    width: 98% !important;
    border: 1px solid var(--light-border-gray);
    margin-top: 1rem;
  }

  .ant-col-sm-20 {
    max-width: 100% !important;
    margin-left: 0px !important;
  }
`;

const DynamicForm: React.FC = () => {
  return (
    <BottomField>
      <Form.List name="names">
        {(fields, { add, remove }, { errors }) => (
          <>
            <Col
              style={{
                maxHeight: '11rem',
                overflow: 'auto'
              }}
            >
              {fields.map((field) => (
                <div className="formInputContainer" key={field.key}>
                  <Form.Item
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
                    <AsnInput placeholder="Example" />
                  </Form.Item>
                  {fields.length > 1
                    ? (
                    <DeleteIcon
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                      )
                    : null}
                </div>
              ))}
            </Col>
            <Form.Item>
              <AsnButton onClick={() => add()} className="default">
                +Add options
              </AsnButton>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </BottomField>
  );
};

export default DynamicForm;
