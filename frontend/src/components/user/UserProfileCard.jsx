import { useState, useEffect } from "react";
import { FiEdit2, FiLogOut, FiSave, FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { updateUser } from "../../services/userService";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const UserProfileCard = ({ user: initialUser, setUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [user, setLocalUser] = useState(null);
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // 🔥 FIX: load user ONCE from backend (single source of truth)
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/auth/me/");
        const currentUser = res.data;

        setLocalUser(currentUser);
        setUser?.(currentUser);
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    };

    loadUser();
  }, [navigate, setUser]);

  // 🔥 FIX: initialize form ONLY ONCE (prevents typing freeze)
  useEffect(() => {
    if (!user) return;

    setForm((prev) => {
      if (Object.keys(prev).length > 0) return prev;

      return {
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        username: user.username || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        password: "",
      };
    });
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 text-center text-light-text dark:text-dark-text">
        Loading...
      </div>
    );
  }

  const getValue = (v1) => v1 || "-";

  // 🔥 FIX: stable controlled input update
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password;

      const res = await updateUser(user.id, payload);

      setLocalUser(res.data);
      setUser?.(res.data);

      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setEditMode(false);

    setForm({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      username: user.username || "",
      email: user.email || "",
      phone_number: user.phone_number || "",
      password: "",
    });
  };

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");

      await API.post("/auth/logout/", { refresh });

    } catch (err) {
      console.log(err);
    }

    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const Input = ({ name, type = "text" }) => (
    <input
      type={type}
      name={name}
      value={form?.[name] ?? ""}
      onChange={handleChange}
      autoComplete="off"
      className="
        w-full px-4 py-2 rounded-xl border
        bg-light-background dark:bg-dark-background
        text-light-text dark:text-dark-text
        border-light-primary/30 dark:border-dark-primary/30
        focus:outline-none focus:ring-2
        focus:ring-light-primary dark:focus:ring-dark-primary
      "
    />
  );

  const Field = ({ label, children }) => (
    <div className="space-y-1">
      <label className="text-xs font-medium uppercase text-light-text/60 dark:text-dark-text/60">
        {label}
      </label>
      {children}
    </div>
  );

  const Display = ({ value }) => (
    <div className="px-3 py-2 rounded-xl border
      border-light-primary/20 dark:border-dark-primary/20
      text-light-text dark:text-dark-text">
      {value}
    </div>
  );

  return (
    <div className="
      w-[420px] max-w-full mx-auto
      rounded-2xl p-6
      bg-light-background dark:bg-dark-background
      border border-light-primary/20 dark:border-dark-primary/20
      shadow-lg
    ">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
          {editMode ? "Edit Profile" : "My Profile"}
        </h2>

        <p className="text-xs text-light-text/60 dark:text-dark-text/60 mt-1">
          {user.role || "User Account"}
        </p>
      </div>

      {/* FIELDS */}
      <div className="space-y-4">

        <Field label="First Name">
          {editMode ? (
            <Input name="first_name" />
          ) : (
            <Display value={getValue(user.first_name)} />
          )}
        </Field>

        <Field label="Last Name">
          {editMode ? (
            <Input name="last_name" />
          ) : (
            <Display value={getValue(user.last_name)} />
          )}
        </Field>

        <Field label="Username">
          {editMode ? (
            <Input name="username" />
          ) : (
            <Display value={getValue(user.username)} />
          )}
        </Field>

        <Field label="Email">
          {editMode ? (
            <Input name="email" type="email" />
          ) : (
            <Display value={getValue(user.email)} />
          )}
        </Field>

        <Field label="Phone">
          {editMode ? (
            <Input name="phone_number" />
          ) : (
            <Display value={getValue(user.phone_number)} />
          )}
        </Field>

        <Field label="Password">
          {editMode ? (
            <div className="relative">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  text-light-text/60 dark:text-dark-text/60
                  hover:text-light-primary dark:hover:text-dark-primary
                  transition
                "
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          ) : (
            <Display value="••••••••" />
          )}
        </Field>

      </div>

      {/* ACTIONS */}
      <div className="mt-6 space-y-3">

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="
              w-full flex items-center justify-center gap-2
              py-2.5 rounded-xl font-medium
              text-light-text dark:text-dark-text
              border border-light-primary
              hover:bg-light-primary/10 dark:hover:bg-dark-primary/10
              transition
            "
          >
            <FiEdit2 /> Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">

            <button
              onClick={handleSave}
              className="
                flex-1 flex items-center justify-center gap-2
                py-2.5 rounded-xl font-medium
                bg-light-primary dark:bg-dark-primary
                text-black
                hover:opacity-90
                transition
              "
            >
              <FiSave /> Save
            </button>

            <button
              onClick={handleCancel}
              className="
                flex-1 flex items-center justify-center gap-2
                py-2.5 rounded-xl font-medium
                border border-light-primary
                text-light-text dark:text-dark-text
                hover:bg-light-primary/10 dark:hover:bg-dark-primary/10
                transition
              "
            >
              <FiX /> Cancel
            </button>

          </div>
        )}

        <button
          onClick={handleLogout}
          className="
            w-full flex items-center justify-center gap-2
            py-2.5 rounded-xl font-medium
            border border-red-400
            text-red-500
            hover:bg-red-500 hover:text-white
            transition
          "
        >
          <FiLogOut /> Logout
        </button>

      </div>
    </div>
  );
};

export default UserProfileCard;