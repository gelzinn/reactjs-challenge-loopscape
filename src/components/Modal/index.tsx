import { X } from "phosphor-react";
import { ModalProps } from "../../models/modal";
import { ModalWrapper } from "./styles";

export const Modal = ({
  children,
  title,
  close,
  onClose,
  right,
  label
}: ModalProps) => {
  return (
    <ModalWrapper right={right} onClose={onClose}>
      {title && (
        <div className="title">
          <div className="content">
            <span>{title}</span>
            {label && (
              <div className="label">{label}</div>
            )}
          </div>
        </div>
      )}
      {close && (
        <button onClick={onClose}><X /></button>
      )}
      {children}
    </ModalWrapper>
  )
}