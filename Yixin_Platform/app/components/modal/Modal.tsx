'use client';

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  // 🔒 控制頁面滾動的副作用
  useEffect(() => {
    setMounted(true);

    if (isOpen) {
      // 📌 Modal 打開時：禁止背景頁面滾動
      document.body.classList.add('overflow-hidden');
      // 防止滾動條消失造成的佈局偏移
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // 🔓 Modal 關閉時：恢復背景頁面滾動
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '';
    }

    // 🧹 清理函數：組件卸載時確保恢復正常狀態
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted) return null;

  const content = (
    <div className={`modal ${isOpen ? "modal--open" : ""} ${className ? className : ""}`} onClick={handleBackdropClick}>
      <div className="modal__content card--float" onClick={(e) => e.stopPropagation()}>
        <div className="modal__close-button link" onClick={onClose}>
          <span className="material-symbols-rounded size--24">
            close
          </span>
        </div>
        {children}
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default Modal;