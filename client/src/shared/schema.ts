import { z } from "zod";

export const insertProjectSchema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  type: z.enum(["powerbi", "n8n", "ai"]),
  benefits: z.string().optional(),
  powerbiUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  technologies: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = InsertProject & { id: number };
