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

export const formUrlQuery = ({ params, key, value }: FormUrlQueryParams) => {

  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

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

export const dateConverter = (inputDateString: string) => {
  const inputDate: Date = new Date(inputDateString);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const dateFormatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
    "en-US",
    options
  );
  const formattedDate: string = dateFormatter.format(inputDate);

  return formattedDate;
};

export const timeFormatConverter = (timeString: string) => {
  const [hours, minutes] = timeString.split(':');
  let formattedHours = parseInt(hours, 10);
  const ampm = formattedHours >= 12 ? 'PM' : 'AM';

  formattedHours = formattedHours % 12 || 12;
  const formattedTime = `${formattedHours}:${minutes} ${ampm}`;

  return formattedTime;
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);