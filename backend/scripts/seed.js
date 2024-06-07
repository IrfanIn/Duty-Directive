const { db } = require('@vercel/postgres')
const { users, projects, tasks, comments } = require('../src/lib/placeholder-data')
const bcrypt = require('bcrypt')

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role VARCHAR(255) NOT NULL,
            )
        `

        console.log('created users table');

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                    INSERT INTO users (id, name, email, password, role)
                    VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role})
                `
            })
        )

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers
        };
    } catch (error) {
        console.log('Error seeding users:', error);
        throw error;
    }
}

async function seedProjects(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS projects (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                project_name VARCHART(255) NOT NULL,
                description TEXT NOT NULL,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,
            )
        `

        console.log('created projects table');

        const insertedProjects = await Promise.all(
            projects.map(async (item) => {
                return client.sql`
                    INSERT INTO projects (id, project_name, description, start_date, end_date)
                    VALUES (${item.id}, ${item.project_name}, ${item.description}, ${item.start_date}, ${item.end_date})
                `
            })
        )

        console.log(`Seeded ${insertedProjects.length} projects`);

        return {
            createTable,
            projects: insertedProjects
        };
    } catch (error) {
        console.log('Error seeding users:', error);
        throw error;
    }
}

async function seedTasks(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS tasks (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                project_id VARCHAR(255),
                user_id VARCHAR(255),
                task_name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                status VARCHAR(255) NOT NULL,
                priority VARCHAR(255) NOT NULL,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,
                FOREIGN KEY (project_id) REFERENCES proejcts(project_id),
                FOREIGN KEY (user_id) REFERENCES user(user_id)
            )
        `

        console.log('created projects table');

        const insertedProjects = await Promise.all(
            tasks.map(async (item) => {
                return client.sql`
                    INSERT INTO tasks (id, project_id, user_id, task_name, description, status, priority, start_date, end_date)
                    VALUES (${item.id}, ${item.project_id}, ${item.user_id}, ${item.task_name}, ${item.description}, ${item.status}, ${item.priority}, ${item.start_date}, ${item.end_date})
                `
            })
        )

        console.log(`Seeded ${insertedProjects.length} projects`);

        return {
            createTable,
            projects: insertedProjects
        };
    } catch (error) {
        console.log('Error seeding users:', error);
        throw error;
    }
}

async function seedComments(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS tasks (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                task_id VARCHAR(255),
                user_id VARCHAR(255),
                comment TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (task_id) REFERENCES Tasks(task_id),
                FOREIGN KEY (user_id) REFERENCES Users(user_id)
            )
        `

        console.log('created projects table');

        const projects = await Promise.all(
            comments.map(async (item) => {
                return client.sql`
                    INSERT INTO tasks (id, task_id, user_id, comment, created_at)
                    VALUES (${item.id}, ${item.task_id}, ${item.user_id}, ${item.comment}, ${item.created_at})
                `
            })
        )

        console.log(`Seeded ${projects.length} projects`);

        return {
            createTable,
            projects: projects
        };
    } catch (error) {
        console.log('Error seeding users:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect()

    await seedUsers(client)
    await seedProjects(client)
    await seedTasks(client)
    await seedComments(client)

    await client.end()
}

main().catch(err => console.log('An error occured while attempting to seed the database'))