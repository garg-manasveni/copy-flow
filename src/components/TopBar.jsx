function TopBar({
    search,
    setSearch,
    onNewSnippet,
    searchInputRef,
}) {
    return (
        <header className="topbar">
            <div className="search-wrapper">
                <span className="search-icon">⌕</span>

                <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search snippets..."
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                />

                <kbd>⌘ K</kbd>
            </div>

            <button
                className="new-button"
                onClick={onNewSnippet}
            >
                <span>+</span>
                New snippet
                <kbd>⌘ ⇧ K</kbd>
            </button>
        </header>
    );
}

export default TopBar;