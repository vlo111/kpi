import React, { useState } from 'react'
import styled from 'styled-components'
import { AnsCollapse } from '../../../Layout/CollapseLayout'
import { OrganizationList, RegionList, SectorList } from '../../../../helpers/fakeData'

const Collapses = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(5px, 2vw, 20px);
`

export const ProjectDetails: React.FC = () => {
  const [organization, setOrganization] = useState(OrganizationList(10))
  const [regions, setRegions] = useState(RegionList(10))
  const [sectors, setSectors] = useState(SectorList(10))

  const deleteData: (header: string, id: string) => void = (header: string, id: string) => {
    if (header === 'Organization') {
      let orgs = organization.slice(0)

      orgs = orgs.filter((o) => o.id !== id)

      setOrganization(orgs)
    } else if (header === 'Regions/Marzes') {
      let regs = organization.slice(0)

      regs = regs.filter((r) => r.id !== id)

      setRegions(regs)
    } else {
      let sects = organization.slice(0)

      sects = sects.filter((s) => s.id !== id)

      setSectors(sects)
    }
  }

  return (
        <Collapses>
            <AnsCollapse header="Organization" list={organization} deleteData={deleteData}/>
            <AnsCollapse header="Regions/Marzes" list={regions} deleteData={deleteData}/>
            <AnsCollapse header="Sectors" list={sectors} deleteData={deleteData} />
        </Collapses>
  )
}
