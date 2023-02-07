import React, { useState } from 'react';
import { Col, Popover, Row as AntRow, Typography } from 'antd';
import { ReactComponent as NotesSvg } from '../icons/Notes.svg';
import { Void } from '../../../../../types/global';
import { ReactComponent as CloseIcon } from '../../../../../assets/icons/closeIcon.svg';
import styled from 'styled-components';
import { INote, ShowNote } from '../../../../../types/applicant';

const { Title } = Typography;

const Row = styled(AntRow)`
  width: 300px;

  .title {
    font-weight: var(--font-normal);
    color: var(--dark-border-ultramarine);
  }
`;

const Note: React.FC<INote> = ({ id, inactive }) => {
  const [showNote, setShowNote] = useState<ShowNote>(false);

  const content = (
    <Row>
      <Col span={22}>
        <Title level={4} className="title">
          Notes
        </Title>
      </Col>
      <Col>
        <a onClick={() => setShowNote(false)}>
          <CloseIcon />
        </a>
      </Col>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis
        delectus expedita laborum libero officia, voluptatem. A, ad adipisci
        asperiores atque autem eaque eum eveniet ex hic illum impedit ipsam
        itaque iusto laudantium magni nihil quia repellat similique sint
        suscipit ut velit voluptate voluptates! Aliquam consequuntur ea eligendi
        eveniet hic illo inventore itaque laborum saepe temporibus! Adipisci
        asperiores deleniti distinctio doloribus excepturi fuga harum iure,
        minima natus necessitatibus nesciunt nobis odit pariatur provident quia
        vel voluptas. Delectus illum ipsam laudantium neque nihil, quia
        recusandae vero. Adipisci at beatae cumque esse expedita modi non omnis
        sequi. Illo libero nobis quos saepe ut!
      </p>
    </Row>
  );

  const changeOpen: Void = () => {
    if (!inactive) {
      setShowNote(showNote === `${id}` ? false : `${id}`);
    }
  };

  return (
    <Popover
      overlayClassName="applicant-popover"
      content={content}
      trigger="click"
      placement={'bottomLeft'}
      getPopupContainer={(trigger) => trigger.parentNode as HTMLElement}
      open={typeof showNote === 'string' && showNote === `${id}`}
      onOpenChange={changeOpen}
    >
      <NotesSvg />
    </Popover>
  );
};

export default Note;
