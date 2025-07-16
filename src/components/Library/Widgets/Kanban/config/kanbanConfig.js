// Sample default cards for the Kanban board
const defaultCards = [
    { id: 'card-1', content: 'Research user requirements', priority: 'high' },
    { id: 'card-2', content: 'Create wireframes', priority: 'medium' },
    { id: 'card-3', content: 'Design UI components', priority: 'medium' },
    { id: 'card-4', content: 'Setup project structure', priority: 'high' },
    { id: 'card-5', content: 'Write unit tests', priority: 'low' }
];

// Sample cards for different columns
const inProgressCards = [
    { id: 'card-6', content: 'Implement authentication', priority: 'high' },
    { id: 'card-7', content: 'Create dashboard layout', priority: 'medium' }
];

const doneCards = [
    { id: 'card-8', content: 'Project setup', priority: 'high' },
    { id: 'card-9', content: 'Requirements gathering', priority: 'medium' },
    { id: 'card-10', content: 'Initial planning', priority: 'low' }
];

const defaultColumns = [
    { id: 'todo', title: 'To Do', cards: [...defaultCards] },
    { id: 'inProgress', title: 'In Progress', cards: [...inProgressCards] },
    { id: 'done', title: 'Done', cards: [...doneCards] }
];

export default defaultColumns;