import React, { useState } from 'react';
import styled from 'styled-components';
import { Card, Row, Col, Typography, Space, Input } from 'antd';

import CreateSubCourse from '../../components/Project/SubActivity/SubActivityModals/Create';
import { AsnCheckbox } from '../../components/Forms/Checkbox';
import { AsnRadio } from '../../components/Forms/Radio';
import { IActiveTemplate } from '../../types/api/activity/subActivity';

const { Paragraph } = Typography;

const AsnCard = styled(Card)`
   min-width: 425px;
   border-top: 2px solid var(--dark-border-ultramarine);
   border-radius: 10px;
   .ant-card-body {
    padding: 16px;
   }
`;

const AsnInput = styled(Input)`
 width: 100px;
  .ant-input-group-addon{
    background-color: var(--white);
    border-radius: 6px 0px 0px 6px;
    font-weight: var(--font-semibold);
  }
  .ant-input[disabled] {
    background-color: var(--white);
    color: var(--dark-0);
    border-radius: 0px 6px 6px 0px;
    padding: 0px 7px;
    font-weight: var(--font-semibold);
  }
`;

const AsnRow = styled(Row)`
    font-size: var(  --font-size-semismall);
`;

const AsnParagraph = styled(Paragraph)`
  &.ant-typography{
    margin: 0;
  }
`;
const AsnCol = styled(Col)`
    font-weight: var(--font-semibold);
`;

const AntCheckbox = styled(AsnCheckbox)`
    .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner:after{
        border-color: var(--white);
    }
    .ant-checkbox-disabled .ant-checkbox-inner {
        border-color: var(--dark-border-ultramarine) !important;
    }
    &.ant-checkbox-disabled .ant-checkbox-inner {
        background-color: var(--white);
    }
`;

const AntRadio = styled(AsnRadio)`
   .ant-radio-disabled .ant-radio-inner {
    background-color: var(--white);
   }
`;

const TemplateCard: React.FC<{ template: IActiveTemplate }> = ({ template }) => {
  const [openCreateSubActivity, setOpenCreateSubActivity] = useState<boolean>(false);

  const { title, description, applicationForm, courseStructure, phasesCount, id } = template;

  return (
        <>
            <AsnCard style={{ cursor: 'pointer' }} onClick={() => setOpenCreateSubActivity(true) }>
                <Space direction='vertical' style={{ width: '100%' }} size={12}>
                    <AsnRow justify={'space-between'}>
                        <AsnCol span={8}>
                            Template Name:
                        </AsnCol>
                        <AsnCol span={16}>
                            <AsnParagraph ellipsis={{ rows: 1, expandable: true, symbol: 'View More' }} style={{ color: 'var(--dark-3)' }}>
                                {title}
                            </AsnParagraph>
                        </AsnCol>
                    </AsnRow>
                    <AsnRow justify={'space-between'}>
                        <AsnCol span={8}>
                            Description:
                        </AsnCol>
                        <AsnCol span={16} >
                            <AsnParagraph ellipsis={{ rows: 1, expandable: true, symbol: 'View More' }} style={{ color: 'var(--dark-3)' }}>
                                {description}
                            </AsnParagraph>
                        </AsnCol>
                    </AsnRow>
                    <AsnRow>
                        <AsnCol span={10}>
                            <Space direction='horizontal' size={9}>
                                <AsnParagraph> Application form:</AsnParagraph>
                                <AntCheckbox disabled checked={applicationForm.includes('APPLICATION' as never) } />
                            </Space>
                        </AsnCol>
                        <AsnCol span={14}>
                            <Space direction='horizontal' size={17}>
                                <AsnParagraph>One Phase:</AsnParagraph>
                                <AntRadio disabled checked={courseStructure === 'ONE_SECTION'} />
                            </Space>
                        </AsnCol>
                    </AsnRow>
                    <AsnRow align={'middle'}>
                        <AsnCol span={10}>
                            <Space direction='horizontal'>
                                <AsnParagraph>Assessment form:</AsnParagraph>
                                <AntCheckbox disabled checked={applicationForm.includes('ASSESSMENT' as never)} />
                            </Space>
                        </AsnCol>
                        <AsnCol span={14}>
                            <Space direction='horizontal' style={{ width: '100%' }} size={5}>
                                <AsnParagraph>Multi Phases:</AsnParagraph>
                                <AntRadio disabled checked={courseStructure === 'MULTI_SECTION'} />
                                {courseStructure === 'MULTI_SECTION' && <AsnInput addonBefore={phasesCount} disabled value={'phases'} />}
                            </Space>
                        </AsnCol>
                    </AsnRow>
                </Space>
            </AsnCard>
            {openCreateSubActivity && (
                <CreateSubCourse
                    openCreateSubActivity={openCreateSubActivity}
                    setOpenCreateSubActivity={setOpenCreateSubActivity}
                    templateId={id}
                />
            )}
        </>
  );
};

export default TemplateCard;
