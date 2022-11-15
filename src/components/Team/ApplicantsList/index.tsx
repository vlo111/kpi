import React, { useState } from 'react'
import styled from 'styled-components'
import ApplicantsList from './ApplicantsLarge'
import SearchApplicants from './Search'

const ApplicantWrapper = styled.div`
    padding: 16px;
    box-shadow: var(--base-box-shadow);
    border-radius: 20px;
    height: 100%;
    background-color: var(--white);
    padding: 30px 16px 50px 16px;

    .search_users{
      &:hover{
        border: none !important;
      }
    }
`

const ApplicantContent = styled.div`
  padding: 32px 64px 50px 64px;
  height: 100%;
`

const Applicants: React.FC<{}> = () => {
  const [showModal, setShowModal] = useState(undefined)

  return (
    <ApplicantContent>
      <ApplicantWrapper>
          <SearchApplicants showModal={showModal} setShowModal={setShowModal}/>
          <ApplicantsList />
      </ApplicantWrapper>
    </ApplicantContent>
  )
}

export default Applicants
