export interface SideProject {
  name: string;
  url: string;
  description: string;
  link: string;
}

export const sideprojects: SideProject[] = [
  {
    name: "Task Manager",
    url: "task-manager-ecru-psi.vercel.app",
    description:
      "A full-stack task manager for creating, organising and tracking to-dos. Supports adding, editing, completing and deleting tasks with a clean, responsive UI.",
    link: "https://task-manager-ecru-psi.vercel.app",
  },
  {
    name: "Peak Tracker",
    url: "peaktracker.co.uk",
    description:
      "A hill-walking companion for logging summits and tracking progress against the classic UK peak lists. Keeps a personal record of every ascent.",
    link: "https://peaktracker.co.uk",
  },
  {
    name: "Crud Application",
    url: "crud-application-eight-delta.vercel.app",
    description:
      "A reference CRUD application demonstrating create, read, update and delete operations end to end, wired up to a persistent data store.",
    link: "https://crud-application-eight-delta.vercel.app",
  },
];
