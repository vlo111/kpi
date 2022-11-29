import React, { useState } from 'react'
import styled from 'styled-components'
import { AsnButton } from '../../../../Forms/Button'
import LearningStatus from './LearningStatus'
import { Space } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '../../../../../helpers/constants'

const CourseSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .ant-col-sm-20 {
    max-width: 100% !important;
  }
`
const CourseSection: React.FC = () => {
  const section = 'Multi-Section'
  const navigate = useNavigate()
  const [sections, setSections] = useState(
    section === 'Multi-Section'
      ? [{ id: uuidv4() }, { id: uuidv4() }]
      : [{ id: uuidv4() }]
  )

  const onAddSection = (): void => {
    if (sections.length <= 4) {
      setSections([...sections, { id: uuidv4() }])
    }
  }

  return (
    <CourseSectionContainer>
      <Space
        size={32}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          margin: '2rem 0px 2rem 6% ',
          width: '88%',
          fontSize: 'var(--headline-font-size)'
        }}
      >
        <span>Sections:</span>
        <span>
          Input course sections name and choose their learning statuses
        </span>
      </Space>
      <Space direction="vertical" size={32} style={{ width: '100%' }}>
        {sections.map((section, index) => (
          <LearningStatus
            key={section.id}
            section={section}
            index={index}
            setSections={setSections}
            sections={sections}
          />
        ))}
      </Space>
      {section === 'Multi-Section'
        ? (
        <AsnButton
          type="primary"
          onClick={onAddSection}
          style={{ width: '88%', marginTop: '2rem' }}
        >
          Add field
        </AsnButton>
          )
        : null}
      <Space
        size={32}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '3.75rem 0px 2rem 0rem ',
          width: '88%'
        }}
      >
        <AsnButton onClick={() => navigate(`/${PATHS.TEMPLATECREATE}`)}>
          Cancel
        </AsnButton>
        <AsnButton>Save as Draft</AsnButton>
        <AsnButton type="primary">Publish</AsnButton>
      </Space>
    </CourseSectionContainer>
  )
}

export default CourseSection
