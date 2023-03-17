import { ReactNode } from "react";

export interface ModalProps {
  children?: ReactNode;
  title?: string;
  close?: boolean;
  onClose?: () => void;
  right?: boolean;
}