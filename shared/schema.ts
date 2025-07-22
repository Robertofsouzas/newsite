import {
  pgTable,
  text,
  varchar,
  serial,
  timestamp,
  boolean,
  jsonb,
  index,
  uuid,
  date,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (for auth if needed)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Tabela de contatos (mantemos esta para formulário de contato)
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  service: text("service").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Usando a tabela projects_site existente do usuário
export const projects = pgTable("projects_site", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  fullDescription: text("full_description"),
  imageUrl: text("image_url"),
  type: text("type"),
  date: date("date"),
  embedUrl: text("embed_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Usando a tabela sobre existente do usuário
export const sobre = pgTable("sobre", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  paragraphs: jsonb("paragraphs"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateProjectSchema = createInsertSchema(projects).omit({
  createdAt: true,
  updatedAt: true,
}).partial();

export const insertSobreSchema = createInsertSchema(sobre).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type UpdateProject = z.infer<typeof updateProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertSobre = z.infer<typeof insertSobreSchema>;
export type Sobre = typeof sobre.$inferSelect;
