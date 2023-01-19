import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Form, Radio, RadioChangeEvent, Space } from 'antd';
// import { education, previewData, study } from '../../../../../helpers/fakeData';
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

const EducationsWork: React.FC = () => {
  const educationForm = Form.useFormInstance();
  const [areYouAgree, setAreYouAgree] = useState({
    youStudent: 'Yes/Այո',
    haveJob: 'Yes/Այո'
  });

  useEffect(() => {
    educationForm.setFieldsValue({
      youStudent: 'Yes/Այո',
      haveJob: 'Yes/Այո'
    });
  }, []);

  const handleRadioChange = (event: RadioChangeEvent, name: string): void => {
    setAreYouAgree({
      ...areYouAgree,
      [name]: event.target.value
    });
  };

  console.log(areYouAgree, educationForm);

  return (
    <EducationsWorkContainer>
      <SectionTitle>Education & Work / Կրթություն և աշխատանք</SectionTitle>
      <FormText style={{ marginBottom: '1rem', marginTop: '1rem' }}>
        Are you a student? / Ներկայումս սովորում ե՞ք*
      </FormText>
      <Form.Item name="youStudent">
        <Radio.Group
          onChange={(event) => handleRadioChange(event, 'youStudent')}
        >
          <Space direction="vertical">
            <CustomRadio value={'Yes/Այո'}>Yes/Այո</CustomRadio>
            <CustomRadio value={'No/Ոչ'}>No/Ոչ</CustomRadio>
          </Space>
        </Radio.Group>
      </Form.Item>

      {areYouAgree.youStudent === 'Yes/Այո'
        ? (
        <>
          <FormText style={{ marginBottom: '1rem' }}>
            Where do you study? / Որտե՞ղ եք սովորում *
          </FormText>
          <Form.Item name="whereStudy">
            <Radio.Group>
              <Space direction="vertical">
                {['study'].map((educationalInstitution) => (
                  <CustomRadio
                    value={educationalInstitution}
                    key={educationalInstitution}
                  >
                    {educationalInstitution}
                  </CustomRadio>
                ))}
                <Form.Item name="workOrganization">
                  <DividerLine>
                    <CustomRadio>Other/Այլ</CustomRadio>
                    <BorderBottomInput />
                  </DividerLine>
                </Form.Item>
              </Space>
            </Radio.Group>
          </Form.Item>
        </>
          )
        : null}

      <FormText style={{ marginBottom: '1rem' }}>
        Education level/Ի՞նչ մակարդակի կրթություն ունեք (ավարտած)*
      </FormText>
      <Form.Item name="educationLevel">
        <Radio.Group>
          <Space direction="vertical">
            {['education'].map((education) => (
              <CustomRadio value={education} key={education}>
                {education}
              </CustomRadio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item name="yourProfession">
        <DividerLine>
          <FormText>Your profession / Ի՞նչ մասնագիտություն ունեք*</FormText>
          <BorderBottomInput />
        </DividerLine>
      </Form.Item>

      <FormText style={{ marginBottom: '1rem' }}>
        {'previewData.haveJob'}
      </FormText>
      <Form.Item name="haveJob">
        <Radio.Group onChange={(event) => handleRadioChange(event, 'haveJob')}>
          <Space direction="vertical">
            <CustomRadio value={'Yes/Այո'}>Yes/Այո</CustomRadio>
            <CustomRadio value={'No/Ոչ'}>No/Ոչ</CustomRadio>
          </Space>
        </Radio.Group>
      </Form.Item>

      {areYouAgree.haveJob === 'Yes/Այո'
        ? (
        <>
          <Form.Item name="workPosition" rules={[{ required: true, message: 'The field is required' }]}>
            <DividerLine>
              <FormText>Your position / Ձեր պաշտոնը, հաստիքը*</FormText>
              <BorderBottomInput />
            </DividerLine>
          </Form.Item>
          <Form.Item name="workOrganization" rules={[{ required: true, message: 'The field is required' }]}>
            <DividerLine>
              <FormText>Work organization / Նշեք կազմակերպությունը*</FormText>
              <BorderBottomInput />
            </DividerLine>
          </Form.Item>
        </>
          )
        : null}
    </EducationsWorkContainer>
  );
};

export default EducationsWork;
