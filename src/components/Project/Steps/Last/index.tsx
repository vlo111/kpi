import React from 'react'
import styled from 'styled-components'
import { AsnCollapse } from '../../../AnsCollapse'
import { Panel } from '../../../Forms/AsnCollapse'
import { Row } from 'antd'
import AsnInput from '../../../Forms/Input'
import { AsnButton } from '../../../Forms/Button'
import { useProjectDetails } from '../../../../hooks/project/useProjectDetails'
import { IDetail, OrganisationState } from '../../../../types/project'
const Collapses = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(5px, 2vw, 20px);

  .input-rows {
    .ant-collapse-content-box {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 2rem 3.25rem;
    }
  }

  .footer {
    display: flex;
    justify-content: end;
    gap: 5rem;

    button {
      width: 133px;
      height: 44px !important;
      border-radius: 10px !important;
    }
  }

  //button {
  //  background-color: var(--white) !important;
  //}
`

export const Last: React.FC = () => {
  const {
    organizations,
    regions,
    sectors,
    setRegions,
    setSectors,
    setOrganizations
  }: OrganisationState = useProjectDetails()

  return (
    <Collapses>
      <AsnCollapse key={'org'} id="org">
        <Panel key={'org'} className="input-rows" header="Organisations">
          {organizations.map((r: IDetail, i: number) => (
            <Row key={r.id}>
              <AsnInput placeholder="Organisation name" />
            </Row>
          ))}
          <AsnButton
            onClick={() => {
              setOrganizations({
                id: `o${organizations.length}`,
                name: `Organization ${organizations.length}`
              })
            }}
          >
            +Add Organizations
          </AsnButton>
        </Panel>
      </AsnCollapse>
      <AsnCollapse key={'reg'} id="reg">
        <Panel key={'reg'} className="input-rows" header="Regions">
          {regions.map((r: IDetail, i: number) => (
            <Row key={r.id}>
              <AsnInput
                placeholder="Example: Ararat Marz*"
                onClick={() => {
                  setRegions({
                    id: `o${regions.length}`,
                    name: `Organization ${regions.length}`
                  })
                }}
              />
            </Row>
          ))}
          <AsnButton>+Add Regions</AsnButton>
        </Panel>
      </AsnCollapse>
      <AsnCollapse key={'sec'} id="sec">
        <Panel key={'sec'} className="input-rows" header="Sections">
          {sectors.map((r: IDetail, i: number) => (
            <Row key={r.id}>
              <AsnInput
                placeholder="Example: IT*"
                onClick={() => {
                  setSectors({
                    id: `o${sectors.length}`,
                    name: `Organization ${sectors.length}`
                  })
                }}
              />
            </Row>
          ))}
          <AsnButton>+Add Sectors</AsnButton>
        </Panel>
      </AsnCollapse>
      <div className="footer">
        <AsnButton onClick={() => {}}>Previous</AsnButton>
        <AsnButton>Save as Draft</AsnButton>
        <AsnButton type="primary" htmlType="submit">
          Publish
        </AsnButton>
      </div>
    </Collapses>
  )
}
