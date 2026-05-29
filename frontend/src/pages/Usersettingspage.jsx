    import { useState, useEffect } from "react";
    import { useNavigate } from "react-router-dom";
    import api from "../api";

    // ─── Toast ────────────────────────────────────────────────────────────────────
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
        color: isErr ? "#991B1B" : "#166534",
        border: `1px solid ${isErr ? "#FECACA" : "#BBF7D0"}`,
        borderRadius: 12, padding: "13px 20px",
        fontSize: 13, fontWeight: 500,
        display: "flex", alignItems: "center", gap: 10,
        boxShadow: "0 8px 30px rgba(0,0,0,0.1)", minWidth: 240,
        animation: "slideUp .2s ease",
        }}>
        <span style={{ fontSize: 17 }}>{isErr ? "✕" : "✓"}</span>
        {message}
        </div>
    );
    }

    // ─── Section Card ─────────────────────────────────────────────────────────────
    function Card({ title, subtitle, icon, children }) {
    return (
        <div style={{
        background: "#fff",
        border: "1px solid #E7E5E0",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: "1.5rem",
        }}>
        <div style={{
            padding: "1.25rem 1.75rem",
            borderBottom: "1px solid #F5F3EE",
            display: "flex", alignItems: "center", gap: 14,
            background: "#FAFAF8",
        }}>
            <span style={{ fontSize: 22 }}>{icon}</span>
            <div>
            <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#1B3022" }}>{title}</h3>
            {subtitle && <p style={{ margin: "2px 0 0", fontSize: 12, color: "#9CA3AF" }}>{subtitle}</p>}
            </div>
        </div>
        <div style={{ padding: "1.5rem 1.75rem" }}>{children}</div>
        </div>
    );
    }

    // ─── Field ────────────────────────────────────────────────────────────────────
    function Field({ label, children }) {
    return (
        <div style={{ marginBottom: "1.1rem" }}>
        <label style={{
            display: "block", marginBottom: 6,
            fontSize: 12, fontWeight: 600, color: "#6B7280",
            textTransform: "uppercase", letterSpacing: "0.05em",
        }}>{label}</label>
        {children}
        </div>
    );
    }

    const input = {
    width: "100%", padding: "10px 14px", fontSize: 14,
    border: "1px solid #E5E7EB", borderRadius: 10,
    background: "#fff", color: "#111827",
    boxSizing: "border-box",
    transition: "border .15s, box-shadow .15s",
    fontFamily: "inherit",
    };

    const inputDisabled = {
    ...input,
    background: "#F9FAFB", color: "#6B7280", cursor: "not-allowed",
    };

    // ─── Main ─────────────────────────────────────────────────────────────────────
    export default function UserSettingsPage() {
    const navigate  = useNavigate();

    // load user from localStorage
    const storedUser = (() => {
        try {
        return (
            JSON.parse(localStorage.getItem("user")) ||
            JSON.parse(localStorage.getItem("auth_user")) ||
            null
        );
        } catch { return null; }
    })();

    // Profile state
    const [nom,       setNom]       = useState(storedUser?.nom       ?? "");
    const [prenom,    setPrenom]    = useState(storedUser?.prenom     ?? "");
    const [email,     setEmail]     = useState(storedUser?.email      ?? "");
    const [telephone, setTelephone] = useState(storedUser?.telephone  ?? "");
    const [savingProfile, setSavingProfile] = useState(false);

    // Password state
    const [currentPwd,  setCurrentPwd]  = useState("");
    const [newPwd,      setNewPwd]      = useState("");
    const [confirmPwd,  setConfirmPwd]  = useState("");
    const [savingPwd,   setSavingPwd]   = useState(false);
    const [pwdError,    setPwdError]    = useState("");

    const [toast, setToast] = useState({ message: "", type: "success" });
    const notify  = (message, type = "success") => setToast({ message, type });

    // ── Save profile ─────────────────────────────────────────────────────────
    const handleSaveProfile = async () => {
        setSavingProfile(true);
        try {
        const res = await api.put("/profile", { nom, prenom, email, telephone });
        const updated = res.data?.user ?? res.data;
        // update localStorage
        const key = localStorage.getItem("user") ? "user" : "auth_user";
        const prev = JSON.parse(localStorage.getItem(key) || "{}");
        localStorage.setItem(key, JSON.stringify({ ...prev, ...updated }));
        notify("Profile updated successfully.");
        } catch (err) {
        const errors = err?.response?.data?.errors;
        const msg = errors
            ? Object.values(errors).flat().join(" ")
            : err?.response?.data?.message ?? "Failed to update profile.";
        notify(msg, "error");
        } finally {
        setSavingProfile(false);
        }
    };

    // ── Change password ───────────────────────────────────────────────────────
    const handleChangePassword = async () => {
        setPwdError("");
        if (!currentPwd || !newPwd || !confirmPwd) {
        setPwdError("Please fill all password fields.");
        return;
        }
        if (newPwd !== confirmPwd) {
        setPwdError("New passwords don't match.");
        return;
        }
        if (newPwd.length < 8) {
        setPwdError("Password must be at least 8 characters.");
        return;
        }
        setSavingPwd(true);
        try {
        await api.put("/profile/password", {
            current_password: currentPwd,
            password: newPwd,
            password_confirmation: confirmPwd,
        });
        setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
        notify("Password changed successfully.");
        } catch (err) {
        const errors = err?.response?.data?.errors;
        const msg = errors
            ? Object.values(errors).flat().join(" ")
            : err?.response?.data?.message ?? "Failed to change password.";
        setPwdError(msg);
        } finally {
        setSavingPwd(false);
        }
    };

    // ── Logout ────────────────────────────────────────────────────────────────
    const handleLogout = async () => {
        try { await api.post("/logout"); } catch (_) {}
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        localStorage.removeItem("auth_user");
        navigate("/auth");
    };

    return (
        <div style={{
        minHeight: "100vh", background: "#F5F3EE",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}>
        <style>{`
            @keyframes slideUp { from{transform:translateY(10px);opacity:0} to{transform:translateY(0);opacity:1} }
            input:focus, select:focus { outline: none; border-color: #1B3022 !important; box-shadow: 0 0 0 3px rgba(27,48,34,.1) !important; }
        `}</style>

        {/* Header */}
        <div style={{
            background: "#1B3022", padding: "1.5rem 2rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                background: "rgba(255,255,255,0.08)", border: "none",
                color: "#C8A96A", borderRadius: 10, padding: "8px 14px",
                cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6,
                }}
            >
                ← Back
            </button>
            <div>
                <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#C8A96A", letterSpacing: "0.05em" }}>
                Account Settings
                </h1>
                <p style={{ margin: "2px 0 0", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Le Musée — Personal preferences
                </p>
            </div>
            </div>
            <button
            onClick={handleLogout}
            style={{
                background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)",
                color: "#FCA5A5", borderRadius: 10, padding: "8px 16px",
                cursor: "pointer", fontSize: 12, fontWeight: 600,
            }}
            >
            Sign out
            </button>
        </div>

        {/* Content */}
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "2rem 1.5rem" }}>

            {/* Avatar / welcome */}
            <div style={{
            background: "#fff", border: "1px solid #E7E5E0",
            borderRadius: 16, padding: "1.5rem 1.75rem",
            marginBottom: "1.5rem",
            display: "flex", alignItems: "center", gap: 18,
            }}>
            <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "#1B3022",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, fontWeight: 700, color: "#C8A96A",
                flexShrink: 0,
            }}>
                {(prenom?.[0] ?? "") + (nom?.[0] ?? "") || "?"}
            </div>
            <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: "#1B3022" }}>
                {prenom} {nom}
                </p>
                <p style={{ margin: "3px 0 0", fontSize: 13, color: "#9CA3AF" }}>{email}</p>
            </div>
            <div style={{
                marginLeft: "auto",
                background: "#F0FDF4", color: "#15803D",
                border: "1px solid #BBF7D0",
                borderRadius: 20, padding: "4px 12px",
                fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
                {storedUser?.role ?? "user"}
            </div>
            </div>

            {/* Profile */}
            <Card title="Personal Information" subtitle="Update your name, email and phone" icon="👤">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1rem" }}>
                <Field label="First name">
                <input style={input} value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Prenom" />
                </Field>
                <Field label="Last name">
                <input style={input} value={nom} onChange={e => setNom(e.target.value)} placeholder="Nom" />
                </Field>
            </div>
            <Field label="Email address">
                <input style={input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" />
            </Field>
            <Field label="Phone number">
                <input style={input} value={telephone} onChange={e => setTelephone(e.target.value)} placeholder="+212 6XX XXX XXX" />
            </Field>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "0.5rem" }}>
                <button
                onClick={handleSaveProfile}
                disabled={savingProfile}
                style={{
                    background: savingProfile ? "#9CA3AF" : "#1B3022",
                    color: "#fff", border: "none",
                    borderRadius: 10, padding: "10px 24px",
                    fontSize: 13, fontWeight: 600, cursor: savingProfile ? "not-allowed" : "pointer",
                    transition: "background .2s",
                }}
                >
                {savingProfile ? "Saving…" : "Save changes"}
                </button>
            </div>
            </Card>

            {/* Password */}
            <Card title="Change Password" subtitle="Choose a strong password" icon="🔒">
            <Field label="Current password">
                <input
                style={input} type="password"
                value={currentPwd} onChange={e => setCurrentPwd(e.target.value)}
                placeholder="••••••••"
                />
            </Field>
            <Field label="New password">
                <input
                style={input} type="password"
                value={newPwd} onChange={e => setNewPwd(e.target.value)}
                placeholder="Min. 8 characters"
                />
            </Field>
            <Field label="Confirm new password">
                <input
                style={input} type="password"
                value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)}
                placeholder="••••••••"
                />
            </Field>
            {pwdError && (
                <p style={{ margin: "0 0 1rem", fontSize: 12, color: "#B91C1C", background: "#FEF2F2", padding: "8px 12px", borderRadius: 8 }}>
                ⚠️ {pwdError}
                </p>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                onClick={handleChangePassword}
                disabled={savingPwd}
                style={{
                    background: savingPwd ? "#9CA3AF" : "#1B3022",
                    color: "#fff", border: "none",
                    borderRadius: 10, padding: "10px 24px",
                    fontSize: 13, fontWeight: 600, cursor: savingPwd ? "not-allowed" : "pointer",
                    transition: "background .2s",
                }}
                >
                {savingPwd ? "Updating…" : "Update password"}
                </button>
            </div>
            </Card>

            {/* Account info (read-only) */}
            <Card title="Account Details" subtitle="Read-only information" icon="ℹ️">
            <Field label="Role">
                <input style={inputDisabled} value={storedUser?.role ?? "—"} disabled />
            </Field>
            <Field label="Member ID">
                <input style={inputDisabled} value={storedUser?.id ? `#${storedUser.id}` : "—"} disabled />
            </Field>
            </Card>

            {/* Danger zone */}
            <div style={{
            border: "1px solid #FECACA", borderRadius: 16,
            padding: "1.25rem 1.75rem",
            background: "#FFF",
            }}>
            <h3 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 600, color: "#B91C1C" }}>Danger Zone</h3>
            <p style={{ margin: "0 0 1rem", fontSize: 12, color: "#9CA3AF" }}>
                Sign out from your account on this device.
            </p>
            <button
                onClick={handleLogout}
                style={{
                background: "#FEF2F2", color: "#B91C1C",
                border: "1px solid #FECACA", borderRadius: 10,
                padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}
            >
                Sign out
            </button>
            </div>
        </div>

        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />
        </div>
    );
    }