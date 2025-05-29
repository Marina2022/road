import {closest} from 'fastest-levenshtein'

export const getClosestString = (path: string, paths:string[]) => {
  return closest(path, paths)  
}

