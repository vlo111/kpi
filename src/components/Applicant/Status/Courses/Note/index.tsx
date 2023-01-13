import React, { useState } from 'react';
import { Popover } from 'antd';
import { ReactComponent as NotesSvg } from '../icons/Notes.svg';
import { Void } from '../../../../../types/global';

const Note: React.FC<{ index: string }> = ({ index }) => {
  const [showNote, setShowNote] = useState<boolean | string>(false);

  const content = <div style={{ width: '300px' }}>
    <a onClick={() => setShowNote(false)}>X</a>
    <span>Changed the status: Applicant</span>
    <p>
      Also, the applicant was... Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Nibh volutpat
      massa volutpat scelerisque sagittis sagittis vivamus
      a.
    </p>
  </div>;

  const changeOpen: Void = () => {
    setShowNote(showNote === `${index}` ? false : `${index}`);
  };

  return (
    <div>
      <Popover
        content={content}
        trigger="click"
        placement={'bottomLeft'}
        getPopupContainer={(trigger) =>
          trigger.parentNode as HTMLElement
        }
        open={
          typeof showNote === 'string' && showNote === `${index}`
        }
        onOpenChange={changeOpen}
      >
        <NotesSvg />
      </Popover>
    </div>
  );
};

export default Note;
