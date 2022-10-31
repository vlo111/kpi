import { Rules } from '../types/project'

export const rules: Rules = (min, max) => ({ rules: [{ required: true, min, max }] })
