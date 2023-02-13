import React from 'react';
import styled from 'styled-components';
import { Radio, Space, Typography } from 'antd';
import { AsnButton } from '../../Forms/Button';
import { AsnForm } from '../../Forms/Form';
import { AsnInput } from '../../Forms/Input';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { ButtonsContainer, ScoreInputNumber } from '../DynamicAssessmentForm';
import { AsnCheckbox } from '../../Forms/Checkbox';

const { Title } = Typography;

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const AnswersInput = styled(AsnInput)`
  border-radius: 0px;
  width: 100%;
  border: 1px solid var(--light-border);
  :hover {
    border: 1px solid var(--light-border) !important;
  }
`;

const AddAnswerButton = styled(AsnButton)`
  border-radius: 0px !important;
  border: 1px solid var(--light-border) !important;
  padding: 0rem 3rem;
  width: 37%;
  span {
    color: var(--dark-2);
  }
`;

const DynamicQuestionForm: React.FC<any> = ({ contentName, answerType }) => {
  const form = AsnForm.useFormInstance();

  return (
    <AsnForm.List name={contentName} initialValue={['', '']}>
      {(answerList, { add, remove }) => (
        <>
          {form.getFieldsValue().questions?.[contentName[0]].type ===
          'OPTION'
            ? (
            <Radio.Group>
              {answerList.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'space-between'
                  }}
                  align="baseline"
                >
                  <AsnForm.Item {...restField} name={[name]}>
                    <Radio value={name}>
                      <AsnForm.Item
                        {...restField}
                        name={[name, 'title']}
                        rules={[
                          { required: true, message: 'Missing first name' }
                        ]}
                      >
                        <AnswersInput placeholder={`Option ${key + 1}`} />
                      </AsnForm.Item>
                    </Radio>
                  </AsnForm.Item>
                  <Space>
                {/* {form.getFieldsValue().questions?.[contentName[0]]?.answers[
                  name
                ]?.radio !== undefined && ( */}
                  <ScoreContainer>
                    <Title
                      level={5}
                      style={{
                        fontWeight: '400',
                        margin: '0 0.5rem 0 ',
                        fontSize: 'var(--base-font-size)'
                      }}
                    >
                      Score
                    </Title>
                    <AsnForm.Item
                      {...restField}
                      name={[name, 'score']}
                      rules={[
                        { required: true, message: 'Missing first name' }
                      ]}
                    >
                      <ScoreInputNumber className="primary" min={0} />
                    </AsnForm.Item>
                  </ScoreContainer>
                {/* )} */}
                {answerList.length <= 2
                  ? null
                  : (
                  <DeleteIcon onClick={() => remove(name)} />
                    )}
              </Space>
                </Space>
              ))}

            </Radio.Group>
              )
            : form.getFieldsValue().questions?.[contentName[0]].type ===
            'CHECKBOX'
              ? (
            <AsnCheckbox.Group>
              {answerList.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'space-between'
                  }}
                  align="baseline"
                >
                  <AsnForm.Item name={[name]}>
                    <AsnCheckbox value={name}>
                      <AsnForm.Item
                        {...restField}
                        name={[name, 'title']}
                        rules={[
                          { required: true, message: 'Missing first name' }
                        ]}
                      >
                        <AnswersInput placeholder={`Option ${key + 1}`} />
                      </AsnForm.Item>
                    </AsnCheckbox>
                  </AsnForm.Item>
                  <Space>
                {/* {form.getFieldsValue().questions?.[contentName[0]]?.answers[
                  name
                ]?.checkbox !== undefined && ( */}
                  <ScoreContainer>
                    <Title
                      level={5}
                      style={{
                        fontWeight: '400',
                        margin: '0 0.5rem 0 ',
                        fontSize: 'var(--base-font-size)'
                      }}
                    >
                      Score
                    </Title>
                    <AsnForm.Item
                      {...restField}
                      name={[name, 'score']}
                      rules={[
                        { required: true, message: 'Missing first name' }
                      ]}
                    >
                      <ScoreInputNumber className="primary" min={0} />
                    </AsnForm.Item>
                  </ScoreContainer>
                {/* )} */}
                {answerList.length <= 2
                  ? null
                  : (
                  <DeleteIcon onClick={() => remove(name)} />
                    )}
              </Space>
                </Space>
              ))}

            </AsnCheckbox.Group>
                )
              : null}
          <AsnForm.Item>
            <ButtonsContainer
              style={{
                justifyContent: 'flex-start',
                gap: '2rem'
              }}
            >
              <AddAnswerButton className="default" onClick={() => add()}>
                +Add Option
              </AddAnswerButton>
              <AddAnswerButton
                className="default"
                onClick={() => add('Other...')}
              >
                +Add Other
              </AddAnswerButton>
            </ButtonsContainer>
          </AsnForm.Item>
        </>
      )}
    </AsnForm.List>
  );
};

export default DynamicQuestionForm;

//  {/* {answerList.map(({ key, name, ...restField }) => (
//             <Space
//               key={key}
//               style={{
//                 display: 'flex',
//                 marginBottom: 8,
//                 justifyContent: 'space-between'
//               }}
//               align="baseline"
//             >
//               {form.getFieldsValue().questions?.[contentName[0]].type ===
//               'OPTION'
//                 ? (
//                 <AsnForm.Item name={[name, 'radio']}>
//                   <Radio.Group>
//                     <Radio value={name}>
//                       <AsnForm.Item
//                         {...restField}
//                         name={[name, 'title']}
//                         rules={[
//                           { required: true, message: 'Missing first name' }
//                         ]}
//                       >
//                         <AnswersInput placeholder={`Option ${key + 1}`} />
//                       </AsnForm.Item>
//                     </Radio>
//                   </Radio.Group>
//                 </AsnForm.Item>
//                   )
//                 : form.getFieldsValue().questions?.[contentName[0]].type ===
//                 'CHECKBOX'
//                   ? (
//                 <AsnForm.Item name={[name, 'checkbox']}>
//                   <AsnCheckbox.Group>
//                     <AsnCheckbox value={name}>
//                       <AsnForm.Item
//                         {...restField}
//                         name={[name, 'title']}
//                         rules={[
//                           { required: true, message: 'Missing first name' }
//                         ]}
//                       >
//                         <AnswersInput placeholder={`Option ${key + 1}`} />
//                       </AsnForm.Item>
//                     </AsnCheckbox>
//                   </AsnCheckbox.Group>
//                 </AsnForm.Item>
//                     )
//                   : null}
//               <Space>
//                 {form.getFieldsValue().questions?.[contentName[0]]?.answers[
//                   name
//                 ]?.radio !== undefined && (
//                   <ScoreContainer>
//                     <Title
//                       level={5}
//                       style={{
//                         fontWeight: '400',
//                         margin: '0 0.5rem 0 ',
//                         fontSize: 'var(--base-font-size)'
//                       }}
//                     >
//                       Score
//                     </Title>
//                     <AsnForm.Item
//                       {...restField}
//                       name={[name, 'score']}
//                       rules={[
//                         { required: true, message: 'Missing first name' }
//                       ]}
//                     >
//                       <ScoreInputNumber className="primary" min={0} />
//                     </AsnForm.Item>
//                   </ScoreContainer>
//                 )}
//                 {answerList.length <= 2
//                   ? null
//                   : (
//                   <DeleteIcon onClick={() => remove(name)} />
//                     )}
//               </Space>
//             </Space>
//           ))} */}
