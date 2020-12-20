import { call, put } from "redux-saga/effects";

const types: Array<string> = [
  "REQUESTED",
  "SUCCEEDED",
  "FAILED",
  "CLEARED",
  "UPDATED_MINES",
  "UPDATED_TIMES",
  "UPDATED_CELL_OPEN",
  "UPDATED_CELL_FLAG",
];

interface Result {
  [key: string]: any;
}

export const actionConstantsCreator = (constArr: Array<string>): Result => {
  const result: Result = {};

  constArr.forEach((constItem) => {
    result[constItem] = {};
    types.forEach((typeItem) => {
      result[constItem][typeItem] = `${constItem}_${typeItem}`;
    });
  });

  return result;
};

export const actionCreator = (constArr: Array<string>): Result => {
  const result: Result = {};

  constArr.forEach((constItem) => {
    result[constItem] = {};
    types.forEach((typeItem) => {
      result[constItem][typeItem] = (
        payload = {},
        callback: any,
        options: any
      ) => ({
        type: `${constItem}_${typeItem}`,
        payload,
        callback,
        options,
      });
    });
  });

  return result;
};

export function* sagaAssessor(request: any, failure: any, callback: any): any {
  try {
    yield call(request());
  } catch (e) {
    yield put(failure(e));
  } finally {
    callback & ((typeof callback === "function") as any) && callback();
  }
}
