import React, { useState } from 'react'
import styled from 'styled-components'
import { AsnCollapse } from '../../../AnsCollapse'
import {
  OrganizationList,
  RegionList,
  SectorList
} from '../../../../helpers/fakeData'
import { Panel } from '../../../Forms/AnsCollapse'
import { Row } from 'antd'
import AsnInput from '../../../Forms/Input'

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
`

export const Last: React.FC = () => {
  const [organization] = useState(OrganizationList)
  const [regions] = useState(RegionList)
  const [sectors] = useState(SectorList)

  return (
        <Collapses>
            <AsnCollapse key={'org'} id='org'>
                <Panel key={'org'} className="input-rows" header='Organisations'>
                    {organization.map((r, i: number) => (
                        <Row key={r.id}>
                            <AsnInput placeholder="Organisation name" />
                        </Row>
                    ))}
                </Panel>
            </AsnCollapse>
            <AsnCollapse key={'reg'} id='reg'>
                <Panel key={'reg'} header='Regions'>
                    {regions.map((r, i: number) => (
                        <Row key={r.id}>
                            {r.name}
                        </Row>
                    ))}
                </Panel>
            </AsnCollapse>
            <AsnCollapse key={'sec'} id='sec'>
                <Panel key={'sec'} header='Sections'>
                    {sectors.map((r, i: number) => (
                        <Row key={r.id}>
                            {r.name}
                        </Row>
                    ))}
                </Panel>
            </AsnCollapse>
        </Collapses>
  )
}
