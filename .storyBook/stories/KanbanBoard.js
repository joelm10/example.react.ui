import React from 'react';
import { KanbanBoard } from '../../components/KanbanBoard';

export default {
    title: 'Components/KanbanBoard',
    component: KanbanBoard,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        columns: { control: 'object' },
        onCardMove: { action: 'cardMoved' },
        onColumnAdd: { action: 'columnAdded' },
        onCardAdd: { action: 'cardAdded' },
    },
};

// Mock data for the Kanban board
const defaultColumns = [
    {
        id: 'col-1',
        title: 'To Do',
        cards: [
            { id: 'card-1', title: 'Task 1', description: 'Complete documentation' },
            { id: 'card-2', title: 'Task 2', description: 'Review pull request' },
        ],
    },
    {
        id: 'col-2',
        title: 'In Progress',
        cards: [
            { id: 'card-3', title: 'Task 3', description: 'Implement new feature' },
        ],
    },
    {
        id: 'col-3',
        title: 'Done',
        cards: [
            { id: 'card-4', title: 'Task 4', description: 'Setup project structure' },
            { id: 'card-5', title: 'Task 5', description: 'Create component library' },
        ],
    },
];

// Template for all stories
const Template = (args) => <KanbanBoard {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
    columns: defaultColumns,
};

// Empty board story
export const EmptyBoard = Template.bind({});
EmptyBoard.args = {
    columns: [],
};

// Read-only board story
export const ReadOnly = Template.bind({});
ReadOnly.args = {
    columns: defaultColumns,
    readOnly: true,
};

// Customized board story
export const CustomizedTheme = Template.bind({});
CustomizedTheme.args = {
    columns: defaultColumns,
    theme: {
        columnBackgroundColor: '#f0f4f8',
        cardBackgroundColor: '#ffffff',
        headerBackgroundColor: '#4a6da7',
        headerTextColor: '#ffffff',
    },
};

// Loading state story
export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
};