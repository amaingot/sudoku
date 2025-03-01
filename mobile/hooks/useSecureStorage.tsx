import React from "react";
import {
  getSecureStorageValue,
  setSecureStorageValue,
} from "@/utils/secureStorage";

interface UseSecureStorageParams<T> {
  key: string;
  initialValue?: T;
  isObject?: boolean;
}

type UseSecureStorageReturn<T> = [T | undefined, (newValue: T | undefined) => Promise<void>];

const useSecureStorage = <T extends unknown = string>(
  params: UseSecureStorageParams<T>
): UseSecureStorageReturn<T> => {
  const { key, initialValue, isObject } = params;
  const [value, setValue] = React.useState<T | undefined>(() => {
    const rawValue = getSecureStorageValue(key);
    if (isObject && rawValue) return JSON.parse(rawValue) as T;
    if (rawValue) return rawValue as T;
    return initialValue;
  });

  const setSecureValue = async (newValue: T | undefined) => {
    setValue(newValue);
    if (newValue === undefined) {
      setSecureStorageValue(key, undefined);
    } else {
      setSecureStorageValue(
        key,
        isObject ? (JSON.stringify(newValue) as string) : (newValue as string)
      );
    }
  };

  return [value, setSecureValue];
};

export default useSecureStorage;
