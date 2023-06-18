import "./ModalForm.css";
import close from "../../assets/Error.svg";

interface ErrorProps {
  onClose: () => void;
}

export function Error({ onClose }: ErrorProps) {
  const handleGoToMain = () => {
    onClose();
  };

  return (
    <>
      <img src={close} alt="all bad" />
      <button id="button-close" onClick={handleGoToMain}>
        Закрыть
      </button>
    </>
  );
}
