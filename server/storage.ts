import {
  contacts,
  projects,
  type Contact,
  type InsertContact,
  type InsertProject,
  type UpdateProject,
  type Project,
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
  getProjectById(id: number): Promise<Project | undefined>;
  updateProject(id: number, project: UpdateProject): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  getActiveProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
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

  // Project operations
  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values({
        title: insertProject.title,
        description: insertProject.description,
        type: insertProject.type,
        benefits: insertProject.benefits || null,
        powerbiUrl: insertProject.powerbiUrl || null,
        imageUrl: insertProject.imageUrl || null,
        technologies: insertProject.technologies || null,
        isActive: insertProject.isActive ?? true,
        featured: insertProject.featured ?? false,
      })
      .returning();
    return project;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async updateProject(id: number, updateProject: UpdateProject): Promise<Project | undefined> {
    const updateData: any = {};
    if (updateProject.title !== undefined) updateData.title = updateProject.title;
    if (updateProject.description !== undefined) updateData.description = updateProject.description;
    if (updateProject.type !== undefined) updateData.type = updateProject.type;
    if (updateProject.benefits !== undefined) updateData.benefits = updateProject.benefits;
    if (updateProject.powerbiUrl !== undefined) updateData.powerbiUrl = updateProject.powerbiUrl;
    if (updateProject.imageUrl !== undefined) updateData.imageUrl = updateProject.imageUrl;
    if (updateProject.technologies !== undefined) updateData.technologies = updateProject.technologies;
    if (updateProject.isActive !== undefined) updateData.isActive = updateProject.isActive;
    if (updateProject.featured !== undefined) updateData.featured = updateProject.featured;
    
    updateData.updatedAt = new Date();
    
    const [project] = await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async deleteProject(id: number): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getActiveProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.isActive, true))
      .orderBy(desc(projects.createdAt));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(desc(projects.createdAt));
  }
}

export const storage = new DatabaseStorage();
