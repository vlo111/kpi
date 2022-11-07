import React from 'react'
import styled from 'styled-components'
import MainLayout from '../../Layout/MainLayout'
import ApplicantsList from './Applicants'
import SearchApplicants from './Search'

const ApplicantWrapper = styled.div`
    padding: 16px;
    box-shadow: var(--base-box-shadow);
    border-radius: 20px;
    height: 100%;
    background-color: var(--white);
    padding: 30px 16px 50px 16px;
`

const Applicants: React.FC<{}> = () => {
  return (
    <MainLayout>
        <ApplicantWrapper>
            <SearchApplicants />
            <ApplicantsList />
        </ApplicantWrapper>
    </MainLayout>
  )
}

export default Applicants
