export const tickets = [
  {
    id: "1",
    title: "Ticket 1",
    content: "Ticket 1 content",
    status: "DONE" as const,
  },
  {
    id: "2",
    title: "Ticket 2",
    content: "Need to fix bugs in login form",
    status: "OPEN"  as const,
  },
  {
    id: "3",
    title: "Ticket 3",
    content: "Add new feature for dashboard",
    status: "IN_PROGRESS"  as const,
  },
  {
    id: "4",
    title: "Ticket 4",
    content: "Update documentation",
    status: "DONE"  as const,
  },
]