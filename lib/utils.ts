import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from 'query-string';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface FormUrlQueryParams {
  params: string;
  key: string;
  value: string
}

export const formUrlQuery = (params: FormUrlQueryParams) => {

  const currentUrl = qs.parse(params.params);

  currentUrl[params.key] = params.value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl
  },
    { skipNull: true })

}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({ params, keysToRemove }: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  })

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  },
    { skipNull: true })
}
