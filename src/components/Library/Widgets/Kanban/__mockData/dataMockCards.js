const mockCards = [
    {
        id: "card-001",
        cardKey: "PROJ-101",
        summary: "Implement user authentication flow",
        description: "Create a secure authentication system with login, registration, and password recovery",
        status: "In Progress",
        issueType: "Story",
        priority: "High",
        displayOrder: 2,
        assignee: {
            id: "user-1",
            name: "Alice Johnson",
            avatarUrl: "https://i.pravatar.cc/30?img=4",
            email: "alice@example.com"
        },
        reporter: {
            id: "user-2",
            name: "Bob Smith",
            avatarUrl: "https://i.pravatar.cc/30?img=5",
            email: "bob@example.com"
        },
        watchers: [
            {
                id: "user-3",
                name: "Charlie Davis",
                avatarUrl: "https://i.pravatar.cc/30?img=41",
            },
            {
                id: "user-4",
                name: "Diana Wilson",
                avatarUrl: "https://i.pravatar.cc/30?img=42",
            }
        ],
        epic: {
            id: "epic-001",
            cardKey: "PROJ-100",
            name: "User Management System",
            color: "#0052CC"
        },
        sprint: {
            id: "sprint-001",
            name: "Sprint 23",
            startDate: "2023-06-01T00:00:00Z",
            endDate: "2023-06-14T23:59:59Z"
        },
        storyPoints: 8
    },
    {
        id: "card-002",
        cardKey: "PROJ-102",
        summary: "Fix responsive layout in dashboard",
        description: "Dashboard components are not displaying correctly on mobile devices",
        status: "To Do",
        issueType: "Bug",
        priority: "Medium",
        displayOrder: 3,
        assignee: {
            id: "user-5",
            name: "Eva Martinez",
            avatarUrl: "",
            email: "eva@example.com"
        },
        reporter: {
            id: "user-2",
            name: "Bob Smith",
            avatarUrl: "https://example.com/avatars/bob.jpg",
            email: "bob@example.com"
        },
        watchers: [],
        epic: {
            id: "epic-002",
            cardKey: "PROJ-200",
            name: "UI Improvements",
            color: "#36B37E"
        },
        sprint: {
            id: "sprint-001",
            name: "Sprint 23",
            startDate: "2023-06-01T00:00:00Z",
            endDate: "2023-06-14T23:59:59Z"
        },
        storyPoints: 3
    },
    {
        id: "card-003",
        cardKey: "PROJ-103",
        summary: "Optimize database queries for reports",
        description: "Reports are taking too long to load due to inefficient database queries",
        status: "In Progress",
        issueType: "Task",
        priority: "Highest",
        displayOrder: 4,
        assignee: {
            id: "user-6",
            name: "Frank Thomas",
            avatarUrl: "https://i.pravatar.cc/30?img=43",
            email: "frank@example.com"
        },
        reporter: {
            id: "user-1",
            name: "Alice Johnson",
            avatarUrl: "https://example.com/avatars/alice.jpg",
            email: "alice@example.com"
        },
        watchers: [
            {
                id: "user-2",
                name: "Bob Smith",
                avatarUrl: "https://example.com/avatars/bob.jpg"
            }
        ],
        epic: {
            id: "epic-003",
            cardKey: "PROJ-300",
            name: "Performance Optimization",
            color: "#FF5630"
        },
        sprint: {
            id: "sprint-001",
            name: "Sprint 23",
            startDate: "2023-06-01T00:00:00Z",
            endDate: "2023-06-14T23:59:59Z"
        },
        storyPoints: 5
    },
    // {
    //     id: "card-004",
    //     cardKey: "PROJ-104",
    //     summary: "Create user onboarding tutorial",
    //     description: "Design and implement an interactive tutorial for new users",
    //     status: "To Do",
    //     issueType: "Story",
    //     priority: "Medium",
    //     assignee: null,
    //     reporter: {
    //         id: "user-7",
    //         name: "Grace Lee",
    //         avatarUrl: "https://example.com/avatars/grace.jpg",
    //         email: "grace@example.com"
    //     },
    //     watchers: [],
    //     epic: {
    //         id: "epic-002",
    //         cardKey: "PROJ-200",
    //         name: "UI Improvements",
    //         color: "#36B37E"
    //     },
    //     sprint: {
    //         id: "sprint-002",
    //         name: "Sprint 24",
    //         startDate: "2023-06-15T00:00:00Z",
    //         endDate: "2023-06-28T23:59:59Z"
    //     },
    //     storyPoints: 13
    // },
    {
        id: "card-005",
        cardKey: "PROJ-105",
        summary: "Implement password strength meter",
        description: "Add visual feedback for password strength during registration",
        status: "Done",
        issueType: "Task",
        priority: "Low",
        displayOrder: 5,
        assignee: {
            id: "user-1",
            name: "Alice Johnson",
            avatarUrl: "https://example.com/avatars/alice.jpg",
            email: "alice@example.com"
        },
        reporter: {
            id: "user-1",
            name: "Alice Johnson",
            avatarUrl: "https://example.com/avatars/alice.jpg",
            email: "alice@example.com"
        },
        watchers: [],
        epic: {
            id: "epic-001",
            cardKey: "PROJ-100",
            name: "User Management System",
            color: "#0052CC"
        },
        sprint: {
            id: "sprint-001",
            name: "Sprint 23",
            startDate: "2023-06-01T00:00:00Z",
            endDate: "2023-06-14T23:59:59Z"
        },
        storyPoints: 2
    },
    {
        id: "card-006",
        cardKey: "PROJ-106",
        summary: "Fix login button alignment on Safari",
        description: "Login button appears misaligned when viewed in Safari browser",
        status: "Done",
        issueType: "Bug",
        priority: "Medium",
        displayOrder: 1,
        assignee: {
            id: "user-5",
            name: "Eva Martinez",
            avatarUrl: "https://example.com/avatars/eva.jpg",
            email: "eva@example.com"
        },
        reporter: {
            id: "user-8",
            name: "Henry Wilson",
            avatarUrl: "https://example.com/avatars/henry.jpg",
            email: "henry@example.com"
        },
        watchers: [],
        epic: {
            id: "epic-002",
            cardKey: "PROJ-200",
            name: "UI Improvements",
            color: "#36B37E"
        },
        sprint: {
            id: "sprint-001",
            name: "Sprint 23",
            startDate: "2023-06-01T00:00:00Z",
            endDate: "2023-06-14T23:59:59Z"
        },
        storyPoints: 1
    },
    {
        id: "card-007",
        cardKey: "PROJ-107",
        summary: "Create API documentation",
        description: "Generate comprehensive documentation for all REST API endpoints",
        status: "To Do",
        issueType: "Task",
        priority: "Low",
        displayOrder: 8,
        assignee: {
            id: "user-6",
            name: "Frank Thomas",
            avatarUrl: "https://example.com/avatars/frank.jpg",
            email: "frank@example.com"
        },
        reporter: {
            id: "user-2",
            name: "Bob Smith",
            avatarUrl: "https://example.com/avatars/bob.jpg",
            email: "bob@example.com"
        },
        watchers: [
            {
                id: "user-1",
                name: "Alice Johnson",
                avatarUrl: "https://example.com/avatars/alice.jpg"
            }
        ],
        epic: {
            id: "epic-004",
            cardKey: "PROJ-400",
            name: "Documentation",
            color: "#6554C0"
        },
        sprint: {
            id: "sprint-002",
            name: "Sprint 24",
            startDate: "2023-06-15T00:00:00Z",
            endDate: "2023-06-28T23:59:59Z"
        },
        storyPoints: 8
    },
    {
        id: "card-008",
        cardKey: "PROJ-108",
        summary: "Add export to CSV feature",
        description: "Allow users to export their data in CSV format",
        status: "In Progress",
        issueType: "Story",
        priority: "High",
        displayOrder: 9,
        assignee: {
            id: "user-9",
            name: "Irene Clark",
            avatarUrl: "https://example.com/avatars/irene.jpg",
            email: "irene@example.com"
        },
        reporter: {
            id: "user-7",
            name: "Grace Lee",
            avatarUrl: "https://example.com/avatars/grace.jpg",
            email: "grace@example.com"
        },
        watchers: [
            {
                id: "user-2",
                name: "Bob Smith",
                avatarUrl: "https://example.com/avatars/bob.jpg"
            },
            {
                id: "user-7",
                name: "Grace Lee",
                avatarUrl: "https://example.com/avatars/grace.jpg"
            }
        ],
        epic: {
            id: "epic-005",
            cardKey: "PROJ-500",
            name: "Data Export Tools",
            color: "#00B8D9"
        },
        sprint: {
            id: "sprint-002",
            name: "Sprint 24",
            startDate: "2023-06-15T00:00:00Z",
            endDate: "2023-06-28T23:59:59Z"
        },
        storyPoints: 5
    },
    {
        id: "card-009",
        cardKey: "PROJ-109",
        summary: "Investigate memory leak in dashboard",
        description: "Users report the dashboard becomes slow after extended use, suggesting a memory leak",
        status: "To Do",
        issueType: "Bug",
        priority: "Highest",
        displayOrder: 10,
        assignee: {
            id: "user-10",
            name: "Jack Robinson",
            avatarUrl: "https://example.com/avatars/jack.jpg",
            email: "jack@example.com"
        },
        reporter: {
            id: "user-8",
            name: "Henry Wilson",
            avatarUrl: "https://example.com/avatars/henry.jpg",
            email: "henry@example.com"
        },
        watchers: [
            {
                id: "user-1",
                name: "Alice Johnson",
                avatarUrl: "https://example.com/avatars/alice.jpg"
            },
            {
                id: "user-6",
                name: "Frank Thomas",
                avatarUrl: "https://example.com/avatars/frank.jpg"
            }
        ],
        epic: {
            id: "epic-003",
            cardKey: "PROJ-300",
            name: "Performance Optimization",
            color: "#FF5630"
        },
        sprint: {
            id: "sprint-002",
            name: "Sprint 24",
            startDate: "2023-06-15T00:00:00Z",
            endDate: "2023-06-28T23:59:59Z"
        },
        storyPoints: 8
    },
    {
        id: "card-010",
        cardKey: "PROJ-110",
        summary: "Update privacy policy page",
        description: "Update the privacy policy to comply with new regulations",
        status: "Done",
        issueType: "Task",
        priority: "Medium",
        assignee: {
            id: "user-7",
            name: "Grace Lee",
            avatarUrl: "https://example.com/avatars/grace.jpg",
            email: "grace@example.com"
        },
        reporter: {
            id: "user-2",
            name: "Bob Smith",
            avatarUrl: "https://example.com/avatars/bob.jpg",
            email: "bob@example.com"
        },
        watchers: [],
        epic: {
            id: "epic-004",
            cardKey: "PROJ-400",
            name: "Documentation",
            color: "#6554C0"
        },
        sprint: {
            id: "sprint-001",
            name: "Sprint 23",
            startDate: "2023-06-01T00:00:00Z",
            endDate: "2023-06-14T23:59:59Z"
        },
        storyPoints: 2
    }
];

export default mockCards;