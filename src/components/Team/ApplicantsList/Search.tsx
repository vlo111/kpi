import React from 'react'
import styled from 'styled-components'
import { ReactComponent as TeamsMembers } from '../../../assets/icons/team-members.svg'
import { ReactComponent as DownloadInfo } from '../../../assets/icons/download.svg'
import AsnInput from '../../Forms/Input'
import { AsnButton } from '../../Forms/Button'
import AddApplicantModal from './CreateApplicantsModal'

export const ApplicantSearch = styled.div`
    .left_section{
        display: flex;

        div:last-of-type{
            margin-left: auto;
        }

        &_box{
            display: flex;
            justify-content: start;
            align-items: center;
            text-align: center;

            p {
                color: var(--dark-border-ultramarine);
                font-weight: var(--font-normal);
                font-size: var(--headline-font-size);
                padding: 0;
                margin: 0;
            }
            svg {
                margin-left: 11px;
                &:hover{
                    cursor: pointer;
                }
            }
        }
        &_input {
            display: flex;
            justify-content: center;
            align-items: center;
            width: clamp(200px,50vh,334px);
            padding-left: 34px;

            input {
            height: 32px;
            border: none;
            font-weight: var(--font-normal);
            font-size: var(--font-size-small);
            border-radius: 10px;
            box-shadow: var(--search-box-shadow);
            color: var(--dark-4);
            width: 100%;

            &:hover{
                border: none !important;
            }
        }
        }
    }
    .applicants_count {
        margin-top: 16px;
        display: flex;
        width: 100%;
        justify-content: end;
        color: var(--dark-2);
        font-weight: var(--font-normal);
        font-size: var(--font-size-semismall);

        &_text{
         border: 0.5px solid var(--dark-5);
         border-radius: 6px;
         padding: 8px;
        }
    }
    
`

const SearchApplicants: React.FC<{ showModal: any, setShowModal: any }> = ({ showModal, setShowModal }) => {
  return (
            <ApplicantSearch>
                <div className='left_section'>
                    <div className='left_section_box'>
                      <p>Applicants</p>
                      <TeamsMembers onClick={() => setShowModal('create')}/>
                      <DownloadInfo />
                    </div>
                    <div className='left_section_input'>
                     <AsnInput placeholder="Search" />
                    </div>
                    <div className='left_section_create_button'>
                        <AsnButton type="primary" htmlType="submit" onClick={() => setShowModal('create')}>Add user</AsnButton>
                    </div>
                </div>
                <div className='applicants_count'>
                    <div className='applicants_count_text'>Total members: 12</div>
                </div>
                <AddApplicantModal showModal={showModal} setShowModal={setShowModal}/>
            </ApplicantSearch>
  )
}

export default SearchApplicants
