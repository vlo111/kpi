import { IActivity, IExpectedResult, IManager, IResultArea, IMilestones } from '../types/project'
import { TemUsersType } from '../types/teams'
import { v4 as uuidv4 } from 'uuid'

export const OrganizationList: Array<{ name: string, id: string }> = Array.from(
  { length: 1 },
  (v, i) => ({ id: uuidv4(), name: '' })
)

export const RegionList: Array<{ name: string, id: string }> = Array.from(
  { length: 1 },
  (v, i) => ({ id: uuidv4(), name: '' })
)

export const SectorList: Array<{ name: string, id: string }> = Array.from(
  { length: 1 },
  (v, i) => ({ id: uuidv4(), name: '' })
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

export const TeamList: () => TemUsersType[] = () => [
  {
    key: '1',
    name: 'John Brown',
    status: 'Pending',
    viewLevel: 'Project',
    email: 'tetst@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  },
  {
    key: '2',
    name: 'John Brown2',
    status: 'Pending',
    viewLevel: 'Template',
    email: 'tetstnewformat@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  },
  {
    key: '3',
    name: 'John Brown3',
    status: 'Registered',
    viewLevel: 'Activity',
    email: 'mailname@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  },
  {
    key: '4',
    name: 'John Brown4',
    status: 'Pending',
    viewLevel: 'Sub-activity',
    email: 'analysed@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  },
  {
    key: '5',
    name: 'John Brown5',
    status: 'Registered',
    viewLevel: 'Project',
    email: 'meetk@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  },
  {
    key: '6',
    name: 'John Brown6',
    status: 'Registered',
    viewLevel: 'Project',
    email: 'data@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  },
  {
    key: '7',
    name: 'John Brown7',
    status: 'Registered',
    viewLevel: 'Template',
    email: 'new@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  },
  {
    key: '8',
    name: 'John Brown8',
    status: 'Registered',
    viewLevel: 'Project',
    email: 'data@email.ru',
    picture: 'https://joeschmoe.io/api/v1/random'
  }
]

export const UsersPermissionsRule: () => any = () => [
  {
    value: 'project',
    label: 'Project'
  },
  {
    value: 'result_area',
    label: 'Result Area',
    children: [
      {
        value: 'result_area1',
        label: 'Result Area1'
      },
      {
        value: 'result_area2',
        label: 'Result Area2'
      },
      {
        value: 'result_area3',
        label: 'Result Area3'
      }
    ]
  },
  {
    value: 'activity',
    label: 'Activity',
    children: [
      {
        value: 'result_area1',
        label: 'Result Area1',
        children: [
          {
            value: 'activity_1',
            label: 'Activity 1.1'
          },
          {
            value: 'activity_2',
            label: 'Activity 1.2'
          },
          {
            value: 'activity_3',
            label: 'Activity 1.3'
          }
        ]
      },
      {
        value: 'result_area_2',
        label: 'Result Area 2'
      },
      {
        value: 'result_area_3',
        label: 'Result Area 3',
        children: [
          {
            value: 'activity_3',
            label: 'Activity 3.1'
          },
          {
            value: 'activity_4',
            label: 'Activity 3.3'
          }
        ]
      }
    ]
  },
  {
    value: 'template',
    label: 'Template',
    children: [
      {
        value: 'result_area1',
        label: 'Result Area1',
        children: [
          {
            value: 'activity_1',
            label: 'Activity 1.1'
          },
          {
            value: 'activity_2',
            label: 'Activity 1.2'
          },
          {
            value: 'activity_3',
            label: 'Activity 1.3'
          }
        ]
      },
      {
        value: 'result_area2',
        label: 'Result Area2'
      },
      {
        value: 'result_area3',
        label: 'Result Area3',
        children: [
          {
            value: 'activity_3',
            label: 'Activity 3.1'
          },
          {
            value: 'activity_4',
            label: 'Activity 3.3',
            children: [
              {
                value: 'course_template_1',
                label: 'One section course template'
              },
              {
                value: 'course_template_2',
                label: 'Multi section course template'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    value: 'sub_activity',
    label: 'Sub-Activity',
    children: [
      {
        value: 'result_area1',
        label: 'Result Area1',
        children: [
          {
            value: 'activity_1',
            label: 'Activity 1.1'
          },
          {
            value: 'activity_2',
            label: 'Activity 1.2'
          },
          {
            value: 'activity_3',
            label: 'Activity 1.3'
          }
        ]
      },
      {
        value: 'result_area2',
        label: 'Result Area2'
      },
      {
        value: 'result_area3',
        label: 'Result Area3',
        children: [
          {
            value: 'activity_3',
            label: 'Activity 3.1',
            children: [
              {
                value: 'python_course',
                label: 'Python course'
              },
              {
                value: 'jS_course',
                label: 'JS course'
              }
            ]
          },
          {
            value: 'activity_4',
            label: 'Activity 3.3'
          }
        ]
      }
    ]
  }
]
