import React from 'react';
import styled from 'styled-components';
import { Space } from 'antd';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/delete.svg';
import { StringVoidType } from '../../../types/global';
import { IAddedDocuments, IRequiredDocuments } from '../../../types/project';

const DocumentsCountContainer = styled(Space)`
  background: var(--white);
  padding: 0.5rem 0.25rem 1.7rem 2rem;
  border-radius: 20px;
  width: 33vw;
`;

const AddedDocuments: React.FC<IAddedDocuments> = ({
  requiredDocuments,
  setRequiredDocuments
}) => {
  const onDeleteDocument: StringVoidType = (id) => {
    setRequiredDocuments(
      requiredDocuments.filter((document: IRequiredDocuments) => {
        return document.id !== id;
      })
    );
  };

  return (
    <DocumentsCountContainer direction="vertical" size={24}>
      <Space
        style={{
          fontWeight: 600,
          fontSize: 'var(--headline-font-size)'
        }}
      >
        Required documents list:
      </Space>
      <Space
        direction="vertical"
        style={{ width: '100%', height: '130px', overflow: 'auto' }}
        size={0}
      >
        {requiredDocuments.map((document: IRequiredDocuments) => (
          <Space
            key={document.id}
            direction="horizontal"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Space style={{ fontSize: 'var(--headline-font-size)' }}>
              {document.documentName}:
              <Space style={{ color: 'var(--dark-4)' }}>
                {document.documentCount}
              </Space>
            </Space>
            <Space style={{ marginRight: '1rem', cursor: 'pointer' }}>
              <DeleteIcon onClick={() => onDeleteDocument(document.id)} />
            </Space>
          </Space>
        ))}
      </Space>
    </DocumentsCountContainer>
  );
};

export default AddedDocuments;
