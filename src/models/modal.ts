import { ReactNode } from "react";

export interface ModalProps {
  children?: ReactNode;
  title?: string;
  close?: boolean;
  label?: string;
  onClose?: () => void;
  right?: boolean;
}