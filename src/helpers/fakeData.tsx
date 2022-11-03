import { Activity, ExpectedResultType, IResultArea, Milestones } from '../types/project'
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

export const ResultArea: IResultArea[] = Array.from({ length: 7 }, (v, i) => ({
  id: uuidv4(),
  name: `${i}. Skill gap reduced`,
  expectedResult: [
    {
      id: uuidv4(),
      code: `OC1.${i}`,
      result:
        'Individuals with improved technical and soft skills following participation in USG-assisted workforce development programs ',
      measure: 'Number',
      target: '100'
    },
    {
      id: uuidv4(),
      code: `OC2.${i}`,
      result:
        'Individuals with improved technical and soft skills following participation in USG-assisted workforce development programs ',
      measure: 'Number',
      target: '100'
    }
  ],
  activity: [
    {
      id: uuidv4(),
      name: '1.1 Example: Mapping the labor market mismatch and the skill gaps',
      milestones: [
        {
          id: uuidv4(),
          code: `AW4.${i}`,
          milestone:
              'skill mapping study completed and study report, summarizing findings.',
          measure: 'Attachment',
          target: '65'
        },
        {
          id: uuidv4(),
          code: `AW5.${i}`,
          milestone:
              'skill mapping study completed and study report, summarizing findings.',
          measure: 'Attachment',
          target: '65'
        }
      ]
    },
    {
      id: uuidv4(),
      name: '1.2 Example: Mapping the labor market mismatch and the skill gaps',
      milestones: [
        {
          id: uuidv4(),
          code: `AW6.${i}`,
          milestone:
              'skill mapping study completed and study report, summarizing findings.',
          measure: 'Attachment',
          target: '65'
        },
        {
          id: uuidv4(),
          code: `AW7.${i}`,
          milestone:
              'skill mapping study completed and study report, summarizing findings.',
          measure: 'Attachment',
          target: '65'
        }
      ]
    }
  ]
}))

export const DefaultExpectedResult: () => ExpectedResultType = () => ({
  id: uuidv4(),
  code: '',
  result: '',
  measure: '',
  target: ''
})

export const DefaultMilestone: () => Milestones = () => ({
  id: uuidv4(),
  code: '',
  milestone: '',
  measure: '',
  target: ''
})

export const DefaultActivity: () => Activity = () => ({
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

export const ManagerList = [{
  id: '1',
  firstName: 'Volodya',
  lastName: 'Vardanyan',
  email: 'vv@vv.vv',
  position: 'manager',
  assigned: 'Project'
}, {
  id: '2',
  firstName: 'Leo',
  lastName: 'Messi',
  email: 'aa@aa.bb',
  position: 'manager',
  assigned: 'Project'
}]

export const InitManager = {
  assigned: '',
  email: '',
  firstName: '',
  id: '',
  lastName: '',
  position: ''
}
