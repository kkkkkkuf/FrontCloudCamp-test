import { memo } from "react";
import styles from "./Stepper.module.css";
import CheckMark from "../../assets/CheckMark.svg";

type FormProgressProps = {
  step: number;
};

const Stepper: React.FC<FormProgressProps> = ({ step }) => {
  return (
    <div className={styles.formProgress}>
      <div
        data-step={step}
        className={styles.formProgress__container_progress}
      >
        {step > 1 ? (
          <img
            src={CheckMark}
            alt="checkmark"
            className={`${styles.formProgress__step_completed} ${styles.formProgress__step}`}
          />
        ) : (
          <div
            className={`${step === 1 ? styles.formProgress__step_current : ""} ${styles.formProgress__step}`}
          />
        )}
        {step > 2 ? (
          <img
            src={CheckMark}
            alt="checkmark"
            className={`${styles.formProgress__step_completed} ${styles.formProgress__step}`}
          />
        ) : (
          <div
            className={`${step === 2 ? styles.formProgress__step_current : ""} ${styles.formProgress__step}`}
          />
        )}
        <div
          className={`${step === 3 ? styles.formProgress__step_current : ""} ${styles.formProgress__step}`}
        />
      </div>
      <div className={styles.formProgress__container_labels}>
        <p className={step === 1 ? styles.formProgress__label_active : styles.formProgress__label}>1</p>
        <p className={step === 2 ? styles.formProgress__label_active : styles.formProgress__label}>2</p>
        <p className={step === 3 ? styles.formProgress__label_active : styles.formProgress__label}>3</p>
      </div>
    </div>
  );
};

export default memo(Stepper);