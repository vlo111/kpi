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
  const [regions, setRegions] = useState(RegionList(20))
  const [sectors, setSectors] = useState(SectorList(20))

  return (
        <Collapses>
            <AnsCollapse header="Organization" list={organization}/>
            <AnsCollapse header="Regions/Marzes" list={regions} />
            <AnsCollapse header="Sectors" list={sectors} />
        </Collapses>
  )
}
