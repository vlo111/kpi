import { IResultArea } from '../types/project'

export const OrganizationList: Array<{ name: string, id: string }> = Array.from(
  { length: 10 },
  (v, i) => ({ id: `o${i}`, name: `Organization ${i}` })
)

export const RegionList: Array<{ name: string, id: string }> = Array.from(
  { length: 10 },
  (v, i) => ({ id: `r${i}`, name: `regions ${i}` })
)

export const SectorList: Array<{ name: string, id: string }> = Array.from(
  { length: 10 },
  (v, i) => ({ id: `s${i}`, name: `Sector ${i}` })
)

export const ResultArea: IResultArea[] = Array.from({ length: 10 }, (v, i) => ({
  id: `r${i}`,
  name: `${i}. Skill gap reduced`,
  expectedResult: [
    {
      id: `rl1${i}`,
      code: `OC1.${i}`,
      result:
        'Individuals with improved technical and soft skills following participation in USG-assisted workforce development programs ',
      measure: 'Number',
      target: 100
    },
    {
      id: `rl12${i}`,
      code: `OC2.${i}`,
      result:
              'Individuals with improved technical and soft skills following participation in USG-assisted workforce development programs ',
      measure: 'Number',
      target: 100
    }
  ],
  activity: [
    {
      id: `rl2${i}`,
      code: `AW5.${i}`,
      milestone:
        'skill mapping study completed and study report, summarizing findings.',
      measure: 'Attachment',
      target: 65
    }
  ]
}))

export const ManagerList = [
  {
    id: '1',
    firstName: 'Volodya',
    lastName: 'Vardanyan',
    email: 'vv@vv.vv',
    position: 'manager',
    assigned: 'Project'
  },
  {
    id: '2',
    firstName: 'Diana',
    lastName: 'Karapetyan',
    email: 'vv@vv.vv',
    position: 'manager',
    assigned: 'Project'
  }
]
