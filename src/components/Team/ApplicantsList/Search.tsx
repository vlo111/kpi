import React from 'react'
import styled from 'styled-components'
import { ReactComponent as TeamsMembers } from '../../../assets/icons/team-members.svg'
import { ReactComponent as DownloadInfo } from '../../../assets/icons/download.svg'
import AsnInput from '../../Forms/Input'

export const ApplicantSearch = styled.div`
    .left_section{
        display: flex;

        &_box{
            display: flex;
            justify-content: start;
            align-items: center;
            text-align: center;

            p {
                color: #2A5578;
                font-weight: 400;
                font-size: 20px;
                padding: 0;
                margin: 0;
            }
            svg {
                margin-left: 8px;
            }
        }
        input {
            height: 32px;
            border: none;
            font-weight: 400;
            font-size: 12px;
            border-radius: 10px;
            box-shadow: var(--input-box-shadow);
            color: var(--dark-4);
            width: clamp(200px, 50vh, 300px);
            margin-left: 34px;

            &:hover{
                border: none !important;
            }
        }
    }
    .applicants_count {
        margin-top: 7px;
        display: flex;
        width: 100%;
        justify-content: end;
        color: var(--dark-2);
        font-weight: 400;
        font-size: 14px;

        &_text{
         border: 0.5px solid #D9D9D9;
         border-radius: 6px;
         padding: 6px 17px;
        }
    }
    
`

const SearchApplicants: React.FC<{}> = () => {
  return (
            <ApplicantSearch>
                <div className='left_section'>
                    <div className='left_section_box'>
                      <p>Applicants</p>
                      <TeamsMembers />
                      <DownloadInfo />
                    </div>
                    <div>
                     <AsnInput placeholder="Search" />
                    </div>
                </div>
                <div className='applicants_count'>
                    <div className='applicants_count_text'>Total members: 14</div>
                </div>
            </ApplicantSearch>
  )
}

export default SearchApplicants
