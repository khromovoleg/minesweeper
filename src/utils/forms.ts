import * as Yup from "yup";

const moreSize = 1;
const lessSize = 30;
const moreMines = 1;
const lessMines = 30 * 10;

export const FORMS = {
  BOARD_SIZE: {
    INIT: {
      rows: 0,
      cols: 0,
      mines: 0,
    },
    SCHEME: Yup.object().shape({
      rows: Yup.number()
        .required("This field is required")
        .integer("Validates that a number is an integer")
        .positive("Value must be a positive number")
        .moreThan(
          moreSize,
          `Value must be strictly greater than min. The ${moreSize} interpolation can be used in the message argument`
        )
        .lessThan(
          lessSize,
          `Value must be less than max. The ${lessSize} interpolation can be used in the message argument`
        ),
      cols: Yup.number()
        .required("This field is required")
        .integer("Validates that a number is an integer")
        .positive("Value must be a positive number")
        .moreThan(
          moreSize,
          `Value must be strictly greater than min. The ${moreSize} interpolation can be used in the message argument`
        )
        .lessThan(
          lessSize,
          `Value must be less than max. The ${lessSize} interpolation can be used in the message argument`
        ),
      mines: Yup.number()
        .required("This field is required")
        .integer("Validates that a number is an integer")
        .positive("Value must be a positive number")
        .moreThan(
          moreMines,
          `Value must be strictly greater than min. The ${moreMines} interpolation can be used in the message argument`
        )
        .lessThan(
          lessMines,
          `Value must be less than max. The ${lessMines} interpolation can be used in the message argument`
        ),
    }),
  },
};
