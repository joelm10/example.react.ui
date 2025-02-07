import { useEffect, useState } from "react";

/**
 * Simple wrapper for Bootstrap Alert
 * Ref: https://getbootstrap.com/docs/5.3/components/alerts/
 * @param {*} props 
 * @returns 
 */
const Notification = (props) => {
    const {
        showNotification = false,
        notificationType = '',
        notificationMessage = null
    } = props;

    const [isVisible, setVisible] = useState();
    useEffect(() => {
        setVisible(showNotification)
    }, [showNotification]);

    // display type
    const notificationClass = notificationType === 'error' ? 'alert-danger' : 'alert-success';

    const WinnerNotification = isVisible ? (
        <div
            onClick={() => setVisible(false)}
            className={`alert ${notificationClass}`}
            role="alert" >
            {notificationMessage}
        </div >
    ) : null;

    return WinnerNotification

};

export default Notification