import mockCards from "../mockData/dataMockCards";

// Sample default cards for the Kanban board
const defaultCards = [
    ...mockCards
    // mockCards[0]
];

// Sample cards for different columns
const inProgressCards = [];

const doneCards = [];

const defaultColumns = [
    { id: 'todo', title: 'To Do', cards: defaultCards },
    { id: 'inProgress', title: 'In Development', cards: [...inProgressCards] },
    { id: 'inReview', title: 'In Review', cards: [] },
    { id: 'testing', title: 'testing', cards: [] },
    { id: 'done', title: 'Done', cards: [...doneCards] }
];

export default defaultColumns;