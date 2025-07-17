/**
 * Schema definition for Kanban Card component that mirrors JIRA card fields
 */

const cardSchema = {
    required: [
        'id',
        'cardKey',
        'summary',
        'status',
        'type',
        'priority',
        'assignee',
        'reporter',
        'watchers',
        'epic',
        'sprint',
        'storyPoints'
    ],
    typeof: 'object',
    title: 'Kanban Card Schema',
    description: 'Schema for Kanban cards that includes fields similar to JIRA cards',
    additionalProperties: false,
    properties: {
        // Metadata
        created: {
            type: 'string',
            format: 'date-time',
            description: 'Creation date of the card',
            required: true,
        },
        // Core fields
        id: {
            type: 'string',
            description: 'Unique identifier for the card',
            required: true,
        },
        cardKey: {
            type: 'string',
            description: 'Project cardKey with issue number (e.g., "PROJ-123")',
            required: true,
        },
        summary: {
            isDisplayable: false,
            type: 'string',
            description: 'Brief summary/title of the card',
            required: true,
        },
        description: {
            isDisplayable: true,
            type: 'string',
            description: 'Detailed description of the card',
        },

        // Status and categorization
        status: {
            isDisplayable: false,
            type: 'string',
            description: 'Current status of the card (e.g., "To Do", "In Progress", "Done")',
            required: true,
        },
        type: {
            isDisplayable: true,
            type: 'string',
            description: 'Issue type (e.g., "Bug", "Story", "Task", "Epic")',
            required: true,
        },
        priority: {
            isDisplayable: true,
            type: 'string',
            description: 'Priority level (e.g., "Highest", "High", "Medium", "Low", "Lowest")',
        },
        // People
        assignee: {
            type: 'object',
            description: 'User assigned to the card',
            properties: {
                id: {
                    type: 'string',
                    isDisplayable: false
                },
                name: {
                    type: 'string',
                    isDisplayable: true
                },
                avatarUrl: { type: 'string' },
                email: { type: 'string' },
            },
        },
        reporter: {
            type: 'object',
            description: 'User who reported or created the card',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                avatarUrl: { type: 'string' },
                email: { type: 'string' },
            },
        },
        watchers: {
            type: 'array',
            description: 'Users watching this card',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    avatarUrl: { type: 'string' },
                },
            },
        },
        // Planning and tracking
        epic: {
            type: 'object',
            description: 'Epic this card belongs to',
            properties: {
                id: { type: 'string' },
                cardKey: { type: 'string' },
                name: { type: 'string' },
                color: { type: 'string' },
            },
        },
        sprint: {
            type: 'object',
            description: 'Sprint this card is assigned to',
            properties: {
                isDisplayable: false,
                id: { type: 'string' },
                name: { type: 'string' },
                startDate: { type: 'string', format: 'date-time' },
                endDate: { type: 'string', format: 'date-time' },
            },
        },
        storyPoints: {
            isDisplayable: true,
            type: 'number',
            description: 'Story point estimate for the card',
        }
    },
    ui: {
        order: [
            'id',
            'cardKey',
            'summary',
            'description',
            'storyPoints',
            'status',
            'type',
            'priority',
            'assignee',
            'reporter',
            'watchers',
            'epic',
            'sprint',
            'created',
            'createdBy',
            'updated',
            'updatedBy',
        ],
    }
};

export default cardSchema;