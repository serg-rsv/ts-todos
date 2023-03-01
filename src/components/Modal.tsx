import React, { useEffect, useState } from 'react';

import styles from '../styles/Modal.module.css';

interface ModalProps {
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ content, isOpen, onClose }) => {
  const [isShow, setIsShow] = useState(isOpen);

  useEffect(() => {
    setIsShow(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsShow(false);
    onClose();
  };

  return (
    <>
      {isShow && (
        <div className={styles.modal}>
          <div className={styles.content}>
            {content}
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
