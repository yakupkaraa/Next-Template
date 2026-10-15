export type TicketRole = "admin" | "user"

export type TicketStatus = "open" | "in_review" | "resolved" | "closed"
export type TicketPriority = "low" | "normal" | "high" | "urgent"
export type TicketCategory = "technical" | "account" | "billing" | "feature" | "other"
export type TicketModule = "users" | "blog" | "operations" | "other"
export type TicketEnvironment = "production" | "test"
export type TicketMessageType = "user" | "admin" | "internal" | "system"

export type TicketPerson = {
  id: string
  name: string
  email: string
  role: TicketRole
}

export type TicketAttachment = {
  id: string
  name: string
  sizeLabel: string
}

export type TicketMessage = {
  id: string
  type: TicketMessageType
  authorId: string
  body: string
  createdAt: string
  attachments?: TicketAttachment[]
}

export type Ticket = {
  id: number
  subject: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  category: TicketCategory
  module: TicketModule
  environment: TicketEnvironment
  requesterId: string
  assigneeId?: string
  createdAt: string
  updatedAt: string
  slaDueAt?: string
  unread: boolean
  tags: string[]
  attachments: TicketAttachment[]
  messages: TicketMessage[]
}

export type HelpArticle = {
  id: string
  title: { tr: string; en: string }
  excerpt: { tr: string; en: string }
  keywords: string[]
}
