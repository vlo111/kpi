
export const OrganizationList: (count: number) => Array<{ name: string, id: string }> =
    (count: number) => Array.from({ length: count }, (v, i) => ({ id: `o${i}`, name: `Organization ${i}` }))

export const RegionList: (count: number) => Array<{ name: string, id: string }> =
    (count: number) => Array.from({ length: count }, (v, i) => ({ id: `r${i}`, name: `regions ${i}` }))

export const SectorList: (count: number) => Array<{ name: string, id: string }> =
    (count: number) => Array.from({ length: count }, (v, i) => ({ id: `s${i}`, name: `Sector ${i}` }))

export const ResultArea = [
  {
    id: 'ra',
    name: '1. Skill gap reduced',
    list1: [{
      id: 'ral1',
      code: 'OC1.3',
      result: 'Individuals with improved technical and soft skills following participation in USG-assisted workforce development programs ',
      measure: 'Number',
      target: 100
    }],
    list2: [{
      id: 'ral2',
      code: 'AW5.8',
      milestone: 'skill mapping study completed and study report, summarizing findings.',
      measure: 'Attachment',
      target: 65
    }]
  }
]
