const { db } = require('@vercel/postgres')
const { users, projects, tasks, comments, role } = require('../src/lib/placeholder-data')
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
                role ENUM('manager', 'developer) NOT NULL
            );
        `

        console.log('created "users" table');

        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                    INSERT INTO users (id, name, email, password, role)
                    VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.role});
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
                project_name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL
            );
        `

        console.log('created "projects" table');

        const projects = await Promise.all(
            projects.map(async (item) => {
                return client.sql`
                    INSERT INTO projects (id, project_name, description, start_date, end_date)
                    VALUES (${item.id}, ${item.project_name}, ${item.description}, ${item.start_date}, ${item.end_date});
                `
            })
        )

        console.log(`Seeded ${projects.length} projects`);

        return {
            createTable,
            projects
        };
    } catch (error) {
        console.log('Error seeding projects:', error);
        throw error;
    }
}

async function seedTasks(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS tasks (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                project_id UUID,
                user_id UUID,
                task_name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                status ENUM('to_do', 'in_progress', 'done') NOT NULL,
                priority ENUM('low', 'medium', 'high') NOT NULL,
                start_date DATE NOT NULL,
                end_date DATE NOT NULL,
                FOREIGN KEY (project_id) REFERENCES projects(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `

        console.log('created "tasks" table');

        const tasks = await Promise.all(
            tasks.map(async (item) => {
                return client.sql`
                    INSERT INTO tasks (id, project_id, user_id, task_name, description, status, priority, start_date, end_date)
                    VALUES (${item.id}, ${item.project_id}, ${item.user_id}, ${item.task_name}, ${item.description}, ${item.status}, ${item.priority}, ${item.start_date}, ${item.end_date});
                `
            })
        )

        console.log(`Seeded ${tasks.length} tasks`);

        return {
            createTable,
            tasks
        };
    } catch (error) {
        console.log('Error seeding tasks:', error);
        throw error;
    }
}

async function seedComments(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS comments (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                task_id UUID,
                user_id UUID,
                comment TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (task_id) REFERENCES tasks(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `

        console.log('created "comments" table');

        const comments = await Promise.all(
            comments.map(async (item) => {
                return client.sql`
                    INSERT INTO comments (id, task_id, user_id, comment, created_at)
                    VALUES (${item.id}, ${item.task_id}, ${item.user_id}, ${item.comment}, ${item.created_at})
                `
            })
        )

        console.log(`Seeded ${comments.length} comments`);

        return {
            createTable,
            comments
        };
    } catch (error) {
        console.log('Error seeding comments:', error);
        throw error;
    }
}

async function seedComments(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`

        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS project_roles (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                user_id UUID,
                project_id UUID,
                role ENUM('developer', 'manager'),
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (project_id) REFERENCES projects(id),
            );
        `

        console.log('created "Projects roles" table');

        const role = await Promise.all(
            role.map(async (item) => {
                return client.sql`
                    INSERT INTO projec_roles (user_id, project_id, role)
                    VALUES (${item.user_id}, ${item.project_id}, ${item.role})
                `
            })
        )

        console.log(`Seeded ${role.length} role`);

        return {
            createTable,
            role
        };
    } catch (error) {
        console.log('Error seeding project role:', error);
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