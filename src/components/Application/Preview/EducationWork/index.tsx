import React, { Fragment } from 'react';
import { CardTitle, ModalText, DetailsContainer } from '../../applicationStyle';
import { v4 as uuidv4 } from 'uuid';
import { answerTypes } from '../../../../helpers/utils';
import { IEducationWork } from '../../../../types/api/application/applicationForm';

const EducationWork: React.FC<IEducationWork> = ({ educationWorkData }) => {
  return (
    <DetailsContainer>
      <CardTitle>{educationWorkData?.title}</CardTitle>
      <ModalText style={{ marginTop: '0.5rem' }}>
        {educationWorkData?.description}
      </ModalText>
      {educationWorkData?.questions?.map((question) => (
        <Fragment key={question?.id !== undefined ? question.id : uuidv4()}>
          <ModalText style={{ margin: '1rem 0 0.3rem' }}>
            {question?.title}
          </ModalText>
          <>{answerTypes(question?.answerType, question)}</>
        </Fragment>
      ))}
    </DetailsContainer>
  );
};

export default EducationWork;
