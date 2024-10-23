# usePaginationParams

A simple React library for managing pagination through the URL

## API

### usePaginationParams()

```typescript
usePaginationParams(args? : { limit? : number, offset? : number }) => {
    limit: number,
    offset: number,
    setLimit: (limit: number) => void,
    setOffset: (offset: number) => void,
    setParams: SetSearchParams,
    params: URLSearchParams,
}
```

| Parameter | Type     | Required? | Default value | Description    |
|-----------|----------|-----------|---------------|----------------|
| `limit`   | `number` | optional  | 5             | Default limit  |
| `offset`  | `number` | optional  | 0             | Default offset |




# useTableQueryParams

A simple React library for managing filtering and pagination through the URL

## API

### useTableQueryParams()

```typescript
useTableQueryParams(args: UseTableQueryParamsArgs<
    QKey extends string,
    QObj extends Partial<Record<QKey, any>>,
    FObj extends Record<string, any>,
    OKey extends string,
    ODirection extends OrderDirection>
) => UseTableQueryParamsResponse<QKey, QObj, FObj, OKey, ODirection>

interface UseTableQueryParamsResponse<
    QKey extends string,
    QObj extends Partial<Record<QKey, any>>,
    FObj extends Record<string, any>,
    OKey extends string,
    ODirection extends OrderDirection,
> extends UsePaginationParamsResponse {
    filtersForRequest: QObj,
    filtersForRender: FObj,
    onSubmitFilters: (data: FObj) => void,
    clearFilters: () => void,
    changeOrder: (key: OKey) => void,
    orderBy: Optional<OKey>,
    orderDirection: Optional<ODirection>,
}
```
Parameter extends from parameters of `usePaginationParams`

| Parameter                      | Type                                                   | Required? | Description                                                            |
|--------------------------------|--------------------------------------------------------|-----------|------------------------------------------------------------------------|
| `parseFiltersForRequest`       | `(params: URLSearchParams) => QObj`                    | required  | Function which for convert URLSearchParams to object for request       |
| `prepareFiltersForComponents`  | `(params: URLSearchParams) => FObj`                    | required  | Function which for convert URLSearchParams to object for filters in UI |
| `beforeSubmit`                 | `(data: FObj) => QObj`                                 | required  | Function which for convert filter object to object for URL             |
| `validateOrderBy`              | ` validateOrderBy: (params: string) => Optional<OKey>` | required  | Function which for validate orderKey                                   |
| `defaultOrderKey`              | `defaultOrderKey?: OKey`                               | optional  | Default order key                                                      |
| `defaultParams`                | `defaultParams?: QObj`                                 | optional  | Default object for URLSearchParams                                     |
| `defaultDirection`             | `defaultDirection?: ODirection`                        | optional  | Default order direction                                                |
