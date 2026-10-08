const STORAGE_KEY = "copyflow-snippets";

export function loadSnippets(defaultSnippets) {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(defaultSnippets)
            );

            return defaultSnippets;
        }

        return JSON.parse(saved);
    } catch (error) {
        console.error("Failed to load snippets:", error);
        return defaultSnippets;
    }
}

export function saveSnippets(snippets) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(snippets)
        );
    } catch (error) {
        console.error("Failed to save snippets:", error);
    }
}