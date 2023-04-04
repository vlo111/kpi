import React, { useState } from 'react';
import { Popover } from 'antd';
import { ReactComponent as NotesSvg } from '../Icons/Notes.svg';
import { Void } from '../../../../../../../types/global';
import { INote, ShowNote } from '../../../../../../../types/applicant';
import Content from './Content';

const Note: React.FC<INote> = ({ inactive, history }) => {
  const [showNote, setShowNote] = useState<ShowNote>(false);

  const changeOpen: Void = () => {
    if (!inactive) {
      setShowNote(showNote === (history.id ?? '') ? false : (history.id ?? ''));
    }
  };

  return (
    <Popover
      overlayClassName="applicant-popover"
      content={
        <Content
          text={'note' in history ? history.note : undefined}
          reasonsForRejection={
            'reasonsForRejection' in history
              ? history.reasonsForRejection
              : null
          }
          onClose={setShowNote}
        />
      }
      trigger="click"
      placement={'bottomLeft'}
      getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
      open={typeof showNote === 'string' && showNote === history.id}
      onOpenChange={changeOpen}
    >
      <NotesSvg />
    </Popover>
  );
};

export default Note;
