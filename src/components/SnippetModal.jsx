import { useEffect, useRef, useState } from "react";

function SnippetModal({
    isOpen,
    onClose,
    onSave,
    editingSnippet,
}) {
    const titleInputRef = useRef(null);

    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "Code",
        language: "javascript",
        tags: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        if (editingSnippet) {
            setForm({
                title: editingSnippet.title || "",
                content: editingSnippet.content || "",
                category: editingSnippet.category || "Code",
                language: editingSnippet.language || "javascript",
                tags: Array.isArray(editingSnippet.tags)
                    ? editingSnippet.tags.join(", ")
                    : "",
            });
        } else {
            setForm({
                title: "",
                content: "",
                category: "Code",
                language: "javascript",
                tags: "",
            });
        }

        setError("");

        setTimeout(() => {
            titleInputRef.current?.focus();
        }, 50);
    }, [isOpen, editingSnippet]);

    // Ctrl + Enter → Save
    useEffect(() => {
        if (!isOpen) return;

        const handleShortcut = (event) => {
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key === "Enter"
            ) {
                event.preventDefault();
                handleSubmit();
            }
        };

        window.addEventListener("keydown", handleShortcut);

        return () => {
            window.removeEventListener("keydown", handleShortcut);
        };
    }, [isOpen, form]);

    if (!isOpen) {
        return null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = () => {
        const title = form.title.trim();
        const content = form.content.trim();

        // Empty title
        if (!title) {
            setError("Please enter a title.");
            titleInputRef.current?.focus();
            return;
        }

        // Empty content
        if (!content) {
            setError("Please enter some content for your snippet.");
            return;
        }

        // Save snippet
        onSave({
            ...form,
            title,
            content,
            tags: form.tags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit();
    };

    return (
        <div
            className="modal-overlay"
            onMouseDown={onClose}
        >
            <div
                className="modal"
                onMouseDown={(event) =>
                    event.stopPropagation()
                }
            >
                <div className="modal-header">
                    <div>
                        <span className="modal-eyebrow">
                            {editingSnippet
                                ? "EDIT SNIPPET"
                                : "NEW SNIPPET"}
                        </span>

                        <h2>
                            {editingSnippet
                                ? "Update your snippet"
                                : "Create a snippet"}
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="close-button"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleFormSubmit}>
                    <label>
                        Title

                        <input
                            ref={titleInputRef}
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Git status"
                            autoComplete="off"
                        />
                    </label>

                    <label>
                        Content

                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            placeholder="Paste your code, command, text or URL..."
                            rows="9"
                        />
                    </label>

                    <div className="form-grid">
                        <label>
                            Category

                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                            >
                                <option>Code</option>
                                <option>Text</option>
                                <option>Commands</option>
                                <option>URLs</option>
                                <option>Notes</option>
                            </select>
                        </label>

                        <label>
                            Language

                            <select
                                name="language"
                                value={form.language}
                                onChange={handleChange}
                            >
                                <option value="javascript">
                                    JavaScript
                                </option>

                                <option value="jsx">
                                    JSX
                                </option>

                                <option value="bash">
                                    Bash
                                </option>

                                <option value="json">
                                    JSON
                                </option>

                                <option value="css">
                                    CSS
                                </option>

                                <option value="text">
                                    Plain Text
                                </option>
                            </select>
                        </label>
                    </div>

                    <label>
                        Tags

                        <input
                            name="tags"
                            value={form.tags}
                            onChange={handleChange}
                            placeholder="react, hooks, frontend"
                            autoComplete="off"
                        />
                    </label>

                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="save-button"
                        >
                            {editingSnippet
                                ? "Save changes"
                                : "Create snippet"}
                        </button>
                    </div>

                    <div className="modal-hint">
                        <span>Ctrl</span>
                        <span>Enter</span>
                        <small>to save</small>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SnippetModal;