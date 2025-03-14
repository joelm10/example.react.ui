import { render } from '@testing-library/react'
import ChartWrapper from "components/Library/Widgets/Charts";

describe('library/components/widgets/Charts', () => {
    test('<ChartWrapper /> should render succesfully', () => {
        render(<ChartWrapper />);
        
    });
});