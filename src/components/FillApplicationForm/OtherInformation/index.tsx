import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Radio, RadioChangeEvent, Space } from 'antd';
import { BorderBottomInput, CustomRadio, FormText, SectionTitle } from '../style';
import { AsnCheckbox, AsnCheckboxGroup } from '../../Forms/Checkbox';

const OtherInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OtherInformation: React.FC<{
  informedAboutUs: any
  vulnerabilities: any
  disability: any
}> = ({ informedAboutUs, vulnerabilities, disability }) => {
  const oherInformationForm = Form.useFormInstance();
  const [haveDisability, setHaveDisability] = useState(true);

  return (
    <OtherInformationContainer>
      <SectionTitle>Other information / Այլ տեղեկություն</SectionTitle>
      <FormText style={{ margin: '1rem 0rem' }}>
        Do you have a disability? / Ունեք որևէ տեսակի
        խոցելիութուն,հաշմանդամություն*
      </FormText>
      <Form.Item name={['other_info', 0, 'answers', 0, 'id']}>
        <Radio.Group onChange={() => setHaveDisability(!haveDisability)}>
          <Space direction="vertical">
            {disability?.map((g: any) => (
              <CustomRadio
                value={g.id}
                key={g.id}
              >{g.text}</CustomRadio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      {haveDisability && <>
        <FormText style={{ marginBottom: '1rem' }}>
          {oherInformationForm.getFieldValue('disability')}
        </FormText>
        <Form.Item name="followingTypes">
          <AsnCheckboxGroup>
            <Space direction="vertical">
              {vulnerabilities?.map((info: any) => (
                <AsnCheckbox value={info.id} key={info.id}>
                  {info.text}
                  {info.text === 'Other (specify)/ Այլ (նշել)' && <BorderBottomInput />}
                </AsnCheckbox>
              ))}
            </Space>
          </AsnCheckboxGroup>
        </Form.Item>
      </>}

      <FormText style={{ margin: '1rem 0rem' }}>
        {oherInformationForm.getFieldValue('informedAboutUs')}
      </FormText>
      <Form.Item name={['other_info', 1, 'answers', 0, 'id']}>
        <Radio.Group>
          <Space direction="vertical">
            {informedAboutUs?.map((course: any) => (
              <CustomRadio value={course.id} key={course.id}>
                {course.text}
                {course.text === 'Other (specify)/ Այլ (նշել)' && <BorderBottomInput />}
              </CustomRadio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>
    </OtherInformationContainer>
  );
};

export default OtherInformation;
