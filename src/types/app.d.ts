export type Errors<T> = {
    [K in keyof T]?: string;
};
