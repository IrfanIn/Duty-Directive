const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        name: 'Shinobu',
        email: 'man@nextmail.com',
        password: '123456',
        role: 'manager',
    },
    {
        id: '410544b2-4002-4271-9855-fec4b6a6442a',
        name: 'Kocho',
        email: 'dev@nextmail.com',
        password: '123456',
        role: 'developer',
    },
];

const projects = [
    {
        id: '410544b2-5001-4271-9855-fec4b6a6442a',
        project_name: 'Name Mesh',
        description: 'Mesh project',
        start_date: '2024-06-07',
        end_date: '2025-06-07'
    },
    {
        id: '410544b2-5002-4271-9855-fec4b6a6442a',
        project_name: 'Shopify',
        description: 'Shopify project',
        start_date: '2024-06-07',
        end_date: '2025-06-07'
    },

    {
        id: '410544b2-5003-4271-9855-fec4b6a6442a',
        project_name: 'DetailPro',
        description: 'DetailPro project',
        start_date: '2024-06-07',
        end_date: '2025-06-07'
    },

    {
        id: '410544b2-5004-4271-9855-fec4b6a6442a',
        project_name: 'Panabee',
        description: 'Panabee project',
        start_date: '2024-06-07',
        end_date: '2025-06-07'
    },
]

const tasks = [
    {
        id: '410544b2-1001-4271-9855-fec4b6a6442a',
        project_id: '410544b2-5004-4271-9855-fec4b6a6442a',
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
        task_name: 'Decompose the task of creating popups',
        description: "It is necessarry to agree with the customer the required number of pop- ups",
        start_date: '2024-06-07',
        end_date: '2024-06-10',
        status: 'To Do',
        priority: 'Low',
    },
    {
        id: '410544b2-1002-4271-9855-fec4b6a6442a',
        project_id: '410544b2-5004-4271-9855-fec4b6a6442a',
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
        task_name: 'Draw illustration for an advantages block',
        description: "the color scheme should be in neutral tones, the size of each icon is 24x24 px",
        start_date: '2024-06-07',
        end_date: '2024-06-10',
        status: 'In Progress',
        priority: 'Medium',
    },
    {
        id: '410544b2-1003-4271-9855-fec4b6a6442a',
        project_id: '410544b2-5004-4271-9855-fec4b6a6442a',
        user_id: '410544b2-4002-4271-9855-fec4b6a6442a',
        task_name: 'Creating a prototype for the section "Doctors"',
        description: "it is necessary to develop a card design,",
        start_date: '2024-06-07',
        end_date: '2024-06-10',
        status: 'In Progress',
        priority: 'High',
    },
]

const comments = [
    {
        id: '410544b2-9371-4271-9855-fec4b6a6442a',
        comment: 'This gonna be crazy',
        created_at: '2024-05-14T12:00:41',
        task_id: '410544b2-1002-4271-9855-fec4b6a6442a',
        user_id: '410544b2-4002-4271-9855-fec4b6a6442a',
    }
]

module.exports = {
    users,
    projects,
    tasks,
    comments,
}