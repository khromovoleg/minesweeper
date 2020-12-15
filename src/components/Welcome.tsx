import React, { BaseSyntheticEvent } from "react";

//import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

import { actions } from "store/actions";
import { FORMS } from "utils";

interface FormDataType {
  [key: string]: number | string;
}

const Welcome: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = (data: FormDataType) => {
    dispatch(actions.GAME.REQUESTED(data));
  };

  return (
    <div>
      <Formik
        initialValues={FORMS.BOARD_SIZE.INIT}
        validationSchema={FORMS.BOARD_SIZE.SCHEME}
        onSubmit={handleSubmit}
      >
        {({
          handleSubmit,
          errors,
          touched,
          values: { cols, rows, mines },
          setFieldValue,
          setFieldTouched,
        }) => {
          const handleChangeField = (e: BaseSyntheticEvent) => {
            const fieldValue = e.currentTarget.value;
            const fieldName = e.currentTarget.name;

            setFieldValue(fieldName, fieldValue, false);
            setFieldTouched(fieldName, true, false);
          };

          return (
            <>
              <h2>Welcome</h2>
              <p>Set Field size:</p>
              <div>
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="labelCols">Columns:</label>
                    <input
                      id="labelCols"
                      type="text"
                      name="cols"
                      value={cols}
                      onChange={handleChangeField}
                    />
                    {errors.cols && touched.cols && (
                      <span className="error">{errors.cols}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="labelRows">Rows:</label>
                    <input
                      id="labelRows"
                      type="text"
                      name="rows"
                      value={rows}
                      onChange={handleChangeField}
                    />
                    {errors.rows && touched.rows && (
                      <span className="error">{errors.rows}</span>
                    )}
                  </div>
                  <div>
                    <label htmlFor="labelMines">Mines:</label>
                    <input
                      id="labelMines"
                      type="text"
                      name="mines"
                      value={mines}
                      onChange={handleChangeField}
                    />
                    {errors.mines && touched.mines && (
                      <span className="error">{errors.mines}</span>
                    )}
                  </div>
                  <div>
                    <button type="submit">OK</button>
                  </div>
                </form>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default Welcome;
