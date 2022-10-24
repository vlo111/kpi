
export const OrganizationList: (count: number) => Array<{ name: string, id: string }> =
    (count: number) => Array.from({ length: count }, (v, i) => ({ id: `o${i}`, name: `Organization ${i}` }))

export const RegionList: (count: number) => Array<{ name: string, id: string }> =
    (count: number) => Array.from({ length: count }, (v, i) => ({ id: `r${i}`, name: `regions ${i}` }))

export const SectorList: (count: number) => Array<{ name: string, id: string }> =
    (count: number) => Array.from({ length: count }, (v, i) => ({ id: `s${i}`, name: `Sector ${i}` }))
