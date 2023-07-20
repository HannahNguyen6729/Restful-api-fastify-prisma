run command:
npx prisma init --datasource-provider postgresql

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started 
2. Run npx prisma db pull to turn your database schema into a Prisma schema.
3. Run npx prisma generate to generate the Prisma Client. You can then start querying your database.

run command:
npx prisma migrate dev --name init

This command did two things:

    It creates a new SQL migration file for this migration in the prisma/migrations directory.
    It runs the SQL migration file against the database.
connect to database on admin 4:
General:
Name: Đặt tên cho máy chủ (ví dụ: PostgreSQL) fastify-prisma
Connection:
Host name/address: localhost
Port: 5432 (hoặc cổng mà bạn đã cấu hình cho PostgreSQL)
Maintenance database: postgres
Username: postgres
Password: Mật khẩu bạn đã cài đặt cho người dùng postgres trong quá trình cài đặt PostgreSQL. (241292)
