import React, { useState } from 'react';
import { Col, Popover, Row as AntRow, Space, Typography } from 'antd';
import { ReactComponent as NotesSvg } from '../Icons/Notes.svg';
import { ReactComponent as NotFoundSvg } from '../Icons/not-found.svg';
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

const NotFound = styled(AntRow)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
  padding: 1rem;
`;

const Note: React.FC<INote> = ({ id, text, inactive, reasonsForRejection }) => {
  const [showNote, setShowNote] = useState<ShowNote>(false);

  const content = (
    <>
      <Row style={{ justifyContent: 'space-between' }}>
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
      </Row>
      {reasonsForRejection != null && (
        <>
          <Space.Compact
            block
            style={{
              fontSize: '14px',
              color: 'var(--dark-2)',
              fontWeight: 'var(--font-bold)'
            }}
          >
            Reasons for rejection:
          </Space.Compact>
          <Row
            style={{
              margin: '0.3rem 1rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <>
              <Col>
                <ul
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.3rem'
                  }}
                >
                  {reasonsForRejection.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </Col>
            </>
          </Row>
        </>
      )}
      {text !== null
        ? (
        <Row>
          <Col span={4}>Note:</Col>
          <Col>{text}</Col>
        </Row>
          )
        : (
        <NotFound>
          <NotFoundSvg />
          <p>No records found</p>
        </NotFound>
          )}
    </>
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
