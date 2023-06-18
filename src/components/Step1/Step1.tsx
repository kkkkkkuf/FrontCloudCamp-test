// import "./Step1.css";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, updateStep1Values } from "../../store/store";
// import { ChangeEvent } from "react";

// const Step1 = () => {
//   const step1Values = useSelector((state: RootState) => state.form.step1Values);
//   const dispatch = useDispatch();

//   // Handle input changes for text inputs
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     dispatch(updateStep1Values({ [name]: value }));
//   };

//   // Handle select change for the 'sex' field
//   const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     dispatch(updateStep1Values({ [name]: value }));
//   };

//   return (
//     <form>
//       <div className="inputForm">
//         <div className="textLabel">Nickname</div>
//         <input
//           type="text"
//           name="nickname"
//           placeholder="Введите ник"
//           value={step1Values.nickname}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div className="inputForm">
//         <div className="textLabel">Name</div>
//         <input
//           type="text"
//           name="name"
//           placeholder="Введите имя"
//           value={step1Values.name}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div className="inputForm">
//         <div className="textLabel">Surname</div>
//         <input
//           type="text"
//           name="surname"
//           placeholder="Введите фамилию"
//           value={step1Values.surname}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div className="inputForm">
//         <div className="textLabel">Sex</div>
//         <select
//           id="fieldSex"
//           name="sex"
//           value={step1Values.sex}
//           onChange={handleSelectChange}
//         >
//           <option id="field-sex-option">Не выбрано</option>
//           <option id="field-sex-option-man">man</option>
//           <option id="field-sex-option-woman">woman</option>
//         </select>
//       </div>
//     </form>
//   );
// };

// export default Step1;

import "./Step1.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState, updateStep1Values } from "../../store/store";
import { ChangeEvent } from "react";
import { FormikProps } from "formik";

interface Step1Props {
  formik: FormikProps<{
    nickname: string;
    name: string;
    surname: string;
    sex: string;
  }>;
}

const Step1 = ({ formik }: Step1Props) => {
  const step1Values = useSelector((state: RootState) => state.form.step1Values);
  const dispatch = useDispatch();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateStep1Values({ [name]: value }));
    formik.handleChange(e);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(updateStep1Values({ [name]: value }));
    formik.handleChange(e);
  };

  return (
    <form>
      <div className="inputForm">
        <div className="textLabel">Nickname</div>
        <input
          type="text"
          name="nickname"
          placeholder="Введите ник"
          value={step1Values.nickname}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nickname && formik.errors.nickname && (
          <div className="error">{formik.errors.nickname}</div>
        )}
      </div>
      <div className="inputForm">
        <div className="textLabel">Name</div>
        <input
          type="text"
          name="name"
          placeholder="Введите имя"
          value={step1Values.name}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}
      </div>
      <div className="inputForm">
        <div className="textLabel">Surname</div>
        <input
          type="text"
          name="surname"
          placeholder="Введите фамилию"
          value={step1Values.surname}
          onChange={handleInputChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.surname && formik.errors.surname && (
          <div className="error">{formik.errors.surname}</div>
        )}
      </div>
      <div className="inputForm">
        <div className="textLabel">Sex</div>
        <select
          id="fieldSex"
          name="sex"
          value={step1Values.sex}
          onChange={handleSelectChange}
          onBlur={formik.handleBlur}
        >
          <option id="field-sex-option">Не выбрано</option>
          <option id="field-sex-option-man">man</option>
          <option id="field-sex-option-woman">woman</option>
        </select>
        {formik.touched.sex && formik.errors.sex && (
          <div className="error">{formik.errors.sex}</div>
        )}
      </div>
    </form>
  );
};

export default Step1;
