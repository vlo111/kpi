import React, { Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  CardTitle,
  DetailsContainer,
  ModalText
} from '../../applicationStyle';
import { IProfessionalSkills } from '../../../../types/project';
import { answerTypes } from '../../../../helpers/utils';

const ProfessionalSkills: React.FC<IProfessionalSkills> = ({ professionalSkills }) => {
  return (
    <DetailsContainer>
      <CardTitle>{professionalSkills.title}</CardTitle>
      <ModalText style={{ marginTop: '0.5rem' }}>
        {professionalSkills?.description}
      </ModalText>
      {professionalSkills?.questions?.map(
        (question) => (
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

export default ProfessionalSkills;
