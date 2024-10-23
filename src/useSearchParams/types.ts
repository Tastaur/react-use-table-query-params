export type ParamEntries = Record<string, string | number | boolean | null>;
export type SetSearchParams = (params: ParamEntries | ((prevParams: URLSearchParams) => URLSearchParams)) => void;