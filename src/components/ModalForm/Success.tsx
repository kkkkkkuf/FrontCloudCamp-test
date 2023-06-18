import { useNavigate } from "react-router-dom";
import arrow from "../../assets/Success.svg";
import "./ModalForm.css";

export function Success() {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate("/");
  };

  return (
    <>
      <img src={arrow} alt="all good" />
      <button
        className="buttonToMain"
        id="button-to-main"
        onClick={handleGoToMain}
      >
        На главную
      </button>
    </>
  );
}
