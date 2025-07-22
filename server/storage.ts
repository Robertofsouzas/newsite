import {
  contacts,
  projects,
  sobre,
  type Contact,
  type InsertContact,
  type InsertProject,
  type UpdateProject,
  type Project,
  type InsertSobre,
  type Sobre,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Contact operations
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Project operations
  createProject(project: InsertProject): Promise<Project>;
  getProjects(): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | undefined>;
  updateProject(id: string, project: UpdateProject): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  getActiveProjects(): Promise<Project[]>;
  getProjectsByType(type: string): Promise<Project[]>;
  
  // Sobre operations
  createSobre(sobre: InsertSobre): Promise<Sobre>;
  getSobre(): Promise<Sobre[]>;
  updateSobre(id: string, sobre: Partial<InsertSobre>): Promise<Sobre | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Contact operations
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  // Project operations adaptadas para projects_site
  async createProject(insertProject: InsertProject): Promise<Project> {
    // Gerar slug automaticamente se não fornecido
    const slug = insertProject.slug || insertProject.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Gerar UUID manualmente
    const id = crypto.randomUUID();

    const [project] = await db
      .insert(projects)
      .values({
        id: id,
        title: insertProject.title,
        slug: slug,
        description: insertProject.description || null,
        fullDescription: insertProject.fullDescription || null,
        imageUrl: insertProject.imageUrl || null,
        type: insertProject.type || null,
        date: insertProject.date || null,
        embedUrl: insertProject.embedUrl || null,
      })
      .returning();
    return project;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProjectById(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async updateProject(id: string, updateProject: UpdateProject): Promise<Project | undefined> {
    const updateData: any = {};
    if (updateProject.title !== undefined) updateData.title = updateProject.title;
    if (updateProject.slug !== undefined) updateData.slug = updateProject.slug;
    if (updateProject.description !== undefined) updateData.description = updateProject.description;
    if (updateProject.fullDescription !== undefined) updateData.fullDescription = updateProject.fullDescription;
    if (updateProject.imageUrl !== undefined) updateData.imageUrl = updateProject.imageUrl;
    if (updateProject.type !== undefined) updateData.type = updateProject.type;
    if (updateProject.date !== undefined) updateData.date = updateProject.date;
    if (updateProject.embedUrl !== undefined) updateData.embedUrl = updateProject.embedUrl;
    
    updateData.updatedAt = new Date();
    
    const [project] = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getActiveProjects(): Promise<Project[]> {
    // Como não temos campo isActive, retornamos todos os projetos
    return await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt));
  }

  async getProjectsByType(type: string): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.type, type))
      .orderBy(desc(projects.createdAt));
  }

  // Métodos para manter compatibilidade com código existente
  async getFeaturedProjects(): Promise<Project[]> {
    // Retorna os 3 projetos mais recentes como "featured"
    return await db
      .select()
      .from(projects)
      .orderBy(desc(projects.createdAt))
      .limit(3);
  }

  // Sobre operations
  async createSobre(insertSobre: InsertSobre): Promise<Sobre> {
    const id = crypto.randomUUID();
    
    const [sobreData] = await db
      .insert(sobre)
      .values({
        id: id,
        title: insertSobre.title,
        description: insertSobre.description || null,
        paragraphs: insertSobre.paragraphs || null,
      })
      .returning();
    return sobreData;
  }

  async getSobre(): Promise<Sobre[]> {
    return await db.select().from(sobre).orderBy(desc(sobre.createdAt));
  }

  async updateSobre(id: string, updateSobre: Partial<InsertSobre>): Promise<Sobre | undefined> {
    const updateData: any = { updatedAt: new Date() };
    if (updateSobre.title !== undefined) updateData.title = updateSobre.title;
    if (updateSobre.description !== undefined) updateData.description = updateSobre.description;
    if (updateSobre.paragraphs !== undefined) updateData.paragraphs = updateSobre.paragraphs;
    
    const [sobreData] = await db
      .update(sobre)
      .set(updateData)
      .where(eq(sobre.id, id))
      .returning();
    return sobreData;
  }
}

export const storage = new DatabaseStorage();
