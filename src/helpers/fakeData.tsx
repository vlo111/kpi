import { IResultArea } from '../types/project'

export const OrganizationList: Array<{ name: string, id: string }> =
    Array.from({ length: 10 }, (v, i) => ({ id: `o${i}`, name: `Organization ${i}` }))

export const RegionList: Array<{ name: string, id: string }> =
    Array.from({ length: 10 }, (v, i) => ({ id: `r${i}`, name: `regions ${i}` }))

export const SectorList: Array<{ name: string, id: string }> =
    Array.from({ length: 10 }, (v, i) => ({ id: `s${i}`, name: `Sector ${i}` }))

export const ResultArea: IResultArea[] =
    Array.from({ length: 10 }, (v, i) => ({
      id: `r${i}`,
      name: `${i}. Skill gap reduced`,
      expectedResult: [{
        id: `rl1${i}`,
        code: `OC1.${i}`,
        result: 'Individuals with improved technical and soft skills following participation in USG-assisted workforce development programs ',
        measure: 'Number',
        target: 100
      }],
      activity: [{
        id: `rl2${i}`,
        code: `AW5.${i}`,
        milestone: 'skill mapping study completed and study report, summarizing findings.',
        measure: 'Attachment',
        target: 65
      }]
    }))

/*
export const ResultArea = [
  {
    id: 'ra',
    name: '1. Skill gap reduced',
    expectedResult: [{
      id: 'ral1',
      code: 'OC1.3',
      result: 'Individuals with improved technical and soft skills following participation in USG-assisted workforce development programs ',
      measure: 'Number',
      target: 100
    }],
    activity: [{
      id: 'ral2',
      code: 'AW5.8',
      milestone: 'skill mapping study completed and study report, summarizing findings.',
      measure: 'Attachment',
      target: 65
    }]
  },
  {
    id: 'ra2',
    name: '2. Skill gap reduced',
    expectedResult: [{
      id: 'ral2',
      code: 'OC1.3',
      result: 'Individuals with improved technical and soft skills following participation in USG-assisted workforce development programs ',
      measure: 'Number',
      target: 100
    }],
    activity: [{
      id: 'ral3',
      code: 'AW5.8',
      milestone: 'skill mapping study completed and study report, summarizing findings.',
      measure: 'Attachment',
      target: 65
    }]
  }
]
*/
