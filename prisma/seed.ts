import { PrismaClient } from "@/generated/prisma/client"
import { TicketStatus } from "@/features/ticket/types"

const prisma = new PrismaClient()

const tickets = [
  {
    title: "Ticket 1",
    content: "Ticket 1 content from db",
    status: "DONE" as TicketStatus,
  },
  {
    title: "Ticket 2",
    content: "Need to fix bugs in login form from db",
    status: "OPEN" as TicketStatus,
  },
  {
    title: "Ticket 3",
    content: "Add new feature for dashboard from db",
    status: "IN_PROGRESS" as TicketStatus,
  },
  {
    title: "Ticket 4",
    content: "Update documentation from db",
    status: "DONE" as TicketStatus,
  },
]

async function seed() {
  await prisma.ticket.deleteMany()
  await prisma.ticket.createMany({ data: tickets })
}

;(async () => {
  try {
    await seed()
    console.log("✅ Seeding completed")
  } catch (e) {
    console.error("❌ Seeding failed:", e)
  } finally {
    await prisma.$disconnect()
  }
})()
