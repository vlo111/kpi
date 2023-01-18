import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Radio, Space } from 'antd';
import {
  BorderBottomInput,
  CustomRadio,
  DividerLine,
  FormText,
  SectionTitle
} from '../style';

const EducationsWorkContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InsideRow = styled.div`
  display: flex;
  justify-content: start;
`;

const EducationsWork: React.FC<{
  educations: any
  educationLevel: any
  areStudent: any
  hasJobsIncome: any
}> = ({ educations, educationLevel, areStudent, hasJobsIncome }) => {
  const educationForm = Form.useFormInstance();
  const [areYouAgree, setAreYouAgree] = useState(true);
  const [haveYouJob, setHaveYouJob] = useState(true);

  return (
    <EducationsWorkContainer>
      <SectionTitle>Education & Work / Կրթություն և աշխատանք</SectionTitle>
      <FormText style={{ marginBottom: '1rem', marginTop: '1rem' }}>
        Are you a student? / Ներկայումս սովորում ե՞ք*
      </FormText>
      <Form.Item name={['educational_info', 0, 'answers', 0, 'id']}>
        <Radio.Group onChange={() => setAreYouAgree(!areYouAgree)}>
          <Space direction="vertical">
            {areStudent?.map((student: any) => (
              <CustomRadio value={student.id} key={student.id}>
                {student.text}
              </CustomRadio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      {areYouAgree && (
        <>
          <FormText style={{ marginBottom: '1rem' }}>
            Where do you study? / Որտե՞ղ եք սովորում *
          </FormText>
          <Form.Item name={['educational_info', 4, 'answers', 0, 'id']}>
            <Radio.Group>
              <Space direction="vertical">
                {educations?.map((educationalInstitution: any) => (
                  <div key={educationalInstitution.id}>
                    {educationalInstitution.text === 'Other/Այլ'
                      ? (
                      <DividerLine>
                        <CustomRadio
                          value={educationalInstitution.id}
                          key={educationalInstitution.id}
                        >
                          Other/Այլ
                        </CustomRadio>
                        <BorderBottomInput />
                      </DividerLine>
                        )
                      : (
                      <CustomRadio
                        value={educationalInstitution.id}
                        key={educationalInstitution.id}
                      >
                        {educationalInstitution.text}
                      </CustomRadio>
                        )}
                  </div>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </>
      )}

      <FormText style={{ marginBottom: '1rem' }}>
        Education level/Ի՞նչ մակարդակի կրթություն ունեք (ավարտած)*
      </FormText>
      <Form.Item name={['educational_info', 1, 'answers', 0, 'id']}>
        <Radio.Group>
          <Space direction="vertical">
            {educationLevel?.map((education: any) => (
              <CustomRadio value={education.id} key={education.id}>
                {education.text}
              </CustomRadio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
      <InsideRow>
        <FormText>Your profession / Ի՞նչ մասնագիտություն ունեք*</FormText>
        <Form.Item
          name={['educational_info', 2, 'answers', 0, 'text']}
          rules={[{ required: true, message: 'The field is required' }]}
        >
          <BorderBottomInput />
        </Form.Item>
      </InsideRow>

      <FormText style={{ marginBottom: '1rem' }}>
        {educationForm.getFieldValue('income')}
      </FormText>
      <Form.Item name={['educational_info', 3, 'answers', 0, 'id']}>
        <Radio.Group onChange={() => setHaveYouJob(!haveYouJob)}>
          <Space direction="vertical">
            {hasJobsIncome?.map((jobIncome: any) => (
              <CustomRadio value={jobIncome.id} key={jobIncome.id}>
                {jobIncome.text}
              </CustomRadio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      {haveYouJob && (
        <>
          <InsideRow>
            <FormText>Your position / Ձեր պաշտոնը, հաստիքը*</FormText>
            <Form.Item
              name={['educational_info', 5, 'answers', 0, 'text']}
              rules={[{ required: true, message: 'The field is required' }]}
            >
              <BorderBottomInput />
            </Form.Item>
          </InsideRow>
          <InsideRow>
            <FormText>Work organization / Նշեք կազմակերպությունը*</FormText>
            <Form.Item
              name={['educational_info', 6, 'answers', 0, 'text']}
              rules={[{ required: true, message: 'The field is required' }]}
            >
              <BorderBottomInput />
            </Form.Item>
          </InsideRow>
        </>
      )}
    </EducationsWorkContainer>
  );
};

export default EducationsWork;
