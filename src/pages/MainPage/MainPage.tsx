// import { ChangeEvent, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, updateStep1Values } from "../../store/store";
// import { Link } from "react-router-dom";
// import styles from "./MainPage.module.css";
// import folder from "../../assets/folderIcon.svg";
// import resume from "../../assets/resume.pdf";

// const firstName = "Каролина";
// const lastName = "Машукова";

// const MainPage = () => {
//   const step1Values = useSelector((state: RootState) => state.form.step1Values);

//   const dispatch = useDispatch();

//   const [phoneNumber, setPhoneNumber] = useState(step1Values.phone || "");
//   const [email, setEmail] = useState(step1Values.email || "");

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "phone") {
//       setPhoneNumber(value);
//     } else if (name === "email") {
//       setEmail(value);
//     }
//   };

//   const handleStartClick = () => {
//     dispatch(
//       updateStep1Values({
//         phone: phoneNumber,
//         email: email,
//       })
//     );
//   };

//   return (
//     <div className={styles.mainPage}>
//       <div className={styles.header}>
//         <div className={styles.initialsCircle}>
//           {firstName[0]}
//           {lastName[0]}
//         </div>
//         <div className={styles.info}>
//           <div className={styles.name}>
//             {firstName} {lastName}
//           </div>
//           <div className={styles.linksContainer}>
//             <div className={styles.links}>
//               <img src={folder} alt="folder" />
//               <a href="https://t.me/kkkkkkuf">Telegram</a>
//             </div>
//             <div className={styles.links}>
//               <img src={folder} alt="folder" />
//               <a href="https://github.com/kkkkkkuf">Github</a>
//             </div>
//             <div className={styles.links}>
//               <img src={folder} alt="folder" />
//               <a href={resume} target="_blank" rel="noopener noreferrer">
//                 Resume
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <hr className={styles.line} />
//       <div className={styles.contactForm}>
//         <form>
//           <div className={styles.inputForm}>
//             <div className={styles.textLabel}>Номер телефона</div>
//             <input
//               type="tel"
//               placeholder="+7 999 999-99-99"
//               name="phone"
//               value={phoneNumber}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className={styles.inputForm}>
//             <div className={styles.textLabel}>Email</div>
//             <input
//               type="email"
//               placeholder="tim.jennings@example.com"
//               name="email"
//               value={email}
//               onChange={handleInputChange}
//             />
//           </div>
//         </form>
//       </div>
//       <Link to="/create">
//         <button
//           className={styles.buttonStart}
//           id="button-start"
//           onClick={handleStartClick}
//         >
//           Начать
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default MainPage;

import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, updateStep1Values } from "../../store/store";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";
import folder from "../../assets/folderIcon.svg";
import resume from "../../assets/resume.pdf";

const firstName = "Каролина";
const lastName = "Машукова";

const MainPage = () => {
  const step1Values = useSelector((state: RootState) => state.form.step1Values);

  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState(step1Values.phone || "");
  const [email, setEmail] = useState(step1Values.email || "");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setPhoneNumber(value);
      setPhoneError("");
    } else if (name === "email") {
      setEmail(value);
      setEmailError("");
    }
  };

  const validatePhoneNumber = (phone: string) => {
    const digitsOnly = phone.replace(/\D/g, "");

    return /^7\d{3}\d{3}\d{2}\d{2}$/.test(digitsOnly);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleStartClick = () => {
    const isPhoneValid = validatePhoneNumber(phoneNumber);
    const isEmailValid = validateEmail(email);

    if (!isPhoneValid) {
      setPhoneError("Please enter a valid phone number.");
    } else {
      setPhoneError("");
    }

    if (!isEmailValid) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }

    if (isPhoneValid && isEmailValid) {
      dispatch(
        updateStep1Values({
          phone: phoneNumber,
          email: email,
        })
      );
      navigate("/create");
    }
  };

  return (
    <div className={styles.mainPage}>
      <div className={styles.header}>
        <div className={styles.initialsCircle}>
          {firstName[0]}
          {lastName[0]}
        </div>
        <div className={styles.info}>
          <div className={styles.name}>
            {firstName} {lastName}
          </div>
          <div className={styles.linksContainer}>
            <div className={styles.links}>
              <img src={folder} alt="folder" />
              <a href="https://t.me/kkkkkkuf">Telegram</a>
            </div>
            <div className={styles.links}>
              <img src={folder} alt="folder" />
              <a href="https://github.com/kkkkkkuf">Github</a>
            </div>
            <div className={styles.links}>
              <img src={folder} alt="folder" />
              <a href={resume} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr className={styles.line} />
      <div className={styles.contactForm}>
        <form>
          <div className={styles.inputForm}>
            <div className={styles.textLabel}>Номер телефона</div>
            <input
              type="tel"
              placeholder="+7 999 999-99-99"
              name="phone"
              value={phoneNumber}
              onChange={handleInputChange}
            />
            {phoneError && <div className={styles.error}>{phoneError}</div>}
          </div>
          <div className={styles.inputForm}>
            <div className={styles.textLabel}>Email</div>
            <input
              type="email"
              placeholder="tim.jennings@example.com"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            {emailError && <div className={styles.error}>{emailError}</div>}
          </div>
        </form>
      </div>
      <button
        className={styles.buttonStart}
        id="button-start"
        onClick={handleStartClick}
      >
        Начать
      </button>
    </div>
  );
};

export default MainPage;
