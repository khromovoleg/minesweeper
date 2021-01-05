import * as Yup from "yup";

const moreSize = 4;
const lessSize = 16;
const moreMines = 4;
const lessMines = 10 * 2 + 1;

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
          `Value must be strictly greater than min. Min: ${moreSize + 1}.`
        )
        .lessThan(
          lessSize,
          `Value must be less than max. Max: ${lessSize - 1}.`
        ),
      cols: Yup.number()
        .required("This field is required")
        .integer("Validates that a number is an integer")
        .positive("Value must be a positive number")
        .moreThan(
          moreSize,
          `Value must be strictly greater than min. Min: ${moreSize + 1}.`
        )
        .lessThan(
          lessSize,
          `Value must be less than max. Max: ${lessSize - 1}.`
        ),
      mines: Yup.number()
        .required("This field is required")
        .integer("Validates that a number is an integer")
        .positive("Value must be a positive number")
        .moreThan(
          moreMines,
          `Value must be strictly greater than min. Min: ${moreMines + 1}.`
        )
        .lessThan(
          lessMines,
          `Value must be less than max. Max: ${lessMines - 1}.`
        ),
    }),
  },
};
