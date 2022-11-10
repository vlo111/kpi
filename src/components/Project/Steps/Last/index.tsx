import React from 'react'
import styled from 'styled-components'
import { AsnCollapse } from '../../../AsnCollapse'
import { Panel } from '../../../Forms/AsnCollapse'
import { Row } from 'antd'
import AsnInput from '../../../Forms/Input'
import { AsnButton } from '../../../Forms/Button'
import { useProjectDetails } from '../../../../hooks/project/useProjectDetails'
import { IDetail, IDetailsState } from '../../../../types/project'
import { useProject } from '../../../../hooks/project/useProject'
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
      box-shadow: 0 4px 4px rgba(42, 85, 120, 0.05);
      border-radius: 6px;
    }
  }
`

export const Last: React.FC = () => {
  const {
    organizations,
    regions,
    sectors,
    setRegions,
    setSectors,
    setOrganizations
  }: IDetailsState = useProjectDetails()

  const { prevCurrent } = useProject()

  console.log(organizations)

  const addOrganisation: () => void = () => {
    const org = {
      id: `o${organizations.length}`,
      name: `Organization ${organizations.length}`
    }

    const orgs: IDetail[] = organizations.slice(0)

    orgs.push(org)

    setOrganizations(orgs)
  }

  const addRegions: () => void = () => {
    const reg = {
      id: `r${regions.length}`,
      name: `Sectors ${regions.length}`
    }

    const regs: IDetail[] = regions.slice(0)

    regs.push(reg)

    setRegions(regs)
  }

  const addSectors: () => void = () => {
    const sec = {
      id: `s${regions.length}`,
      name: `Sectors ${regions.length}`
    }

    const sects: IDetail[] = sectors.slice(0)

    sects.push(sec)

    setSectors(sects)
  }
  return (
    <Collapses>
      <AsnCollapse key={'org'} id="org">
        <Panel key={'org'} className="input-rows" header="Organisations">
          {organizations.map((r: IDetail, i: number) => (
            <Row key={r.id}>
              <AsnInput placeholder="Organisation name" />
            </Row>
          ))}
          <AsnButton onClick={addOrganisation}>+Add Organizations</AsnButton>
        </Panel>
      </AsnCollapse>
      <AsnCollapse key={'reg'} id="reg">
        <Panel key={'reg'} className="input-rows" header="Regions">
          {regions.map((r: IDetail, i: number) => (
            <Row key={r.id}>
              <AsnInput placeholder="Example: Ararat Marz*" />
            </Row>
          ))}
          <AsnButton onClick={addRegions}>+Add Regions</AsnButton>
        </Panel>
      </AsnCollapse>
      <AsnCollapse key={'sec'} id="sec">
        <Panel key={'sec'} className="input-rows" header="Sections">
          {sectors.map((r: IDetail, i: number) => (
            <Row key={r.id}>
              <AsnInput placeholder="Example: IT*" />
            </Row>
          ))}
          <AsnButton onClick={addSectors}>+Add Sectors</AsnButton>
        </Panel>
      </AsnCollapse>
      <div className="footer">
        <AsnButton
          onClick={() => {
            prevCurrent()
          }}
        >
          Previous
        </AsnButton>
        <AsnButton>Save as Draft</AsnButton>
        <AsnButton type="primary" htmlType="submit">
          Publish
        </AsnButton>
      </div>
    </Collapses>
  )
}
