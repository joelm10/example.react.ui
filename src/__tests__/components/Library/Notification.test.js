import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

import Notification from "components/Library/Atomic/notification";

const testProps = {
    showNotification: true,
    notificationType: '',
    notificationMessage: 'test notification message'

}
describe('components/Library/<Notification />', () => {
    test('should render nothing props passed', () => {
        const { container } = render(<Notification />);

        expect(container).toBeEmptyDOMElement();
    });

    test('should render when success when notificationType not defined', () => {
        render(<Notification {...testProps} />);

        const alertMessage = screen.getByRole('alert');
        expect(alertMessage).toBeTruthy();

    });
});
