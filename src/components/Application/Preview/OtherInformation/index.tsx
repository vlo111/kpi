import React, { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  CardTitle,
  DetailsContainer,
  ModalText
} from '../../applicationStyle';
import { IEducationWorkQuestion } from '../../../../types/project';
import { answerTypes } from '../../../../helpers/utils';

const OtherInformation: React.FC<any> = ({ otherInformationData }) => {
  return (
    <DetailsContainer>
      <CardTitle>{otherInformationData.title}</CardTitle>
      <ModalText style={{ marginTop: '0.5rem' }}>
        {otherInformationData?.description}
      </ModalText>
      {otherInformationData?.questions?.map(
        (question: IEducationWorkQuestion) => (
          <Fragment key={question?.id !== undefined ? question.id : uuidv4()}>
            <ModalText style={{ margin: '1rem 0 0.3rem' }}>
              {question?.title}
            </ModalText>
            <>{answerTypes(question?.answerType, question)}</>
          </Fragment>
        )
      )}
    </DetailsContainer>
  );
};

export default OtherInformation;
