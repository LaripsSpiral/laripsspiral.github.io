import { ProjectInterface } from "@/app/lib/project/Interface";

export const Projects: ProjectInterface[] = [
  {
    title: "Sample Project 1",
    description: "A brief description of the first project",
    organize: ["Frontend", "Backend"],
    platform: ["Web", "Mobile"],
    link: "https://github.com/sample/project1",
    date: "2023-12-01"
  },
  {
    title: "Sample Project 2",
    description: "Description of the second project",
    organize: ["Frontend"],
    platform: ["Web"],
    date: "2023-11-15"
  }
];