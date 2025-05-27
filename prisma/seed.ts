// import { PrismaClient } from "@prisma/client"
//
// const prisma = new PrismaClient()
//
// type TicketStatus = "OPEN" | "IN_PROGRESS" | "DONE"
//
// const tickets = [
//   {
//     title: "Ticket 1",
//     content: "Ticket 1 content from db",
//     status: "DONE" as TicketStatus,
//     deadline: '',
//     bounty: 0
//   },
//   {
//     title: "Ticket 2",
//     content: "Need to fix bugs in login form from db",
//     status: "OPEN" as TicketStatus,
//     deadline: '',
//     bounty: 0
//   },
//   {
//     title: "Ticket 3",
//     content: "Add new feature for dashboard from db",
//     status: "IN_PROGRESS" as TicketStatus,
//     deadline: '',
//     bounty: 0
//   },
//   {
//     title: "Ticket 4",
//     content: "Update documentation from db",
//     status: "DONE" as TicketStatus,
//     deadline: '',
//     bounty: 0
//   },
// ]
//
// async function seed() {
//   await prisma.ticket.deleteMany()
//   await prisma.ticket.createMany({ data: tickets })
// }
//
// ;(async () => {
//   try {
//     await seed()
//     console.log("✅ Seeding completed")
//   } catch (e) {
//     console.error("❌ Seeding failed:", e)
//   } finally {
//     await prisma.$disconnect()
//   }
// })()
