import React from 'react';
import { useParams } from 'react-router-dom';

import ApplicantPublicForm from '../../components/ApplicantPublicForm';

const FillApplicationForm: React.FC = () => {
  const { id } = useParams();

  return <ApplicantPublicForm id={id} />;
};

export default FillApplicationForm;
