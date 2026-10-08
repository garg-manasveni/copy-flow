export const defaultSnippets = [
    {
        id: "snippet-1",
        title: "Git Status",
        content: "git status",
        category: "Commands",
        language: "bash",
        tags: ["git", "terminal", "status"],
        favorite: true,
        createdAt: new Date().toISOString(),
    },

    {
        id: "snippet-2",
        title: "Git Commit",
        content: 'git add .\ngit commit -m "your message"\ngit push',
        category: "Commands",
        language: "bash",
        tags: ["git", "commit", "push"],
        favorite: false,
        createdAt: new Date().toISOString(),
    },

    {
        id: "snippet-3",
        title: "React useEffect",
        content: `useEffect(() => {
  console.log("Component mounted");

  return () => {
    console.log("Component unmounted");
  };
}, []);`,
        category: "Code",
        language: "javascript",
        tags: ["react", "hooks", "useEffect"],
        favorite: true,
        createdAt: new Date().toISOString(),
    },

    {
        id: "snippet-4",
        title: "MongoDB Connection",
        content: `mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error(error));`,
        category: "Code",
        language: "javascript",
        tags: ["mongodb", "mongoose", "database"],
        favorite: false,
        createdAt: new Date().toISOString(),
    },

    {
        id: "snippet-5",
        title: "Useful Developer Note",
        content: "Always check the browser console before debugging the UI.",
        category: "Notes",
        language: "text",
        tags: ["debugging", "frontend"],
        favorite: false,
        createdAt: new Date().toISOString(),
    },
];