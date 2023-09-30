import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core"; // Import pgTable from drizzle-orm to create tables in postgres

export const userSystemEnum = pgEnum('userSystemEnum', ['system', 'user']); // Create a enum called userSystemEnum with values system and user  to be used in the user table

// Create a table in postgres
export const chats = pgTable("chats", { // Create a table called chats
    id: serial('id').primaryKey(), // Create a column called id with type serial and primary key
    pdfName: text('pdfName').notNull(), // Create a column called pdfName with type text
    pdfUrl: text('pdfUrl').notNull(), // Create a column called pdfUrl with type text
    createdAt: timestamp('createdAt').notNull().defaultNow(), // Create a column called createdAt with type timestamp
    userId: varchar('userId', { length: 256 }).notNull(), // Create a column called userId with type varchar
    fileKey: text('fileKey').notNull(), // Create a column called fileKey with type text
})



// messages table
export const messages = pgTable("messages", { // Create a table called messages
    id: serial('id').primaryKey(), // Create a column called id with type serial and primary key
    chatId: integer('chatId').references(() => chats.id).notNull(), // Create a column called chatId with type serial
    content: text('content').notNull(), // Create a column called content with type text
    createdAt: timestamp('createdAt').notNull().defaultNow(), // Create a column called createdAt with type timestamp
    role: userSystemEnum('role').notNull(), // Create a column called role with type userSystemEnum


})