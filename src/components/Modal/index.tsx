import { X } from "phosphor-react";
import { ModalProps } from "../../models/modal";
import { ModalWrapper } from "./styles";

export const Modal = ({
  children,
  title,
  close,
  onClose,
  right
}: ModalProps) => {
  return (
    <ModalWrapper right={right} onClose={onClose}>
      {title && (
        <div className="title">
          <span>{title}</span>
        </div>
      )}
      {close && (
        <button onClick={onClose}><X /></button>
      )}
      {children}
    </ModalWrapper>
  )
}