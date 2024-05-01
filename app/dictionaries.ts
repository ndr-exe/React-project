import 'server-only'


const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  ge: () => import('../dictionaries/ge.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: string) => dictionaries[locale as keyof typeof dictionaries]()