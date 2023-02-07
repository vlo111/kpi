import React from 'react';
import { AsnForm } from '../Forms/Form';
import { AsnTextArea } from '../Forms/Input';
const QuestionContent: React.FC<{ items: any }> = ({ items }) => {
  return (
        <>
          {items.map((item: any, index: number) => (
          <div key={index}>
           <AsnForm.Item name={[item.name, 'title']}>
             <AsnTextArea />
           </AsnForm.Item>
          </div>
          ))}
        </>
  );
};

export default QuestionContent;
