import { call, put } from "redux-saga/effects";

const types = [];

export const actionConstantsCreator = (constArr: Array): void => {
  const result = {};

  constArr.forEach((constItem) => {
    result[constItem] = {};
    types.forEach((typeItem) => {
      result[constItem][typeItem] = `${constItem}_${typeItem}`;
    });
  });

  return result;
};

export const actionCreator = (constArr: Array): void => {
  const result = {};

  constArr.forEach((constItem) => {
    result[constItem] = {};
    types.forEach((typeItem) => {
      result[constItem][typeItem] = (payload = {}, callback, options) => ({
        type: `${constItem}_${typeItem}`,
        payload,
        callback,
        options,
      });
    });
  });

  return result;
};

export function* sagaAssessor(
  request: void,
  failure: void,
  callback: void
): void {
  try {
    yield call(request());
  } catch (e) {
    yield put(failure(e));
  } finally {
    callback & (typeof callback === "function") && callback();
  }
}
