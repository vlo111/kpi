import { IActivity, IExpectedResult, IManager, IResultArea, IMilestones } from '../types/project'
import { v4 as uuidv4 } from 'uuid'

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

export const ResultArea: IResultArea[] = Array.from({ length: 1 }, (v, i) => ({
  id: uuidv4(),
  name: `${i}. Skill gap reduced`,
  expectedResult: [
    {
      id: uuidv4(),
      code: '',
      result: '',
      measure: 'Number',
      target: ''
    }
  ],
  activity: [
    {
      id: uuidv4(),
      name: '1.1 Example: Mapping the labor market mismatch and the skill gaps',
      milestones: [
        {
          id: uuidv4(),
          code: '',
          milestone: '',
          measure: 'Attachment',
          target: ''
        }
      ]
    }
  ]
}))

export const DefaultExpectedResult: () => IExpectedResult = () => ({
  id: uuidv4(),
  code: '',
  result: '',
  measure: 'Number',
  target: ''
})

export const DefaultMilestone: () => IMilestones = () => ({
  id: uuidv4(),
  code: '',
  milestone: '',
  measure: 'Number',
  target: ''
})

export const DefaultActivity: () => IActivity = () => ({
  id: uuidv4(),
  name: 'Set Input in there',
  milestones: [DefaultMilestone()]
})

export const DefaultResultArea: () => IResultArea = () => ({
  id: uuidv4(),
  name: 'Set Input in there',
  expectedResult: [DefaultExpectedResult()],
  activity: [DefaultActivity()]
})

export const ManagerList: () => IManager[] = () => [{
  id: '1',
  firstName: 'Volodya',
  color: `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`,
  lastName: 'Vardanyan',
  email: 'vv@vv.vv',
  position: 'manager',
  assigned: 'Project'
}, {
  id: '2',
  firstName: 'Leo',
  color: `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`,
  lastName: 'Messi',
  email: 'aa@aa.bb',
  position: 'manager',
  assigned: 'Project'
}]

export const InitManager = {
  assigned: '',
  email: '',
  color: `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`,
  firstName: '',
  id: '',
  lastName: '',
  position: ''
}

export const courseTemplateData = [
  {
    id: uuidv4(),
    title: 'Title',
    subTitle: '',
    status: true,
    disabled: true
  },
  {
    id: uuidv4(),
    title: 'Organization',
    subTitle: 'EIF, Analysed,',
    status: true,
    disabled: true
  },
  {
    id: uuidv4(),
    title: 'Activity Manager',
    subTitle: '',
    status: true,
    disabled: true
  },
  {
    id: uuidv4(),
    title: 'Sector',
    subTitle: 'IT, Tourism, Hospitality',
    status: true,
    disabled: true
  },
  {
    id: uuidv4(),
    title: 'Region',
    subTitle: 'Ararat marz, Gegharkunik, Syunik',
    status: true,
    disabled: true
  },
  {
    id: uuidv4(),
    title: 'Start Date',
    subTitle: '',
    status: true,
    disabled: true
  },
  {
    id: uuidv4(),
    title: 'End Date',
    subTitle: '',
    status: true,
    disabled: true
  },
  {
    id: uuidv4(),
    title: 'Course hours',
    subTitle: '',
    status: false,
    disabled: false
  },
  {
    id: uuidv4(),
    title: 'Partner organization',
    subTitle: '',
    status: false,
    disabled: false
  }
]
