export namespace Logger {
  export const log = (message: string, ...params: any[]): void =>
    console.log(message, params);

  export const warn = (message: string, ...params: any[]): void =>
    console.warn(message, params);

  export const error = (message: string, ...params: any[]): void =>
    console.error(message, params);
}
