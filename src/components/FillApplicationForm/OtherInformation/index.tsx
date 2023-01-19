import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Form, Radio, RadioChangeEvent, Space } from 'antd';
// import {
//   didFindCourse,
//   otherInformation
// } from '../../../../../helpers/fakeData';
import { CustomRadio, FormText, SectionTitle } from '../style';
import { AsnCheckbox, AsnCheckboxGroup } from '../../Forms/Checkbox';

const OtherInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const OtherInformation: React.FC = () => {
  const oherInformationForm = Form.useFormInstance();
  const [haveDisability, setHaveDisability] = useState('Yes/Այո');

  const handleHaveDisability = (event: RadioChangeEvent): void => {
    setHaveDisability(event.target.value);
  };

  useEffect(() => {
    oherInformationForm.setFieldsValue({
      disability: 'Yes/Այո'
    });
  }, []);

  return (
    <OtherInformationContainer>
      <SectionTitle>Other information / Այլ տեղեկություն</SectionTitle>
      <FormText style={{ margin: '1rem 0rem' }}>
        Do you have a disability? / Ունեք որևէ տեսակի
        խոցելիութուն,հաշմանդամություն*
      </FormText>
      <Form.Item name="disability">
        <Radio.Group onChange={handleHaveDisability}>
          <Space direction="vertical">
            <CustomRadio value={'Yes/Այո'}>Yes/Այո</CustomRadio>
            <CustomRadio value={'No/Ոչ'}>No/Ոչ</CustomRadio>
          </Space>
        </Radio.Group>
      </Form.Item>

      {haveDisability === 'Yes/Այո'
        ? (
        <>
          <FormText style={{ marginBottom: '1rem' }}>
            Indicate if you have any of the following types of vulnerabilities /
            Խնդրում ենք նշել, եթե ունեք խոցելիության հետևյալ տեսակներից որևէ
            մեկը*
          </FormText>
          <Form.Item name="followingTypes">
            <AsnCheckboxGroup>
              <Space direction="vertical">
                {['otherInformation'].map((info) => (
                  <AsnCheckbox value={info} key={info}>
                    {info}
                  </AsnCheckbox>
                ))}
              </Space>
            </AsnCheckboxGroup>
          </Form.Item>
        </>
          )
        : null}

      <FormText style={{ margin: '1rem 0rem' }}>
        How did you find out about the course? / Որտեղից եք տեղեկացել դասընթացի
        մասին*
      </FormText>
      <Form.Item name="findAboutCourse">
        <Radio.Group>
          <Space direction="vertical">
            {['didFindCourse'].map((course) => (
              <CustomRadio value={course} key={course}>
                {course}
              </CustomRadio>
            ))}
            <CustomRadio>Other/Այլ</CustomRadio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </OtherInformationContainer>
  );
};

export default OtherInformation;
