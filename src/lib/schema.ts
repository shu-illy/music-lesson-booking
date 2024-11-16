import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: text('role', { enum: ['TEACHER', 'STUDENT'] }).notNull(),
});

export const lessons = sqliteTable('lessons', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  start: integer('start', { mode: 'timestamp' }).notNull(),
  end: integer('end', { mode: 'timestamp' }).notNull(),
  teacherId: text('teacher_id').notNull().references(() => users.id),
  studentId: text('student_id').references(() => users.id),
});