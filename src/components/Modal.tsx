import "./Modal.css";
interface ModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

export function Modal({ children, title, onClose }: ModalProps) {
  return (
    <>
      <div className="dark" onClick={onClose} />
      <div className="modalContent">
        <h1>{title}</h1>
        <div className="centeredChildren">{children}</div>
      </div>
    </>
  );
}
