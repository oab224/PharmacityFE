import { clsx, type ClassValue } from "clsx";
import { Check, CircleAlert, LucideIcon, TriangleAlert } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mergeRefs<T>(
  ...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

export function capitalize(str: string): string {
  if (!str) {
    return str;
  }

  if (str.length === 1) {
    return str.charAt(0).toUpperCase();
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getInitials(name: string): string {
  if (!name) {
    return "";
  }
  return name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");
}

type PingStatus = {
  icon: LucideIcon;
  ping: number;
  color: string;
};

export const getPingStatusIcon = (ping: number): PingStatus => {
  if (!ping) {
    return {
      icon: CircleAlert,
      ping: 0,
      color: "red-600",
    };
  }
  if (ping < 2500) {
    return {
      icon: Check,
      ping,
      color: "green-600",
    };
  }
  if (ping >= 2500 && ping < 10000) {
    return {
      icon: TriangleAlert,
      ping,
      color: "yellow-500",
    };
  }
  if (ping >= 10000) {
    return {
      icon: CircleAlert,
      ping,
      color: "red-600",
    };
  }

  return {
    icon: CircleAlert,
    ping: 0,
    color: "red-600",
  };
};

/**
 * Removes key-value pairs from an object where the value is an empty string.
 *
 * @param obj - The object from which empty string values should be removed.
 * @returns A new object with all key-value pairs where the value is an empty string removed.
 */

export const removeEmptyKeys = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== "")
  );
};
