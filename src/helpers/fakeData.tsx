import { TemUsersType } from '../types/teams'
import {
  IActivity,
  IExpectedResult,
  IManager,
  IResultArea,
  IMilestones,
  ITemplateData
} from '../types/project'
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

export const ManagerList: () => IManager[] = () => [
  {
    id: '1',
    firstName: 'Volodya',
    color: `#${((Math.random() * 0xffffff) << 0)
      .toString(16)
      .padStart(6, '0')}`,
    lastName: 'Vardanyan',
    email: 'vv@vv.vv',
    position: 'manager',
    assigned: 'Project'
  },
  {
    id: '2',
    firstName: 'Leo',
    color: `#${((Math.random() * 0xffffff) << 0)
      .toString(16)
      .padStart(6, '0')}`,
    lastName: 'Messi',
    email: 'aa@aa.bb',
    position: 'manager',
    assigned: 'Project'
  }
]

export const InitManager = {
  assigned: '',
  email: '',
  color: `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0')}`,
  firstName: '',
  id: '',
  lastName: '',
  position: ''
}

export const courseTemplateData: ITemplateData[] | [] = [
  {
    id: uuidv4(),
    title: 'Title',
    subTitle: [''],
    option: [],
    switch: true,
    disabled: true,
    status: 0
  },
  {
    id: uuidv4(),
    title: 'Organization',
    subTitle: ['EIF', 'Analysed'],
    option: [],
    switch: true,
    disabled: true,
    status: 0
  },
  {
    id: uuidv4(),
    title: 'Activity Manager',
    subTitle: [''],
    option: [],
    switch: true,
    disabled: true,
    status: 0
  },
  {
    id: uuidv4(),
    title: 'Sector',
    subTitle: ['IT', 'Tourism', 'Hospitality'],
    option: [],
    switch: true,
    disabled: true,
    status: 0
  },
  {
    id: uuidv4(),
    title: 'Region',
    subTitle: ['Ararat marz', 'Gegharkunik', 'Syunik'],
    option: [],
    switch: true,
    disabled: true,
    status: 0
  },
  {
    id: uuidv4(),
    title: 'Start Date',
    subTitle: [''],
    option: [],
    switch: true,
    disabled: true,
    status: 0
  },
  {
    id: uuidv4(),
    title: 'End Date',
    subTitle: [''],
    option: [],
    switch: true,
    disabled: true,
    status: 0
  },
  {
    id: uuidv4(),
    title: 'Teaching Mode',
    subTitle: ['Online', 'Offline', 'Blended'],
    option: [],
    switch: true,
    disabled: true,
    status: 0
  },
  {
    id: uuidv4(),
    title: 'Duration',
    subTitle: [],
    option: [],
    switch: true,
    disabled: true,
    status: 0
  },
  {
    id: uuidv4(),
    title: 'Partner organization',
    subTitle: [''],
    option: [],
    switch: false,
    disabled: false,
    status: 0
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
export const generalInfo = [
  {
    title: 'Title',
    description: 'AWDA'
  },
  {
    title: 'Description',
    description: `Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills
    Armenia Workforce Development Activity (AWDA) is a five-year program, designed to provide the youth and women with the opportunities to improve their skills`
  },
  {
    title: 'Start Date',
    description: '10/11/21'
  },
  {
    title: 'End Date',
    description: '10/10/26'
  }
]
export const resultAndActivities = [
  {
    option: 'OP1.1',
    count: '1000',
    description: 'individuals with improved technical and soft skills following participation in USG-assisted workforce development programs'
  },
  {
    option: 'OP1.2',
    count: '50',
    description: 'vulnerable persons including persons with disabilities (PWD) benefiting from U.S. Government supported work-based training and dual education programs'
  },
  {
    option: 'OP1.3',
    count: '50%',
    description: 'female participants in USG-assisted programs '
  },
  {
    option: 'OP1.4',
    count: '20',
    description: 'service providers trained who serve vulnerable persons'
  },
  {
    option: 'OP1.5',
    count: '1',
    description: 'U.S. Government‐assisted organization and/or service delivery system that serves vulnerable persons strengthened'
  }
]

export const organisations =
  {
    title: 'Organisations',
    descriptions: ['Analysed', 'EIF', 'Synergy']
  }
export const regionas =
  {
    title: 'Regionas/Marzes',
    descriptions: ['Ararat marz', 'Syunik marz', 'Gegharkunik marz']
  }
export const sectors =
  {
    title: 'Sectors',
    descriptions: ['IT', 'Tourism', 'Hospitality']
  }

export const courseSectionData = [
  {
    id: uuidv4(),
    name: 'Applicant',
    checked: true,
    disabled: true
  },
  {
    id: uuidv4(),
    name: 'Selection',
    checked: true,
    disabled: false
  },
  {
    id: uuidv4(),
    name: 'Pre-assessment of selected',
    checked: true,
    disabled: true
  },
  {
    id: uuidv4(),
    name: 'Participant',
    checked: true,
    disabled: true
  },
  {
    id: uuidv4(),
    name: 'Trained',
    checked: true,
    disabled: true
  },
  {
    id: uuidv4(),
    name: 'Not enrolled',
    checked: true,
    disabled: true
  },
  {
    id: uuidv4(),
    name: 'Dropped',
    checked: true,
    disabled: true
  }
]
