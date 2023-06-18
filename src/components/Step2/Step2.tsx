// import "./Step2.css";
// import trashIcon from "../../assets/delete.svg";

// const Step2 = () => {
//   return (
//     <form>
//       <div className="inputForm">
//         <div className="textLabel">Advantages</div>
//         <div className="create-remove-container">
//           <input type="text" id="field-advantages-1" />
//           <button id="button-remove-1">
//             <img src={trashIcon} alt="Trash" />
//           </button>
//         </div>
//         <div className="create-remove-container">
//           <input type="text" id="field-advantages-2" />
//           <button id="button-remove-2">
//             <img src={trashIcon} alt="Trash" />
//           </button>
//         </div>
//         <div className="create-remove-container">
//           <input type="text" id="field-advantages-3" />
//           <button id="button-remove-3">
//             <img src={trashIcon} alt="Trash" />
//           </button>
//         </div>
//         <button id="button-add">+</button>
//       </div>
//       <div className="checkbox-group">
//         <div className="textLabel">Checkbox group</div>
//         <label>
//           <input type="checkbox" />1
//         </label>
//         <label>
//           <input type="checkbox" />2
//         </label>
//         <label>
//           <input type="checkbox" />3
//         </label>
//       </div>

//       <div className="radio-group">
//         <div className="textLabel">Radio group</div>
//         <label htmlFor="radioButton1">
//           <input
//             type="radio"
//             id="field-radio-group-option-1"
//             name="radioGroup"
//             value="1"
//           />
//           1
//         </label>

//         <label htmlFor="radioButton2">
//           <input
//             type="radio"
//             id="field-radio-group-option-2"
//             name="radioGroup"
//             value="2"
//           />
//           2
//         </label>

//         <label htmlFor="radioButton3">
//           <input
//             type="radio"
//             id="field-radio-group-option-3"
//             name="radioGroup"
//             value="3"
//           />
//           3
//         </label>
//       </div>
//     </form>
//   );
// };

// export default Step2;

import "./Step2.css";
import trashIcon from "../../assets/delete.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState, updateStep2Values } from "../../store/store";
import { ChangeEvent, useState, useEffect } from "react";
import { FormikProps } from "formik";

interface Step2Props {
  formik: FormikProps<{
    advantages: string[];
    checkboxGroup: number[];
    radioGroup: string;
  }>;
}

const Step2 = ({ formik }: Step2Props) => {
  const step2Values = useSelector((state: RootState) => state.form.step2Values);

  const dispatch = useDispatch();
  const [advantageInputs, setAdvantageInputs] = useState<string[]>([""]);

  useEffect(() => {
    setAdvantageInputs(step2Values.advantages);
  }, [step2Values.advantages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedValues = [...step2Values.checkboxGroup];
      const checkboxIndex = Number(value) - 1;
      updatedValues[checkboxIndex] = checked ? checkboxIndex + 1 : 0;
      dispatch(updateStep2Values({ checkboxGroup: updatedValues }));
      formik.setFieldTouched("checkboxGroup", true);
      formik.setFieldValue("checkboxGroup", updatedValues);
    } else if (name === "advantages") {
      const inputIndex = Number(e.target.getAttribute("data-index"));
      const updatedInputs = [...advantageInputs];
      updatedInputs[inputIndex] = value;
      setAdvantageInputs(updatedInputs);
      dispatch(updateStep2Values({ advantages: updatedInputs }));
      formik.setFieldTouched("advantages", true);
      formik.setFieldValue("advantages", updatedInputs);
    } else {
      dispatch(updateStep2Values({ [name]: value }));
      formik.setFieldTouched("radioGroup", true);
      formik.setFieldValue("radioGroup", value);
    }
  };

  const handleAddAdvantage = () => {
    setAdvantageInputs([...advantageInputs, ""]);
  };

  const handleRemoveAdvantage = (index: number) => {
    const updatedInputs = [...advantageInputs];
    updatedInputs.splice(index, 1);
    setAdvantageInputs(updatedInputs);
    dispatch(updateStep2Values({ advantages: updatedInputs }));
  };

  return (
    <form>
      <div className="inputForm">
        <div className="textLabel">Advantages</div>
        {advantageInputs.map((input, index) => (
          <div className="create-remove-container" key={index}>
            <input
              type="text"
              id={`field-advantages-${index + 1}`}
              name="advantages"
              value={input}
              data-index={index}
              onChange={handleInputChange}
            />
            <button
              className="button-remove"
              type="button"
              id={`button-remove-${index + 1}`}
              onClick={() => handleRemoveAdvantage(index)}
            >
              <img src={trashIcon} alt="Trash" />
            </button>
            {formik.touched.advantages && formik.errors.advantages && (
              <div className="error">{formik.errors.advantages}</div>
            )}

            {formik.touched.checkboxGroup && formik.errors.checkboxGroup && (
              <div className="error">{formik.errors.checkboxGroup}</div>
            )}

            {formik.touched.radioGroup && formik.errors.radioGroup && (
              <div className="error">{formik.errors.radioGroup}</div>
            )}
          </div>
        ))}
        <button type="button" id="button-add" onClick={handleAddAdvantage}>
          +
        </button>
        {formik.touched.advantages && formik.errors.advantages && (
          <div className="error">{formik.errors.advantages}</div>
        )}
      </div>
      <div className="checkbox-group">
        <div className="textLabel">Checkbox group</div>
        {step2Values.checkboxGroup.map((value, index) => (
          <label key={index}>
            <input
              type="checkbox"
              name="checkboxGroup"
              value={index + 1}
              checked={value !== 0}
              onChange={handleInputChange}
            />
            {index + 1}
          </label>
        ))}
        {formik.touched.checkboxGroup && formik.errors.checkboxGroup && (
          <div className="error">{formik.errors.checkboxGroup}</div>
        )}
      </div>

      <div className="radio-group">
        <div className="textLabel">Radio group</div>
        <label htmlFor="radioButton1">
          <input
            type="radio"
            id="field-radio-group-option-1"
            name="radioGroup"
            value="1"
            checked={step2Values.radioGroup === "1"}
            onChange={handleInputChange}
          />
          1
        </label>

        <label htmlFor="radioButton2">
          <input
            type="radio"
            id="field-radio-group-option-2"
            name="radioGroup"
            value="2"
            checked={step2Values.radioGroup === "2"}
            onChange={handleInputChange}
          />
          2
        </label>

        <label htmlFor="radioButton3">
          <input
            type="radio"
            id="field-radio-group-option-3"
            name="radioGroup"
            value="3"
            checked={step2Values.radioGroup === "3"}
            onChange={handleInputChange}
          />
          3
        </label>
        {formik.touched.radioGroup && formik.errors.radioGroup && (
          <div className="error">{formik.errors.radioGroup}</div>
        )}
      </div>
    </form>
  );
};

export default Step2;
