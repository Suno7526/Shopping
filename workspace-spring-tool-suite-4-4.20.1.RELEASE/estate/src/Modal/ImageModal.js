// ImageModal.js
import React from 'react';
import './ImageModal.css'; // Ensure the correct path to your CSS file

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
    if (!isOpen) return null; // Return null if the modal is not open

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <span className="close-button" onClick={onClose}>&times;</span>
                <img src={imageUrl} alt="Enlarged" className="enlarged-image" />
            </div>
        </div>
    );
};

export default ImageModal;
