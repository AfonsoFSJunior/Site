import React from 'react';
import '../styles/Button.css';

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

const DownloadButton = ({
    children,
    onClick,
    buttonStyle,
    buttonSize,
    downloadUrl,
    downloadFileName
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', downloadFileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick || handleDownload}
        >
            {children}
        </button>
    );
};

export default DownloadButton;
