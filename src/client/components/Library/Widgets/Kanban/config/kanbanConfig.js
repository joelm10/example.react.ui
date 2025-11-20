import mockCards from "../__mockData/dataMockCards";

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

// TODO: Move to config or environment variable
const endPointUrl = 'http://localhost:3000'; // Replace with your actual endpoint URL

const socketWrapperConfig = {
    endPointUrl,
    options: {
        transports: ['websocket']
    }
};

const boardEvents = {
    LOAD_CARDS: 'loadCards',
    SAVE_CARD: 'saveCard',
    MOVE_CARD: 'moveCard',
    DELETE_CARD: 'deleteCard',
    ADD_CARD: 'addCard',
    UPDATE_CARD: 'updateCard',
};


export { defaultColumns, socketWrapperConfig, boardEvents };