import React from 'react';
import { Divider, Radio, Space } from 'antd';
// import {
//   education,
//   previewData,
//   study
// } from '../../../../../../helpers/fakeData';
import {
  CardTitle,
  ModalText,
  DetailsContainer,
  DividerLine
} from '../../applicationStyle';

const EducationWork: React.FC = () => {
  return (
    <DetailsContainer>
      <CardTitle>Education & Work / Կրթություն և աշխատանք</CardTitle>
      <ModalText style={{ marginTop: '0.5rem' }}>
        Are you a student? / Ներկայումս սովորում ե՞ք*
      </ModalText>
      <Radio.Group value="Yes/Այո">
        <Space direction="vertical">
          <Radio value="Yes/Այո">Yes/Այո</Radio>
          <Radio value="No/Ոչ">No/Ոչ</Radio>
        </Space>
      </Radio.Group>
      <ModalText style={{ marginTop: '2rem' }}>
        Where do you study? / Որտե՞ղ եք սովորում *
      </ModalText>
      <Radio.Group value="School / Դպրոց">
        <Space direction="vertical" style={{ width: '97%' }}>
          {study.map((educationalInstitution) => (
            <Radio value={educationalInstitution} key={educationalInstitution}>
              {educationalInstitution}
            </Radio>
          ))}
          <DividerLine>
            <Radio />
            <Divider orientation="left" plain>
              Other/Այլ
            </Divider>
          </DividerLine>
        </Space>
      </Radio.Group>
      <ModalText style={{ marginTop: '2rem' }}>
        Education level/Ի՞նչ մակարդակի կրթություն ունեք (ավարտած)*
      </ModalText>
      <Radio.Group value={education[0]}>
        <Space direction="vertical" style={{ width: '97%' }}>
          {education.map((education) => (
            <Radio value={education} key={education}>
              {education}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
      <DividerLine style={{ marginTop: '2rem' }}>
        <Divider orientation="left" plain>
          <ModalText>Your profession / Ի՞նչ մասնագիտություն ունեք*</ModalText>
        </Divider>
      </DividerLine>
      <ModalText style={{ marginTop: '2rem' }}>{previewData.haveJob}</ModalText>
      <Radio.Group value="Yes/Այո">
        <Space direction="vertical">
          <Radio value="Yes/Այո">Yes/Այո</Radio>
          <Radio value="No/Ոչ">No/Ոչ</Radio>
        </Space>
      </Radio.Group>
      <DividerLine style={{ marginTop: '2rem' }}>
        <Divider orientation="left" plain>
          <ModalText>Your position / Ձեր պաշտոնը, հաստիքը*</ModalText>
        </Divider>
      </DividerLine>
      <DividerLine style={{ marginTop: '2rem' }}>
        <Divider orientation="left" plain>
          <ModalText>Work organisation / Նշեք կազմակերպությունը*</ModalText>
        </Divider>
      </DividerLine>
    </DetailsContainer>
  );
};

export default EducationWork;
