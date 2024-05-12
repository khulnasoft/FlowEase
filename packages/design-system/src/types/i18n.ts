export type FloweaseLocaleTranslateFn = (path: string, options: object) => string;

export type FloweaseLocale = Record<string, string | ((...args: unknown[]) => string)>;
