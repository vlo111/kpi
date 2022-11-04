import { InitialFields, IResultArea, Rules } from '../types/project'

export const rules: Rules = (min, max) => ({
  rules: [{ required: true, min, max }]
})

export const initFields: InitialFields = (resultArea) => [
  ...resultArea.map((o: IResultArea) => ({
    name: [o.expectedResult[0].id],
    value: o.expectedResult[0].code
  })),
  ...resultArea
    .map((o: IResultArea) =>
      o.expectedResult.map((l) => [
        { name: [`c${l.id}`], value: l.code },
        { name: [`r${l.id}`], value: l.result },
        { name: [`m${l.id}`], value: l.measure },
        { name: [`t${l.id}`], value: l.target }
      ])
    )
    .flat()
    .flat(),
  ...resultArea
    .map((o: IResultArea) =>
      o.activity.map((l) =>
        l.milestones.map((m) => [
          { name: [`c${m.id}`], value: m.code },
          { name: [`r${m.id}`], value: m.milestone },
          { name: [`m${m.id}`], value: m.measure },
          { name: [`t${m.id}`], value: m.target }
        ])
      )
    )
    .flat()
    .flat()
    .flat()
]