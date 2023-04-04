import React from 'react';
import { NotFound } from '../NotFound';
import { Header } from './Header';
import { Rejection } from './Reject';
import { Text } from './Text';
import { INoteContent } from '../../../../../../../../types/applicant';

const Content: React.FC<INoteContent> = ({ text, reasonsForRejection, onClose }) => {
  return (
    <>
      <Header onClose={onClose} />
      {reasonsForRejection !== null && (
        <Rejection reasonsForRejection={reasonsForRejection} />
      )}
      {text !== undefined ? <Text text={text} /> : <NotFound />}
    </>
  );
};

export default Content;
