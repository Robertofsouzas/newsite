import {
  contacts,
  projects,
  type Contact,
  type InsertContact,
  type InsertProject,
  type UpdateProject,
  type Project,
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

// Mock data for development
const mockProjects: Project[] = [
  {
    id: 1,
    title: "Dashboard de Vendas Executivo",
    description: "Dashboard interativo mostrando KPIs de vendas, análise de performance por região e projeções de receita. Inclui visualizações dinâmicas de conversão de leads e análise de produtos mais vendidos.",
    type: "powerbi",
    benefits: "• Aumento de 40% na velocidade de tomada de decisões\n• Redução de 60% no tempo de geração de relatórios\n• Visibilidade em tempo real do funil de vendas\n• Identificação proativa de oportunidades de melhoria",
    powerbiUrl: "https://app.powerbi.com/view?r=eyJrIjoiNzA4ZmI4ODEtZjAwNy00ZGVhLWE2YzQtYzE2MTIwOTBhNmYxIiwidCI6IjhlNDA5MTg2LWIyZjItNGZkMC05NGIyLTdkOTU4MmQ2YzA4NSIsImMiOjR9",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
    technologies: ["Power BI", "SQL Server", "Azure", "DAX", "Power Query"],
    isActive: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 2,
    title: "Dashboard Financeiro Corporativo",
    description: "Relatório executivo com análise de fluxo de caixa, indicadores financeiros e projeções de crescimento. Visualização completa do balanço patrimonial e demonstrativo de resultados.",
    type: "powerbi",
    benefits: "• Redução de 50% no tempo de fechamento contábil\n• Visibilidade em tempo real do fluxo de caixa\n• Análise preditiva de tendências financeiras\n• Alertas automáticos para desvios orçamentários",
    powerbiUrl: "https://app.powerbi.com/view?r=eyJrIjoiYjkyODFkOGMtOTExZS00YTM2LWI2YzgtZDlmOTY1NGUzZTIwIiwidCI6IjhlNDA5MTg2LWIyZjItNGZkMC05NGIyLTdkOTU4MmQ2YzA4NSIsImMiOjR9",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
    technologies: ["Power BI", "Excel", "SAP", "DAX", "Power Automate"],
    isActive: true,
    featured: false,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 3,
    title: "Dashboard de Marketing Digital",
    description: "Análise completa de campanhas digitais, ROI por canal, performance de anúncios e conversões. Integração com Google Analytics, Facebook Ads e outras plataformas.",
    type: "powerbi",
    benefits: "• Aumento de 35% no ROI das campanhas\n• Otimização automática de orçamentos\n• Identificação de canais mais rentáveis\n• Relatórios automatizados para stakeholders",
    powerbiUrl: "https://app.powerbi.com/view?r=eyJrIjoiMzVkNjY0YzEtNDQyNy00ZWY4LTkyNDYtMjUzNzQ0OGEzNTMzIiwidCI6IjhlNDA5MTg2LWIyZjItNGZkMC05NGIyLTdkOTU4MmQ2YzA4NSIsImMiOjR9",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600",
    technologies: ["Power BI", "Google Analytics", "Facebook Ads", "Power Query", "Azure"],
    isActive: true,
    featured: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

let mockContacts: Contact[] = [];

// Check if we should use mock data
const useMockData = !process.env.DATABASE_URL && process.env.NODE_ENV === 'development';

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
    if (useMockData) {
      const contact: Contact = {
        id: mockContacts.length + 1,
        ...insertContact,
        createdAt: new Date()
      };
      mockContacts.push(contact);
      return contact;
    }
    
    const { db } = await import("./db");
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    if (useMockData) {
      return mockContacts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    
    const { db } = await import("./db");
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  // Project operations
  async createProject(insertProject: InsertProject): Promise<Project> {
    if (useMockData) {
      const project: Project = {
        id: mockProjects.length + 1,
        ...insertProject,
        isActive: insertProject.isActive ?? true,
        featured: insertProject.featured ?? false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockProjects.push(project);
      return project;
    }
    
    const { db } = await import("./db");
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
    if (useMockData) {
      return mockProjects.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    
    const { db } = await import("./db");
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    if (useMockData) {
      return mockProjects.find(p => p.id === id);
    }
    
    const { db } = await import("./db");
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
    if (useMockData) {
      return mockProjects
        .filter(p => p.isActive)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    
    const { db } = await import("./db");
    return await db
      .select()
      .from(projects)
      .where(eq(projects.isActive, true))
      .orderBy(desc(projects.createdAt));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    if (useMockData) {
      return mockProjects
        .filter(p => p.featured)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    }
    
    const { db } = await import("./db");
    return await db
      .select()
      .from(projects)
      .where(eq(projects.featured, true))
      .orderBy(desc(projects.createdAt));
  }
}

console.log(useMockData ? '🔄 Using mock storage for development...' : '💾 Using database storage...');
export const storage = new DatabaseStorage();
