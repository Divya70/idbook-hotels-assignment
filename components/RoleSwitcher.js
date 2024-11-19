export default function RoleSwitcher({ role, setRole }) {
  const roles = ["admin", "user", "guest"];
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium">Role</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-3 py-2 border rounded"
      >
        {roles.map((r) => (
          <option key={r} value={r}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
