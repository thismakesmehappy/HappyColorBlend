import React, {useEffect, useState} from "react";
import {Alerttype} from "../../interfaces/AlertLevel";

interface ToastProps {
    message: string;
    type?: Alerttype;
    duration?: number;
    isVisible: boolean;
    onClose: () => void;
}

/**
 * A reusable Toast component for displaying temporary notifications.
 *
 * @param message - The message to display in the toast
 * @param type - The type of toast (error, success, warning, or default)
 * @param duration - How long the toast should be visible (in milliseconds)
 * @param isVisible - Whether the toast is currently visible
 * @param onClose - Callback function to call when the toast is closed
 */
const Toast: React.FC<ToastProps> = ({
                                         message,
                                         type = "default",
                                         duration = 3000,
                                         isVisible,
                                         onClose
                                     }) => {
    useEffect(() => {
        let timer: number;

        if (isVisible) {
            timer = setTimeout(() => {
                onClose();
            }, duration);
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isVisible, duration, onClose]);

    if (!isVisible) return null;

    const getToastClassName = () => {
        let className = "figma-toast show";

        switch (type) {
            case "error":
                className += " figma-toast-error";
                break;
            case "success":
                className += " figma-toast-success";
                break;
            case "warning":
                className += " figma-toast-warning";
                break;
            default:
                // Default toast has no additional class
                break;
        }

        return className;
    };

    return (
        <div className="figma-toast-container">
            <div className={getToastClassName()}>
                {message}
            </div>
        </div>
    );
};

export default Toast;