import { useEffect, useRef, useMemo, useState } from "react";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import SnippetCard from "./components/SnippetCard";
import SnippetModal from "./components/SnippetModal";
import EmptyState from "./components/EmptyState";
import Toast from "./components/Toast";

import { defaultSnippets } from "./data/defaultSnippets";
import {
  loadSnippets,
  saveSnippets,
} from "./utils/storage";

import "./App.css";

function App() {
  const [snippets, setSnippets] = useState(() =>
    loadSnippets(defaultSnippets)
  );

  const searchInputRef = useRef(null);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [editingSnippet, setEditingSnippet] =
    useState(null);

  const [toast, setToast] = useState("");

  useEffect(() => {
    saveSnippets(snippets);
  }, [snippets]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isModifier = event.ctrlKey || event.metaKey;

      // Ctrl + K → focus search
      if (isModifier && event.key.toLowerCase() === "k" && !event.shiftKey) {
        event.preventDefault();
        searchInputRef.current?.focus();
        return;
      }

      // Ctrl + Shift + K → new snippet
      if (
        isModifier &&
        event.shiftKey &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        openNewSnippet();
        return;
      }

      // Escape → close modal
      if (event.key === "Escape") {
        setModalOpen(false);
        setEditingSnippet(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = setTimeout(() => {
      setToast("");
    }, 1800);

    return () => clearTimeout(timer);
  }, [toast]);

  const filteredSnippets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return snippets.filter((snippet) => {
      const categoryMatch =
        activeCategory === "All" ||
        (activeCategory === "Favorites"
          ? snippet.favorite
          : snippet.category === activeCategory);

      const searchMatch =
        !query ||
        snippet.title
          .toLowerCase()
          .includes(query) ||
        snippet.content
          .toLowerCase()
          .includes(query) ||
        snippet.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );

      return categoryMatch && searchMatch;
    });
  }, [snippets, activeCategory, search]);

  const openNewSnippet = () => {
    setEditingSnippet(null);
    setModalOpen(true);
  };

  const handleSaveSnippet = (form) => {
    // Make sure tags are always stored as an array
    const normalizedTags = Array.isArray(form.tags)
      ? form.tags
        .map((tag) => String(tag).trim())
        .filter(Boolean)
      : String(form.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

    const snippetData = {
      ...form,
      tags: normalizedTags,
    };

    if (editingSnippet) {
      setSnippets((previous) =>
        previous.map((snippet) =>
          snippet.id === editingSnippet.id
            ? {
              ...snippet,
              ...snippetData,
            }
            : snippet
        )
      );

      setToast("Snippet updated");
    } else {
      const newSnippet = {
        id: crypto.randomUUID(),
        ...snippetData,
        favorite: false,
        createdAt: new Date().toISOString(),
      };

      setSnippets((previous) => [
        newSnippet,
        ...previous,
      ]);

      setToast("Snippet created");
    }

    setModalOpen(false);
    setEditingSnippet(null);
  };

  const handleCopy = async (snippet) => {
    try {
      await navigator.clipboard.writeText(
        snippet.content
      );

      setToast("Copied to clipboard");
    } catch (error) {
      console.error("Copy failed:", error);
      setToast("Unable to copy");
    }
  };

  const handleFavorite = (id) => {
    setSnippets((previous) =>
      previous.map((snippet) =>
        snippet.id === id
          ? {
            ...snippet,
            favorite: !snippet.favorite,
          }
          : snippet
      )
    );
  };

  const handleEdit = (snippet) => {
    setEditingSnippet(snippet);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Delete this snippet?"
    );

    if (!confirmed) {
      return;
    }

    setSnippets((previous) =>
      previous.filter((snippet) => snippet.id !== id)
    );

    setToast("Snippet deleted");
  };

  return (
    <div className="app-shell">
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        snippets={snippets}
      />

      <main className="main-content">
        <TopBar
          search={search}
          setSearch={setSearch}
          onNewSnippet={openNewSnippet}
          searchInputRef={searchInputRef}
        />

        <section className="content-area">
          <div className="page-heading">
            <div>
              <span className="eyebrow">
                DEVELOPER WORKSPACE
              </span>

              <h2>
                {activeCategory === "All"
                  ? "My snippets"
                  : activeCategory}
              </h2>

              <p>
                Save once. Find instantly. Copy
                whenever you need it.
              </p>
            </div>

            <div className="snippet-count">
              {filteredSnippets.length}{" "}
              {filteredSnippets.length === 1
                ? "snippet"
                : "snippets"}
            </div>
          </div>

          {filteredSnippets.length === 0 ? (
            <EmptyState
              onNewSnippet={openNewSnippet}
            />
          ) : (
            <div className="snippet-grid">
              {filteredSnippets.map((snippet) => (
                <SnippetCard
                  key={snippet.id}
                  snippet={snippet}
                  onCopy={handleCopy}
                  onFavorite={handleFavorite}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <SnippetModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingSnippet(null);
        }}
        onSave={handleSaveSnippet}
        editingSnippet={editingSnippet}
      />

      <Toast message={toast} />
    </div>
  );
}

export default App;