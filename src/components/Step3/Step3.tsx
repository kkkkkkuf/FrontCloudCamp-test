// import "./Step3.css";

// const Step3 = () => {
//   return (
//     <form>
//       <div className="inputFormArea">
//         <div className="textLabel">About</div>
//         <textarea placeholder="Введите информацию о себе..."></textarea>
//       </div>
//     </form>
//   );
// };

// export default Step3;

// import "./Step3.css";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, updateStep3Values } from "../../store/store";
// import { ChangeEvent } from "react";

// const Step3 = () => {
//   const step3Values = useSelector((state: RootState) => state.form.step3Values);
//   const dispatch = useDispatch();

//   const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     dispatch(updateStep3Values({ [name]: value }));
//   };

//   return (
//     <form>
//       <div className="inputFormArea">
//         <div className="textLabel">About</div>
//         <textarea
//           name="about"
//           placeholder="Введите информацию о себе..."
//           value={step3Values.about}
//           onChange={handleInputChange}
//         ></textarea>
//       </div>
//     </form>
//   );
// };

// export default Step3;

import "./Step3.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, updateStep3Values } from "../../store/store";
import { ChangeEvent } from "react";
import { FormikProps } from "formik";
interface Step3Props {
  formik: FormikProps<{
    about: string;
    characterCount: number;
  }>;
}

const Step3 = ({ formik }: Step3Props) => {
  const step3Values = useSelector((state: RootState) => state.form.step3Values);
  const characterCount = useSelector(
    (state: RootState) => state.form.step3Values.characterCount
  );
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const count = value.replace(/\s/g, "").length;
    dispatch(updateStep3Values({ [name]: value, characterCount: count }));
  };

  return (
    <form>
      <div className="inputFormArea">
        <div className="textLabel">About</div>
        <textarea
          name="about"
          placeholder="Введите информацию о себе..."
          value={step3Values.about}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
        ></textarea>
        <div className="characterCount">
          Количество символов (без пробелов): {characterCount}
        </div>
        {formik.touched.about && formik.errors.about && (
          <div className="error">{formik.errors.about}</div>
        )}
      </div>
    </form>
  );
};

export default Step3;
