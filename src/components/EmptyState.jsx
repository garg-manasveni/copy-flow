function EmptyState({ onNewSnippet }) {
    return (
        <div className="empty-state">
            <div className="empty-icon">⌘</div>

            <h2>No snippets found</h2>

            <p>
                Create your first snippet or try a different
                search.
            </p>

            <button
                className="new-button"
                onClick={onNewSnippet}
            >
                + Create snippet
            </button>
        </div>
    );
}

export default EmptyState;