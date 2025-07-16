import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertProjectSchema, updateProjectSchema } from "@shared/schema";
import { z } from "zod";

// Simple authentication - in production, use proper JWT tokens and password hashing
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123", // In production, use hashed passwords
};

// Simple token generation (in production, use proper JWT)
function generateToken() {
  return Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
}

// Store active tokens (in production, use Redis or similar)
const activeTokens = new Set<string>();

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        const token = generateToken();
        activeTokens.add(token);
        
        res.json({ 
          success: true, 
          token,
          message: "Login realizado com sucesso" 
        });
      } else {
        res.status(401).json({ 
          success: false, 
          message: "Credenciais inválidas" 
        });
      }
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erro interno do servidor" 
      });
    }
  });

  app.post("/api/logout", async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (token) {
        activeTokens.delete(token);
      }
      res.json({ success: true, message: "Logout realizado com sucesso" });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erro interno do servidor" 
      });
    }
  });

  // Middleware to verify token for protected routes
  const verifyToken = (req: any, res: any, next: any) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token || !activeTokens.has(token)) {
      return res.status(401).json({ 
        success: false, 
        message: "Token inválido ou expirado" 
      });
    }
    
    next();
  };
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Erro interno do servidor" 
        });
      }
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", verifyToken, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erro ao buscar contatos" 
      });
    }
  });

  // Project management routes
  
  // Get all projects (admin only)
  app.get("/api/projects", verifyToken, async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erro ao buscar projetos" 
      });
    }
  });

  // Get active projects (for public website)
  app.get("/api/projects/active", async (req, res) => {
    try {
      const projects = await storage.getActiveProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erro ao buscar projetos ativos" 
      });
    }
  });

  // Get featured projects
  app.get("/api/projects/featured", async (req, res) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erro ao buscar projetos em destaque" 
      });
    }
  });

  // Get project by ID
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "ID inválido" 
        });
      }
      
      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: "Projeto não encontrado" 
        });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erro ao buscar projeto" 
      });
    }
  });

  // Create new project
  app.post("/api/projects", verifyToken, async (req, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(projectData);
      res.json({ success: true, project });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Erro interno do servidor" 
        });
      }
    }
  });

  // Update project
  app.put("/api/projects/:id", verifyToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "ID inválido" 
        });
      }
      
      const projectData = updateProjectSchema.parse(req.body);
      const project = await storage.updateProject(id, projectData);
      
      if (!project) {
        return res.status(404).json({ 
          success: false, 
          message: "Projeto não encontrado" 
        });
      }
      
      res.json({ success: true, project });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Erro interno do servidor" 
        });
      }
    }
  });

  // Delete project
  app.delete("/api/projects/:id", verifyToken, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ 
          success: false, 
          message: "ID inválido" 
        });
      }
      
      const success = await storage.deleteProject(id);
      
      if (!success) {
        return res.status(404).json({ 
          success: false, 
          message: "Projeto não encontrado" 
        });
      }
      
      res.json({ success: true, message: "Projeto deletado com sucesso" });
    } catch (error) {
      res.status(500).json({ 
        success: false, 
        message: "Erro ao deletar projeto" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
