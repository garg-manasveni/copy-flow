function Sidebar({
    activeCategory,
    setActiveCategory,
    snippets,
}) {
    const categories = [
        {
            name: "All",
            icon: "⌘",
        },
        {
            name: "Favorites",
            icon: "★",
        },
        {
            name: "Code",
            icon: "</>",
        },
        {
            name: "Text",
            icon: "Aa",
        },
        {
            name: "Commands",
            icon: "$",
        },
        {
            name: "URLs",
            icon: "↗",
        },
        {
            name: "Notes",
            icon: "▤",
        },
    ];

    const getCount = (category) => {
        if (category === "All") return snippets.length;

        if (category === "Favorites") {
            return snippets.filter((snippet) => snippet.favorite).length;
        }

        return snippets.filter(
            (snippet) => snippet.category === category
        ).length;
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="brand-mark">◈</div>

                <div>
                    <h1>CopyFlow</h1>
                    <span>Snippet workspace</span>
                </div>
            </div>

            <div className="sidebar-section">
                <p className="sidebar-label">WORKSPACE</p>

                {categories.slice(0, 2).map((category) => (
                    <button
                        key={category.name}
                        className={`sidebar-item ${activeCategory === category.name ? "active" : ""
                            }`}
                        onClick={() => setActiveCategory(category.name)}
                    >
                        <span className="sidebar-icon">
                            {category.icon}
                        </span>

                        <span>{category.name}</span>

                        <span className="sidebar-count">
                            {getCount(category.name)}
                        </span>
                    </button>
                ))}
            </div>

            <div className="sidebar-section">
                <p className="sidebar-label">CATEGORIES</p>

                {categories.slice(2).map((category) => (
                    <button
                        key={category.name}
                        className={`sidebar-item ${activeCategory === category.name ? "active" : ""
                            }`}
                        onClick={() => setActiveCategory(category.name)}
                    >
                        <span className="sidebar-icon">
                            {category.icon}
                        </span>

                        <span>{category.name}</span>

                        <span className="sidebar-count">
                            {getCount(category.name)}
                        </span>
                    </button>
                ))}
            </div>

            <div className="sidebar-footer">
                <div className="shortcut">
                    <span>⌘ K</span>
                    <small>Search</small>
                </div>

                <div className="shortcut">
                    <span>⌘ ⇧ K</span>
                    <small>New snippet</small>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;