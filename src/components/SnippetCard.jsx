import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markup";

function SnippetCard({
    snippet,
    onCopy,
    onFavorite,
    onEdit,
    onDelete,
}) {
    const getLanguage = () => {
        if (snippet.language === "javascript") {
            return "javascript";
        }

        if (snippet.language === "jsx") {
            return "jsx";
        }

        if (snippet.language === "bash") {
            return "bash";
        }

        if (snippet.language === "json") {
            return "json";
        }

        if (snippet.language === "css") {
            return "css";
        }

        return "none";
    };

    const language = getLanguage();

    const highlighted =
        language === "none"
            ? Prism.util.encode(snippet.content)
            : Prism.highlight(
                snippet.content,
                Prism.languages[language],
                language
            );

    return (
        <article className="snippet-card">
            <div className="snippet-header">
                <div>
                    <div className="snippet-title-row">
                        <h3>{snippet.title}</h3>

                        <button
                            className={`favorite-button ${snippet.favorite ? "is-favorite" : ""
                                }`}
                            onClick={() => onFavorite(snippet.id)}
                            aria-label="Toggle favorite"
                        >
                            {snippet.favorite ? "★" : "☆"}
                        </button>
                    </div>

                    <div className="snippet-meta">
                        <span>{snippet.category}</span>

                        <span>•</span>

                        <span>
                            {snippet.language}
                        </span>
                    </div>
                </div>

                <div className="snippet-actions">
                    <button onClick={() => onEdit(snippet)}>
                        Edit
                    </button>

                    <button
                        className="delete-action"
                        onClick={() => onDelete(snippet.id)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="code-window">
                <div className="window-bar">
                    <div className="window-dots">
                        <span />
                        <span />
                        <span />
                    </div>

                    <span className="window-language">
                        {snippet.language}
                    </span>
                </div>

                <pre>
                    <code
                        dangerouslySetInnerHTML={{
                            __html: highlighted,
                        }}
                    />
                </pre>
            </div>

            <div className="snippet-footer">
                <div className="tags">
                    {snippet.tags.map((tag) => (
                        <span key={tag}>
                            #{tag}
                        </span>
                    ))}
                </div>

                <button
                    className="copy-button"
                    onClick={() => onCopy(snippet)}
                >
                    Copy
                </button>
            </div>
        </article>
    );
}

export default SnippetCard;