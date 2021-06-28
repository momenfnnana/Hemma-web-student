export const lvls = [
  { id: '-', title: "اختر المستوى" },
  { id: "NoLevel", title: "بلا مستويات" },
  { id: "FirstLevel", title: "المستوى الأول" },
  { id: "SecondLevel", title: "المستوى الثاني" },
];

export const findTitle = (id)=>{
 const foundLvl =   lvls.find(lvl => lvl.id === id)
 return foundLvl?.title || ''
}

export const mappedStringsToLvls = (strings = [])=>{
  return strings.map(string => ({
    id : string,
    title : findTitle(string)
  }))
} 
export const emptyOption = lvls[0]

export const EMPTY_ID = '-'
