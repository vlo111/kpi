import React, { createContext, useContext, useMemo, useState } from 'react'
import { IComponentChildren } from '../../types/global'
import { OrganizationList, RegionList, SectorList } from '../../helpers/fakeData'
import { Details } from '../../types/project'

// @ts-expect-error
const ProjectDetailsContext = createContext()

export const ProjectDetailsProvider: React.FC<IComponentChildren> = ({ children }) => {
  const [organizations, setOrganizations] = useState<Details>(OrganizationList)
  const [regions, setRegions] = useState(RegionList)
  const [sectors, setSectors] = useState(SectorList)

  const value = useMemo(
    () => ({
      organizations,
      regions,
      sectors,
      setOrganizations,
      setRegions,
      setSectors
    }),
    [organizations, regions, sectors]
  )

  return <ProjectDetailsContext.Provider value={value}>{children}</ProjectDetailsContext.Provider>
}

export const useProjectDetails: any = () => {
  return useContext(ProjectDetailsContext)
}
