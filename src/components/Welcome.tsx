import React, { BaseSyntheticEvent } from "react";

import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";

import { actions } from "store/actions";
import { FORMS, generateGame } from "utils";

import "styles/index.scss";

interface FormDataType {
  [key: string]: number | string;
}

const Welcome: React.FC = () => {
  const dispatch = useDispatch();

  const handleSubmit = (data: FormDataType) => {
    const { game, mines } = generateGame(data);
    dispatch(
      actions.GAME.REQUESTED({
        settings: data,
        game: { board: game, flags: data.mines, times: 0, play: false },
        mines,
      })
    );
  };

  return (
    <div className="welcome">
      <Formik
        enableReinitialize={true}
        initialValues={FORMS.BOARD_SIZE.INIT}
        validationSchema={FORMS.BOARD_SIZE.SCHEME}
        onSubmit={handleSubmit}
      >
        {({
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
              <h1 className="title">Welcome</h1>
              <p className="welcome__description">Set Board size:</p>
              <div className="welcome__form">
                <Form className="form">
                  <div className="form__row">
                    <label htmlFor="labelCols" className="form__label">
                      Columns:
                    </label>
                    <input
                      id="labelCols"
                      type="text"
                      name="cols"
                      value={cols}
                      className="form__input"
                      onChange={handleChangeField}
                    />
                    {errors.cols && touched.cols && (
                      <span className="form__error">{errors.cols}</span>
                    )}
                  </div>
                  <div className="form__row">
                    <label htmlFor="labelRows" className="form__label">
                      Rows:
                    </label>
                    <input
                      id="labelRows"
                      type="text"
                      name="rows"
                      value={rows}
                      className="form__input"
                      onChange={handleChangeField}
                    />
                    {errors.rows && touched.rows && (
                      <span className="form__error">{errors.rows}</span>
                    )}
                  </div>
                  <div className="form__row">
                    <label htmlFor="labelMines" className="form__label">
                      Mines:
                    </label>
                    <input
                      id="labelMines"
                      type="text"
                      name="mines"
                      value={mines}
                      className="form__input"
                      onChange={handleChangeField}
                    />
                    {errors.mines && touched.mines && (
                      <span className="form__error">{errors.mines}</span>
                    )}
                  </div>
                  <div className="form__row form__row--btn">
                    <button type="submit" className="btn form__btn">
                      OK
                    </button>
                  </div>
                </Form>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default Welcome;
