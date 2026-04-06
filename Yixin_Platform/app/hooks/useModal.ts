import { useState } from 'react';

/**
 * 自定義 Hook 用於管理 Modal 的開關狀態
 * @param initialState 初始狀態，預設為 false
 * @returns 包含 isOpen 狀態和 openModal、closeModal 函數的物件
 */
export const useModal = (initialState: boolean = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
  };
};