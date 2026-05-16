import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Switch,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Button,
  FormControlLabel,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { fetchUsers, createUser, updateUser } from '../../services/userService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function UsersPage() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);   // Track if editing
  const [editUserId, setEditUserId] = useState(null);  // Track the user being edited
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newUser, setNewUser] = useState({
    fullName: '',
    birthdate: '',
    email: '',
    dateRegistered: '',
    role: 'viewer',
    password: '',
    isActive: true,
  });
  const isValidEmail = useCallback((email) => {
    const normalized = String(email || '').trim();
    if (!normalized) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
  }, []);

  const meetsPasswordRule = useCallback((password) => String(password || '').length >= 8, []);

  const isAtLeast18 = useCallback((birthdate) => {
    if (!birthdate) return false;
    const date = new Date(`${birthdate}T00:00:00`);
    if (Number.isNaN(date.getTime())) return false;
    const today = new Date();
    const cutoff = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return date <= cutoff;
  }, []);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      setUsers(
        data.map((u, index) => ({
          id: Number(u.id ?? index + 1),
          fullName: u.fullName,
          birthdate: u.birthdate,
          email: u.email,
          dateRegistered: u.dateRegistered,
          role: typeof u.role === 'string' ? u.role : 'viewer',
          isActive: typeof u.isActive === 'boolean' ? u.isActive : true,
        }))
      );
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const onOpenAdd = useCallback(() => {
    setIsEditing(false); // Reset to "Add" mode
    const today = new Date();
    const defaultBirthdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
      .toISOString()
      .slice(0, 10);
    setNewUser({
      fullName: '',
      email: '',
      birthdate: defaultBirthdate,
      dateRegistered: today.toISOString().slice(0, 10),
      role: 'viewer',
      password: '',
      isActive: true,
    });
    setOpen(true);
  }, []);

  const onCloseAdd = useCallback(() => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
  }, []);

  const handleEdit = useCallback(
    (id) => {
      const userToEdit = users.find((u) => u.id === id);
      if (!userToEdit) return;
      setNewUser({ ...userToEdit, password: '' }); // Set password to an empty string
      setEditUserId(id);                            // Track the user being edited
      setIsEditing(true);                           // Switch to "Edit" mode
      setOpen(true);                                // Open the modal
    },
    [users]
  );

  const onChangeNewUser = useCallback((field, value) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSaveUser = useCallback(async () => {
    try {
      if (isEditing) {
        // Update user
        const updatedUser = { ...newUser };
        if (!updatedUser.password) {
          delete updatedUser.password; // Exclude password if it's empty
        }
        await updateUser(editUserId, updatedUser);
      } else {
        // Add new user
        await createUser(newUser);
      }
      await loadUsers(); // Reload users
      onCloseAdd();      // Close modal
    } catch (error) {
      console.error('Error saving user:', error);
    }
  }, [isEditing, newUser, editUserId, loadUsers, onCloseAdd]);

  const handleToggleActive = useCallback(
    async (id, isActive) => {
      try {
        await updateUser(id, { isActive: !isActive });
        await loadUsers(); // Reload users after toggling
      } catch (error) {
        console.error('Error toggling user status:', error);
      }
    },
    [loadUsers]
  );

  const columns = useMemo(
    () => [
      { field: 'fullName', headerName: 'Full Name', width: 240, sortable: true },
      {
        field: 'birthdate',
        headerName: 'Birthdate',
        width: 160,
        sortable: true,
        renderCell: (params) => {
          const v = params.value ?? params.row?.birthdate;
          if (!v) return '';
          const date = typeof v === 'string' ? new Date(v.includes('T') ? v : `${v}T00:00:00`) : new Date(v);
          return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString();
        },
      },
      { field: 'email', headerName: 'Email', width: 300, sortable: true },
      {
        field: 'role',
        headerName: 'Role',
        width: 160,
        sortable: true,
        type: 'singleSelect',
        valueOptions: ['admin', 'editor', 'viewer'],
        editable: true,
      },
      {
        field: 'dateRegistered',
        headerName: 'Date Registered',
        width: 180,
        sortable: true,
        renderCell: (params) => {
          const v = params.value ?? params.row?.dateRegistered;
          if (!v) return '';
          const date = typeof v === 'string' ? new Date(v.includes('T') ? v : `${v}T00:00:00`) : new Date(v);
          return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString();
        },
      },
      {
        field: 'isActive',
        headerName: 'Status',
        width: 140,
        sortable: true,
        renderCell: (params) => (params.value ? 'Active' : 'Inactive'),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 220,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Stack direction="row" spacing={0.5} alignItems="center">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEdit(params.row.id)}
              aria-label="edit"
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <Switch
              size="small"
              checked={Boolean(params.row.isActive)}
              onChange={() => handleToggleActive(params.row.id, params.row.isActive)}
              inputProps={{ 'aria-label': `toggle ${params.row.fullName} active` }}
            />
          </Stack>
        ),
      },
    ],
    [handleEdit, handleToggleActive]
  );

  const roleOptions = useMemo(() => {
    const roleSet = new Set(users.map((row) => row.role).filter(Boolean));
    return ['all', ...Array.from(roleSet)];
  }, [users]);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return users.filter((row) => {
      const nameParts = String(row.fullName ?? '').trim().split(/\s+/).filter(Boolean);
      const firstName = nameParts[0] ?? '';
      const lastName = nameParts[nameParts.length - 1] ?? '';
      const email = String(row.email ?? '');
      const fullName = String(row.fullName ?? '');

      const matchesSearch =
        !term ||
        [firstName, lastName, email, fullName].some((value) => value.toLowerCase().includes(term));
      const matchesRole = roleFilter === 'all' || row.role === roleFilter;
      const matchesStatus =
        statusFilter === 'all' || (statusFilter === 'active' ? row.isActive : !row.isActive);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, roleFilter, searchTerm, statusFilter]);

  const isSaveDisabled =
    !newUser.fullName.trim() ||
    !newUser.email.trim() ||
    !isValidEmail(newUser.email) ||
    !isAtLeast18(newUser.birthdate) ||
    (!isEditing && (!newUser.password.trim() || !meetsPasswordRule(newUser.password)));

  return (
    <>
      <div className="flex">
        <Typography variant="h4" gutterBottom className="pr-10">
          Users
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ mb: 2, width: '100%' }}
          alignItems={{ md: 'center' }}
        >
          <TextField
            label="Search"
            placeholder="First name, last name, or email"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            size="small"
            fullWidth
          />
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="role-filter-label">Role</InputLabel>
            <Select
              labelId="role-filter-label"
              value={roleFilter}
              label="Role"
              onChange={(event) => setRoleFilter(event.target.value)}
            >
              {roleOptions.map((role) => (
                <MenuItem key={role} value={role}>
                  {role === 'all' ? 'All roles' : role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              value={statusFilter}
              label="Status"
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <MenuItem value="all">All statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ ml: 'auto' }}>
            <IconButton color="primary" onClick={onOpenAdd} aria-label="add user">
              <AddIcon />
            </IconButton>
          </Box>
        </Stack>
      </div>

      {/* Data grid */}
      <Box sx={{ height: 520, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
            sorting: { sortModel: [{ field: 'fullName', sort: 'asc' }] },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          density="comfortable"
          processRowUpdate={(newRow) => {
            setUsers((prevUsers) => prevUsers.map((row) => (row.id === newRow.id ? newRow : row)));
            return newRow;
          }}
        />
      </Box>

      {/* Modal for Add / Edit User (switched from Dialog to Modal per professor's sample) */}
      <Modal
        keepMounted
        open={open}
        onClose={onCloseAdd}
        aria-labelledby="add-user-modal"
        aria-describedby="add-user-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="add-user-modal" variant="h4" component="h2" sx={{ mb: 2 }}>
            {isEditing ? 'Edit User' : 'Add User'}
          </Typography>

          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Full name"
              value={newUser.fullName}
              onChange={(event) => onChangeNewUser('fullName', event.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Email"
              type="email"
              value={newUser.email}
              onChange={(event) => onChangeNewUser('email', event.target.value)}
              error={Boolean(newUser.email) && !isValidEmail(newUser.email)}
              helperText={
                Boolean(newUser.email) && !isValidEmail(newUser.email)
                  ? 'Enter a valid email address.'
                  : ' '
              }
              fullWidth
              required
            />
            <TextField
              label="Birthdate"
              type="date"
              value={newUser.birthdate}
              onChange={(event) => onChangeNewUser('birthdate', event.target.value)}
              InputLabelProps={{ shrink: true }}
              placeholder="YYYY-MM-DD"
              error={Boolean(newUser.birthdate) && !isAtLeast18(newUser.birthdate)}
              helperText={
                Boolean(newUser.birthdate) && !isAtLeast18(newUser.birthdate)
                  ? 'User must be at least 18 years old.'
                  : ' '
              }
              fullWidth
            />
            <TextField
              label="Date registered"
              type="date"
              value={newUser.dateRegistered}
              onChange={(event) => onChangeNewUser('dateRegistered', event.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <FormControl size="small" fullWidth>
              <InputLabel id="new-user-role-label">Role</InputLabel>
              <Select
                labelId="new-user-role-label"
                value={newUser.role}
                label="Role"
                onChange={(event) => onChangeNewUser('role', event.target.value)}
              >
                {['admin', 'editor', 'viewer'].map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Password"
              type="password"
              value={newUser.password}
              onChange={(event) => onChangeNewUser('password', event.target.value)}
              error={Boolean(newUser.password) && !meetsPasswordRule(newUser.password)}
              helperText={
                Boolean(newUser.password) && !meetsPasswordRule(newUser.password)
                  ? 'Password must be at least 8 characters.'
                  : isEditing
                  ? 'Leave blank to keep existing password.'
                  : ' '
              }
              fullWidth
              required={!isEditing}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(newUser.isActive)}
                  onChange={(event) => onChangeNewUser('isActive', event.target.checked)}
                />
              }
              label={newUser.isActive ? 'Active' : 'Inactive'}
            />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={onCloseAdd}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveUser}
              disabled={isSaveDisabled}
            >
              {isEditing ? 'Save Changes' : 'Add'}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default UsersPage;