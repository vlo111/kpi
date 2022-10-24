import React from 'react'
import styled from 'styled-components'
import { AnsCollapse } from '../../../Layout/CollapseLayout'

const Collapses = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(5px, 2vw, 20px);
`

export const ProjectDetails: React.FC = () => {
  return (
    <Collapses>
      <AnsCollapse header="Organization">
        {/* <h3>Org inputs</h3> */}
      </AnsCollapse>
      <AnsCollapse header="Regions/Marzes">
        {/* <h4>Org inputs M</h4> */}
      </AnsCollapse>
      <AnsCollapse header="Sectors">
          {/* <h4>Org inputs M</h4> */}
      </AnsCollapse>
    </Collapses>
  )
}
