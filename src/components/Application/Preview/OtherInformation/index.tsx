import React from 'react';
import { Divider, Radio, Space } from 'antd';
import {
  CardTitle,
  DetailsContainer,
  DividerLine,
  ModalText
} from '../../applicationStyle';
import { AsnCheckbox } from '../../../Forms/Checkbox';
// import {
//   didFindCourse,
//   otherInformation
// } from '../../../../../../helpers/fakeData';

const OtherInformation: React.FC = () => {
  return (
    <DetailsContainer>
      <CardTitle style={{ marginTop: '' }}>
        Other information / Այլ տեղեկություն
      </CardTitle>
      <ModalText style={{ marginTop: '0.5rem' }}>
        Do you have a disability? / Ունեք որևէ տեսակի
        խոցելիութուն,հաշմանդամություն*
      </ModalText>
      <Radio.Group value="Yes/Այո">
        <Space direction="vertical">
          <Radio value="Yes/Այո">Yes/Այո</Radio>
          <Radio value="No/Ոչ">No/Ոչ</Radio>
        </Space>
      </Radio.Group>
      <ModalText style={{ marginTop: '2rem', marginBottom: '1rem' }}>
        Indicate if you have any of the following types of vulnerabilities /
        Խնդրում ենք նշել, եթե ունեք խոցելիության հետևյալ տեսակներից որևէ մեկը*
      </ModalText>
      <Space direction="vertical" style={{ width: '97%' }}>
        {otherInformation.map((info, idex) => (
          <AsnCheckbox defaultChecked={idex === 0} key={info}>
            {info}
          </AsnCheckbox>
        ))}
        <DividerLine>
          <AsnCheckbox defaultChecked={true} style={{ marginRight: '8px' }} />
          <Divider orientation="left" plain>
            Other/Այլ
          </Divider>
        </DividerLine>
      </Space>
      <ModalText style={{ marginTop: '2rem' }}>
        How did you find out about the course? / Որտեղից եք տեղեկացել դասընթացի
        մասին*
      </ModalText>
      <Radio.Group value={didFindCourse[0]}>
        <Space direction="vertical" style={{ width: '97%' }}>
          {didFindCourse.map((course) => (
            <Radio value={course} key={course}>
              {course}
            </Radio>
          ))}
          <DividerLine>
            <Radio />
            <Divider orientation="left" plain>
              Other (specify) /Այլ (նշել)
            </Divider>
          </DividerLine>
        </Space>
      </Radio.Group>
    </DetailsContainer>
  );
};

export default OtherInformation;
