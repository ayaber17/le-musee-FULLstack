import { useState, useEffect, useCallback, useRef } from "react";
import { fetchSettings, saveSettings, deleteSetting } from "../api";

// ─── Category helpers ────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",     label: "All" },
  { id: "site",    label: "Site" },
  { id: "email",   label: "Email" },
  { id: "booking", label: "Booking" },
  { id: "payment", label: "Payment" },
  { id: "other",   label: "Other" },
];

function guessCategory(key = "") {
  const k = key.toLowerCase();
  if (k.includes("email") || k.includes("smtp") || k.includes("mail")) return "email";
  if (k.includes("booking") || k.includes("reservation") || k.includes("checkin") || k.includes("checkout")) return "booking";
  if (k.includes("payment") || k.includes("stripe") || k.includes("paypal") || k.includes("currency")) return "payment";
  if (k.includes("site") || k.includes("name") || k.includes("logo") || k.includes("address") || k.includes("phone") || k.includes("timezone")) return "site";
  return "other";
}

// ─── Badge ───────────────────────────────────────────────────────────────────
function Badge({ category }) {
  const map = {
    site:    { bg: "#EEF2FF", color: "#4338CA" },
    email:   { bg: "#FFF7ED", color: "#C2410C" },
    booking: { bg: "#F0FDF4", color: "#15803D" },
    payment: { bg: "#FDF4FF", color: "#9333EA" },
    other:   { bg: "#F1F5F9", color: "#475569" },
  };
  const c = map[category] || map.other;
  return (
    <span style={{
      fontSize: 11, fontWeight: 500, padding: "2px 8px",
      borderRadius: 20, background: c.bg, color: c.color,
      textTransform: "capitalize", letterSpacing: "0.02em",
      whiteSpace: "nowrap",
    }}>
      {category}
    </span>
  );
}

// ─── Toast ───────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [message]);
  if (!message) return null;
  const isErr = type === "error";
  return (
    <div style={{
      position: "fixed", bottom: 24, right: 24, zIndex: 9999,
      background: isErr ? "#FEF2F2" : "#F0FDF4",
      color: isErr ? "#B91C1C" : "#15803D",
      border: `1px solid ${isErr ? "#FECACA" : "#BBF7D0"}`,
      borderRadius: 10, padding: "12px 18px",
      fontSize: 13, fontWeight: 500,
      display: "flex", alignItems: "center", gap: 8,
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)", minWidth: 230,
      animation: "fadeUp .2s ease",
    }}>
      <span style={{ fontSize: 16 }}>{isErr ? "✕" : "✓"}</span>
      {message}
    </div>
  );
}

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────
function ConfirmModal({ open, keyName, loading, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <Overlay onClick={onCancel}>
      <ModalBox onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 36, textAlign: "center", marginBottom: 12 }}>🗑️</div>
        <h3 style={S.modalTitle}>Delete setting?</h3>
        <p style={S.modalSub}>
          Will permanently delete{" "}
          <code style={S.code}>{keyName}</code>.
          This cannot be undone.
        </p>
        <div style={S.row}>
          <button onClick={onCancel} style={S.btnSecondary}>Cancel</button>
          <button onClick={onConfirm} disabled={loading} style={{ ...S.btnDanger, flex: 1 }}>
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </ModalBox>
    </Overlay>
  );
}

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────
function SettingModal({ open, mode, data, onClose, onSave, saving }) {
  const [key,      setKey]      = useState("");
  const [value,    setValue]    = useState("");
  const [category, setCategory] = useState("other");
  const keyRef = useRef();

  useEffect(() => {
    if (!open) return;
    if (data) {
      setKey(data.key ?? "");
      setValue(data.value ?? "");
      setCategory(data.category ?? guessCategory(data.key));
    } else {
      setKey(""); setValue(""); setCategory("other");
      setTimeout(() => keyRef.current?.focus(), 60);
    }
  }, [open, data]);

  if (!open) return null;
  const isEdit = mode === "edit";

  const handleKey = (e) => {
    if (e.key === "Enter") onSave({ key, value, category });
  };

  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()} style={{ width: 460 }}>
        <div style={S.modalHead}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
            {isEdit ? "Edit setting" : "Add setting"}
          </h3>
          <button onClick={onClose} style={S.iconBtn}>✕</button>
        </div>

        <div style={S.formGroup}>
          <label style={S.label}>Key</label>
          <input
            ref={keyRef}
            style={{ ...S.input, ...(isEdit ? { background: "#F8FAFC", cursor: "not-allowed" } : {}) }}
            value={key}
            onChange={e => setKey(e.target.value)}
            disabled={isEdit}
            placeholder="e.g. hotel_name"
            onKeyDown={handleKey}
          />
        </div>

        <div style={S.formGroup}>
          <label style={S.label}>Value</label>
          <textarea
            style={{ ...S.input, minHeight: 88, resize: "vertical", fontFamily: "inherit" }}
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Enter value…"
          />
        </div>

        <div style={S.formGroup}>
          <label style={S.label}>Category</label>
          <select style={S.input} value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.filter(c => c.id !== "all").map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>

        <div style={{ ...S.row, marginTop: "1.25rem" }}>
          <button onClick={onClose} style={S.btnSecondary}>Cancel</button>
          <button
            onClick={() => onSave({ key, value, category })}
            disabled={saving || !key.trim()}
            style={{ ...S.btnPrimary, flex: 1, opacity: saving || !key.trim() ? 0.55 : 1 }}
          >
            {saving ? "Saving…" : "Save setting"}
          </button>
        </div>
      </ModalBox>
    </Overlay>
  );
}

// ─── Import / Export Modal ────────────────────────────────────────────────────
function ExportImportModal({ open, settings, onClose, onImport, importing }) {
  const [tab,         setTab]         = useState("export");
  const [importText,  setImportText]  = useState("");
  const [importError, setImportError] = useState("");
  const [copied,      setCopied]      = useState(false);

  const exportData = JSON.stringify(
    Object.fromEntries(settings.map(s => [s.key, s.value])),
    null, 2
  );

  const handleCopy = async () => {
    await navigator.clipboard.writeText(exportData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImport = () => {
    setImportError("");
    try {
      const parsed = JSON.parse(importText);
      if (typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Must be a JSON object { key: value }");
      onImport(parsed);
    } catch (e) {
      setImportError("Invalid JSON — " + e.message);
    }
  };

  if (!open) return null;
  return (
    <Overlay onClick={onClose}>
      <ModalBox onClick={e => e.stopPropagation()} style={{ width: 500 }}>
        <div style={S.modalHead}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Import / Export</h3>
          <button onClick={onClose} style={S.iconBtn}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: "#F1F5F9", borderRadius: 8, padding: 4, marginBottom: "1rem" }}>
          {["export", "import"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "7px 0", border: "none", borderRadius: 6,
              cursor: "pointer", fontSize: 13, textTransform: "capitalize",
              background: tab === t ? "#fff" : "transparent",
              color: tab === t ? "#0F172A" : "#64748B",
              fontWeight: tab === t ? 600 : 400,
              boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}>{t}</button>
          ))}
        </div>

        {tab === "export" ? (
          <>
            <textarea readOnly value={exportData} style={{ ...S.input, minHeight: 220, fontFamily: "monospace", fontSize: 12, background: "#F8FAFC" }} />
            <div style={{ ...S.row, marginTop: "1rem" }}>
              <button onClick={onClose} style={S.btnSecondary}>Close</button>
              <button onClick={handleCopy} style={{ ...S.btnPrimary, flex: 1 }}>
                {copied ? "✓ Copied!" : "Copy JSON"}
              </button>
            </div>
          </>
        ) : (
          <>
            <textarea
              value={importText}
              onChange={e => { setImportText(e.target.value); setImportError(""); }}
              placeholder={'{\n  "hotel_name": "Riad Atlas",\n  "currency": "MAD"\n}'}
              style={{ ...S.input, minHeight: 200, fontFamily: "monospace", fontSize: 12 }}
            />
            {importError && <p style={{ margin: "5px 0 0", fontSize: 12, color: "#B91C1C" }}>{importError}</p>}
            <div style={{ ...S.row, marginTop: "1rem" }}>
              <button onClick={onClose} style={S.btnSecondary}>Cancel</button>
              <button onClick={handleImport} disabled={importing || !importText.trim()} style={{ ...S.btnPrimary, flex: 1, opacity: importing || !importText.trim() ? 0.55 : 1 }}>
                {importing ? "Importing…" : "Import & Save"}
              </button>
            </div>
          </>
        )}
      </ModalBox>
    </Overlay>
  );
}

// ─── Layout helpers ───────────────────────────────────────────────────────────
const Overlay = ({ children, onClick }) => (
  <div onClick={onClick} style={{
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
    zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
  }}>{children}</div>
);

const ModalBox = ({ children, style = {}, ...rest }) => (
  <div style={{
    background: "#fff", borderRadius: 14,
    padding: "1.75rem", width: 400, maxWidth: "95vw",
    boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
    ...style,
  }} {...rest}>{children}</div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [settings,     setSettings]     = useState([]);   // [{ key, value, category }]
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [activeCategory, setActiveCat] = useState("all");

  // Modals
  const [modalOpen,  setModalOpen]  = useState(false);
  const [modalMode,  setModalMode]  = useState("add");   // "add" | "edit"
  const [modalData,  setModalData]  = useState(null);
  const [saving,     setSaving]     = useState(false);

  const [confirmKey, setConfirmKey] = useState(null);
  const [deleting,   setDeleting]   = useState(false);

  const [exportOpen, setExportOpen] = useState(false);
  const [importing,  setImporting]  = useState(false);

  const [toast,      setToast]      = useState({ message: "", type: "success" });

  const notify = (message, type = "success") => setToast({ message, type });

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchSettings();          // GET /admin/settings  → { key: value, … }
      const raw = res.data ?? res;
      const list = Object.entries(raw).map(([key, value]) => ({
        key,
        value: String(value ?? ""),
        category: guessCategory(key),
      }));
      setSettings(list);
    } catch (err) {
      const msg = err?.response?.status === 401
        ? "Session expired — please log in again."
        : err?.response?.status === 403
          ? "Access denied."
          : "Failed to load settings.";
      notify(msg, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Filtered list ──────────────────────────────────────────────────────────
  const filtered = settings.filter(s => {
    const catMatch = activeCategory === "all" || s.category === activeCategory;
    const q = search.toLowerCase();
    const srchMatch = !q || s.key.toLowerCase().includes(q) || s.value.toLowerCase().includes(q);
    return catMatch && srchMatch;
  });

  const catCounts = CATEGORIES.reduce((acc, c) => {
    acc[c.id] = c.id === "all" ? settings.length : settings.filter(s => s.category === c.id).length;
    return acc;
  }, {});

  // ── Save (add / edit) ──────────────────────────────────────────────────────
  const handleSave = async ({ key, value, category }) => {
    if (!key.trim()) return;
    setSaving(true);
    try {
      // POST /admin/settings  body: { settings: [{ key, value }] }
      await saveSettings({ settings: [{ key: key.trim(), value }] });
      setSettings(prev => {
        const exists = prev.find(s => s.key === key);
        return exists
          ? prev.map(s => s.key === key ? { ...s, value, category } : s)
          : [...prev, { key: key.trim(), value, category }];
      });
      setModalOpen(false);
      notify(`Setting "${key}" saved.`);
    } catch (err) {
      const errors = err?.response?.data?.errors;
      const msg = errors
        ? Object.values(errors).flat().join(" ")
        : "Failed to save setting.";
      notify(msg, "error");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (key) => {
    setDeleting(true);
    try {
      await deleteSetting(key);           // DELETE /admin/settings/{key}
      setSettings(prev => prev.filter(s => s.key !== key));
      setConfirmKey(null);
      notify(`Setting "${key}" deleted.`);
    } catch {
      notify("Failed to delete setting.", "error");
    } finally {
      setDeleting(false);
    }
  };

  // ── Import ─────────────────────────────────────────────────────────────────
  const handleImport = async (obj) => {
    const items = Object.entries(obj).map(([key, value]) => ({ key, value: String(value) }));
    setImporting(true);
    try {
      await saveSettings({ settings: items });
      setExportOpen(false);
      await load();
      notify(`${items.length} settings imported.`);
    } catch {
      notify("Import failed.", "error");
    } finally {
      setImporting(false);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={S.page}>
      <style>{`
        @keyframes fadeUp { from { transform:translateY(10px);opacity:0; } to { transform:translateY(0);opacity:1; } }
        *{box-sizing:border-box;}
        input:focus,textarea:focus,select:focus{outline:none;border-color:#6366F1!important;box-shadow:0 0 0 3px rgba(99,102,241,.13);}
        tr.row:hover td{background:#FAFBFF;}
      `}</style>

      {/* Header */}
      <div style={S.header}>
        <div>
          <h2 style={S.title}>Settings</h2>
          <p style={S.subtitle}>Manage hotel application configuration</p>
        </div>
        <div style={S.row}>
          <button onClick={() => setExportOpen(true)} style={S.btnSecondary}>↕ Import / Export</button>
          <button onClick={() => { setModalMode("add"); setModalData(null); setModalOpen(true); }} style={S.btnPrimary}>
            + Add setting
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", gap: 12, marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, maxWidth: 340 }}>
          <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", fontSize: 14 }}>🔍</span>
          <input
            style={{ ...S.input, paddingLeft: 34 }}
            placeholder="Search keys or values…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: 4, background: "#F8FAFC", borderRadius: 10, padding: 4, border: "1px solid #E2E8F0", flexWrap: "wrap" }}>
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
              border: "none", borderRadius: 7, padding: "5px 11px",
              cursor: "pointer", fontSize: 13, transition: "all .15s",
              background: activeCategory === c.id ? "#6366F1" : "transparent",
              color: activeCategory === c.id ? "#fff" : "#64748B",
              fontWeight: activeCategory === c.id ? 600 : 400,
            }}>
              {c.label}
              <span style={{
                marginLeft: 4, fontSize: 11,
                background: activeCategory === c.id ? "rgba(255,255,255,.25)" : "#E2E8F0",
                color: activeCategory === c.id ? "#fff" : "#64748B",
                borderRadius: 10, padding: "0 5px",
              }}>{catCounts[c.id]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #E2E8F0", overflow: "hidden" }}>
        {loading ? (
          <div style={S.empty}>
            <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>⏳</span>
            Loading settings…
          </div>
        ) : filtered.length === 0 ? (
          <div style={S.empty}>
            <span style={{ fontSize: 28, display: "block", marginBottom: 8 }}>🔍</span>
            {search ? "No settings match your search." : "No settings yet — add your first one!"}
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #F1F5F9", background: "#FAFBFF" }}>
                <th style={{ ...S.th, width: "30%" }}>Key</th>
                <th style={{ ...S.th, width: "35%" }}>Value</th>
                <th style={{ ...S.th, width: "18%" }}>Category</th>
                <th style={{ ...S.th, width: "17%", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={s.key} className="row" style={{ borderBottom: i < filtered.length - 1 ? "1px solid #F8FAFC" : "none" }}>
                  <td style={S.td}>
                    <code style={S.code}>{s.key}</code>
                  </td>
                  <td style={{ ...S.td, maxWidth: 0 }}>
                    <span title={s.value} style={{
                      display: "block", overflow: "hidden",
                      textOverflow: "ellipsis", whiteSpace: "nowrap",
                      fontSize: 13, color: s.value ? "#334155" : "#CBD5E1",
                      fontStyle: s.value ? "normal" : "italic",
                    }}>
                      {s.value || "empty"}
                    </span>
                  </td>
                  <td style={S.td}><Badge category={s.category} /></td>
                  <td style={{ ...S.td, textAlign: "right" }}>
                    <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      <button title="Edit" style={S.actionBtn}
                        onClick={() => { setModalMode("edit"); setModalData(s); setModalOpen(true); }}>
                        ✏️
                      </button>
                      <button title="Delete" style={S.actionBtn}
                        onClick={() => setConfirmKey(s.key)}>
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 2px 0" }}>
        <span style={{ fontSize: 12, color: "#94A3B8" }}>
          {filtered.length} of {settings.length} settings
        </span>
        <button onClick={load} style={{ ...S.btnSecondary, fontSize: 12, padding: "5px 12px" }}>↺ Refresh</button>
      </div>

      {/* Modals */}
      <SettingModal
        open={modalOpen}
        mode={modalMode}
        data={modalData}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        saving={saving}
      />

      <ConfirmModal
        open={!!confirmKey}
        keyName={confirmKey}
        loading={deleting}
        onConfirm={() => handleDelete(confirmKey)}
        onCancel={() => setConfirmKey(null)}
      />

      <ExportImportModal
        open={exportOpen}
        settings={settings}
        onClose={() => setExportOpen(false)}
        onImport={handleImport}
        importing={importing}
      />

      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
    </div>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────
const S = {
  page: {
    maxWidth: 980, margin: "0 auto", padding: "2rem 1.5rem",
    fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    color: "#0F172A",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.75rem" },
  title:  { margin: 0, fontSize: 22, fontWeight: 700, color: "#0F172A" },
  subtitle: { margin: "4px 0 0", fontSize: 13, color: "#64748B" },
  row: { display: "flex", gap: 10, alignItems: "center" },
  th: {
    padding: "11px 18px", textAlign: "left",
    fontSize: 11, fontWeight: 600, color: "#94A3B8",
    textTransform: "uppercase", letterSpacing: "0.06em",
  },
  td: { padding: "12px 18px" },
  empty: { padding: "3rem", textAlign: "center", color: "#94A3B8", fontSize: 14 },
  input: {
    width: "100%", padding: "9px 12px", fontSize: 13,
    border: "1px solid #E2E8F0", borderRadius: 9,
    background: "#fff", color: "#0F172A",
    transition: "border .15s, box-shadow .15s",
  },
  code: {
    fontFamily: "'Fira Code',monospace", fontSize: 12,
    background: "#F1F5F9", color: "#475569",
    padding: "3px 8px", borderRadius: 6,
  },
  formGroup:  { marginBottom: "1rem" },
  label:      { display: "block", marginBottom: 5, fontSize: 12, fontWeight: 500, color: "#475569" },
  modalHead:  { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" },
  modalTitle: { margin: "0 0 8px", fontSize: 16, fontWeight: 600, textAlign: "center" },
  modalSub:   { margin: "0 0 1.5rem", fontSize: 13, color: "#64748B", textAlign: "center", lineHeight: 1.6 },
  btnPrimary: {
    padding: "9px 18px", background: "#6366F1", color: "#fff",
    border: "none", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  btnSecondary: {
    padding: "9px 18px", background: "#fff", color: "#475569",
    border: "1px solid #E2E8F0", borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: "pointer",
  },
  btnDanger: {
    padding: "9px 18px", background: "#FEF2F2", color: "#B91C1C",
    border: "1px solid #FECACA", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  iconBtn: { background: "none", border: "none", cursor: "pointer", color: "#94A3B8", fontSize: 17, padding: "2px 5px", borderRadius: 6 },
  actionBtn: {
    background: "#F8FAFC", border: "1px solid #E2E8F0",
    borderRadius: 7, padding: "5px 9px", cursor: "pointer", fontSize: 14,
  },
};