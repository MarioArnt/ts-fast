import d from "debug";

export const debug = (...args: unknown[]): void => {
  d('ts-fast')(args);
};
