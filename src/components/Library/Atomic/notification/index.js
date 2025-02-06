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

    // display type
    const notificationClass = notificationType === 'error' ? 'alert-danger' : 'alert-success';

    const WinnerNotification = showNotification ? (
        <div className={`alert ${notificationClass}`} role="alert">
            {notificationMessage}
        </div>
    ) : null;

    return WinnerNotification

};

export default Notification