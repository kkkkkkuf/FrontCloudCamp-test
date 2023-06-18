// import { useState } from "react";
// import Stepper from "../../components/Stepper/Stepper";
// import { useNavigate } from "react-router-dom";
// import styles from "./CreatePage.module.css";
// import Step1 from "../../components/Step1/Step1";
// import Step2 from "../../components/Step2/Step2";
// import Step3 from "../../components/Step3/Step3";

// const CreatePage = () => {
//   const navigate = useNavigate();
//   const [activeStep, setActiveStep] = useState(0);
//   const steps = ["Шаг 1", "Шаг 2", "Шаг 3"];

//   const handleNext = () => {
//     setActiveStep((prevStep) => prevStep + 1);
//   };

//   const handlePrevious = () => {
//     setActiveStep((prevStep) => prevStep - 1);
//   };

//   const sendRequest = () => {};

//   let content;
//   switch (activeStep) {
//     case 0:
//       content = <Step1 />;
//       break;
//     case 1:
//       content = <Step2 />;
//       break;
//     case 2:
//       content = <Step3 />;
//       break;
//     default:
//       content = null;
//   }

//   return (
//     <div className={styles.createPage}>
//       <div className={styles.stepper}>
//         <Stepper step={activeStep + 1} />
//       </div>
//       {content}
//       <div className={styles.buttonContainer}>
//         <button
//           className={styles.buttonBack}
//           id="button-back"
//           onClick={activeStep === 0 ? () => navigate("/") : handlePrevious}
//         >
//           Назад
//         </button>
//         {activeStep < steps.length - 1 && (
//           <button
//             className={styles.buttonNext}
//             id="button-next"
//             onClick={handleNext}
//           >
//             Далее
//           </button>
//         )}

//         {activeStep === steps.length - 1 && (
//           <button
//             className={styles.buttonSend}
//             id="button-send"
//             onClick={sendRequest}
//           >
//             Отправить
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CreatePage;

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Stepper from "../../components/Stepper/Stepper";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePage.module.css";
import Step1 from "../../components/Step1/Step1";
import Step2 from "../../components/Step2/Step2";
import Step3 from "../../components/Step3/Step3";
import { Modal } from "../../components/Modal";
import { Success } from "../../components/ModalForm/Success";
import { Error } from "../../components/ModalForm/Error";
import axios from "axios";

const CreatePage = () => {
  const [modalSend, setModalSend] = useState(false);
  const [modalError, setModalError] = useState(false);

  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Шаг 1", "Шаг 2", "Шаг 3"];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const formData = {
        ...formik1.values,
        ...formik2.values,
        ...formik3.values,
      };

      const response = await axios.post(
        "https://api.sbercloud.ru/content/v1/bootcamp/frontend",
        formData
      );

      console.log(response.data);

      setModalSend(true);
    } catch (error) {
      console.error(error);
      setModalError(true);
    }
  };

  const validationSchema1 = Yup.object().shape({
    nickname: Yup.string()
      .max(30, "Максимальная длина никнейма - 30 символов")
      .matches(/^[a-zA-Z0-9]+$/, "Никнейм может содержать только буквы и цифры")
      .required("Введите никнейм"),
    name: Yup.string()
      .max(50, "Максимальная длина имени - 50 символов")
      .matches(/^[a-zA-Z]+$/, "Имя может содержать только буквы")
      .required("Введите имя"),
    surname: Yup.string()
      .max(50, "Максимальная длина фамилии - 50 символов")
      .matches(/^[a-zA-Z]+$/, "Фамилия может содержать только буквы")
      .required("Введите фамилию"),
    sex: Yup.string().notOneOf(["Не выбрано"], "Выберите пол"),
  });

  const validationSchema2 = Yup.object().shape({
    advantages: Yup.array()
      .of(
        Yup.string()
          .max(50, "Максимальная длина - 50 символов")
          .required("Введите преимущество")
      )
      .required("Введите хотя бы одно преимущество"),
    checkboxGroup: Yup.array().required("Выберите хотя бы один вариант"),
    radioGroup: Yup.string().required("Выберите один из вариантов"),
  });

  const validationSchema3 = Yup.object().shape({
    about: Yup.string()
      .max(200, "Максимальная длина - 200 символов")
      .required("Введите информацию о себе"),
  });

  const formik1 = useFormik({
    initialValues: {
      nickname: "",
      name: "",
      surname: "",
      sex: "",
    },
    validationSchema: validationSchema1,
    onSubmit: (values) => {
      console.log(values);
      console.log("values");
    },
  });

  const formik2 = useFormik({
    initialValues: {
      advantages: ["", "", ""],
      checkboxGroup: [0, 0, 0],
      radioGroup: "",
    },
    validationSchema: validationSchema2,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const formik3 = useFormik({
    initialValues: {
      about: "",
      characterCount: 0,
    },
    validationSchema: validationSchema3,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  let content;
  switch (activeStep) {
    case 0:
      content = <Step1 formik={formik1} />;
      break;
    case 1:
      content = <Step2 formik={formik2} />;
      break;
    case 2:
      content = <Step3 formik={formik3} />;
      break;
    default:
      content = null;
  }

  return (
    <div className={styles.createPage}>
      <div className={styles.stepper}>
        <Stepper step={activeStep + 1} />
      </div>
      {content}
      <div className={styles.buttonContainer}>
        <button
          className={styles.buttonBack}
          id="button-back"
          onClick={activeStep === 0 ? () => navigate("/") : handlePrevious}
        >
          Назад
        </button>
        {activeStep < steps.length - 1 && (
          <button
            className={styles.buttonNext}
            id="button-next"
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !formik1.isValid) ||
              (activeStep === 1 && !formik2.isValid)
            }
          >
            Далее
          </button>
        )}

        {activeStep === steps.length - 1 && (
          <button
            className={styles.buttonSend}
            id="button-send"
            onClick={handleSubmit}
          >
            Отправить
          </button>
        )}
      </div>

      {modalSend && (
        <Modal
          title="Форма успешно отправлена"
          onClose={() => setModalSend(false)}
        >
          <Success />
        </Modal>
      )}

      {modalError && (
        <Modal title="Ошибка" onClose={() => setModalError(false)}>
          <Error onClose={() => setModalError(false)} />
        </Modal>
      )}
    </div>
  );
};

export default CreatePage;
