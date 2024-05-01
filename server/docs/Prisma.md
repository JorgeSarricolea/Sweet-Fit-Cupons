# Prisma ORM

Prisma is a modern, type-safe ORM (Object-Relational Mapping) for Node.js and TypeScript applications. It provides a powerful and intuitive way to interact with databases by generating type-safe query builders based on your database schema. With Prisma, developers can write database queries using TypeScript, benefiting from type-checking and auto-completion features. Prisma supports various databases like PostgreSQL, MySQL, and SQLite, offering seamless integration and efficient data access for building robust and scalable applications.

### Migrations

To perform migrations automatically, you can take a look at the script located within the Prisma folder:

´´´
📁 server
|_scripts
  |_ auto_migrate.sh/
´´´

Just run this script following the next command:
´´´
./scripts/auto_migrate.sh
´´´

This allows the **'migrate'** command to be executed with the next command without the need to specify a name; by default, it is set to **'auto_migrate'**.
