import React, { useState, useEffect, BaseSyntheticEvent } from "react";

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
  const [level, setLevel] = useState("simple");
  const [classHide, setClassHide] = useState("hide");
  const [initialValues, setinitialValues] = useState(FORMS.BOARD_SIZE.INIT);

  const levels = [
    {
      level: "simple",
      rows: 5,
      cols: 5,
      mines: 5,
    },
    {
      level: "medium",
      rows: 10,
      cols: 10,
      mines: 20,
    },
    {
      level: "hard",
      rows: 15,
      cols: 15,
      mines: 30,
    },
    {
      level: "custom",
      rows: 0,
      cols: 0,
      mines: 0,
    },
  ];

  const handleSubmit = (data: FormDataType) => {
    const { board, mines } = generateGame(data);
    dispatch(
      actions.GAME.REQUESTED({
        settings: data,
        history: [
          {
            game: { board: board, flags: data.mines, times: 0, play: false },
          },
        ],
        mines,
        step: 0,
      })
    );
  };

  const handleChange = (e: BaseSyntheticEvent) => {
    //console.log(levels.find((item) => item.level === e.currentTarget.value));
    setLevel(e.currentTarget.value);
  };

  useEffect(() => {
    setinitialValues(
      levels.find((item) => item.level === level) || FORMS.BOARD_SIZE.INIT
    );
    console.log(initialValues);
    setClassHide(level !== "custom" ? "hide" : "");
  }, [level]);

  return (
    <div className="welcome">
      <h1 className="title">Welcome</h1>
      <p className="welcome__description">Choose level:</p>
      <div className="welcome__form">
        <div className="form__row">
          <label htmlFor="labelCols" className="form__label">
            Level:
          </label>
          <select
            name="level"
            id="level"
            onChange={handleChange}
            className="form__select"
          >
            <option value="simple">Simple</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
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
          console.log(cols);
          const handleChangeField = (e: BaseSyntheticEvent) => {
            const fieldValue = e.currentTarget.value;
            const fieldName = e.currentTarget.name;

            setFieldValue(fieldName, fieldValue, false);
            setFieldTouched(fieldName, true, false);
          };

          return (
            <>
              <div className="welcome__form">
                <Form className="form">
                  <div className={`form__inner ${classHide}`}>
                    <p className="welcome__description">Set Board size:</p>
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
