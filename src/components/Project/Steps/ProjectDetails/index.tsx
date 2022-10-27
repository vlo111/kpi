import React, { useState } from 'react'
import styled from 'styled-components'
import { AnsCollapse } from '../../../Layout/CollapseLayout'
import {
  OrganizationList,
  RegionList,
  SectorList
} from '../../../../helpers/fakeData'
import {
  HandlePanelAdd,
  HandlePanelDelete
} from '../../../../types/project'

const Collapses = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(5px, 2vw, 20px);
`

export const ProjectDetails: React.FC = () => {
  const [organization, setOrganization] = useState(OrganizationList(10))
  const [regions, setRegions] = useState(RegionList(10))
  const [sectors, setSectors] = useState(SectorList(10))

  const deleteData: HandlePanelDelete = (header, id) => {
    if (header === 'Organization') {
      let orgs = organization.slice(0)

      orgs = orgs.filter((o) => o.id !== id)

      setOrganization(orgs)
    } else if (header === 'Regions/Marzes') {
      let regs = regions.slice(0)

      regs = regs.filter((r) => r.id !== id)

      setRegions(regs)
    } else {
      let sects = sectors.slice(0)

      sects = sects.filter((s) => s.id !== id)

      setSectors(sects)
    }
  }

  const addData: HandlePanelAdd = (header) => {
    if (header === 'Organization') {
      const orgs = organization.slice(0)

      orgs.push({ id: `${organization.length + 1}`, name: '' })

      setOrganization(orgs)
    } else if (header === 'Regions/Marzes') {
      const regs = regions.slice(0)

      regs.push({ id: `${regions.length + 1}`, name: '' })

      setRegions(regs)
    } else {
      const sects = sectors.slice(0)

      sects.push({ id: `${sectors.length + 1}`, name: '' })

      setSectors(sects)
    }
  }

  return (
    <Collapses>
      <AnsCollapse
        header="Organization"
        list={organization}
        deleteData={deleteData}
        addData={addData}
      />
      <AnsCollapse
        header="Regions/Marzes"
        list={regions}
        deleteData={deleteData}
        addData={addData}
      />
      <AnsCollapse
        header="Sectors"
        list={sectors}
        deleteData={deleteData}
        addData={addData}
      />
    </Collapses>
  )
}
