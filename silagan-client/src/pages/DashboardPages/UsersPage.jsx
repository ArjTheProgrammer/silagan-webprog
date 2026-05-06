import { useCallback, useMemo, useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import usersSeed from '../../data/users.json';

function UsersPage() {
  const [rows, setRows] = useState(() =>
    usersSeed.map((u, index) => ({
      id: Number(u.id ?? index + 1),
      fullName: u.fullName,
      birthdate: u.birthdate,
      email: u.email,
      dateRegistered: u.dateRegistered,
      role: typeof u.role === 'string' ? u.role : 'user',
      isActive: typeof u.isActive === 'boolean' ? u.isActive : true,
    }))
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    birthdate: '',
    email: '',
    dateRegistered: '',
    role: 'user',
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

  const onToggleActive = useCallback((id) => {
    setRows((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, isActive: !row.isActive } : row)));
  }, []);

  const onOpenAdd = useCallback(() => {
    const today = new Date();
    const defaultBirthdate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
      .toISOString()
      .slice(0, 10);
    setNewUser({
      fullName: '',
      email: '',
      birthdate: defaultBirthdate,
      dateRegistered: today.toISOString().slice(0, 10),
      role: 'user',
      password: '',
      isActive: true,
    });
    setIsAddOpen(true);
  }, []);

  const onCloseAdd = useCallback(() => setIsAddOpen(false), []);

  const onChangeNewUser = useCallback((field, value) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  }, []);

  const onSaveNewUser = useCallback(() => {
    const nextId = rows.reduce((maxId, row) => Math.max(maxId, Number(row.id) || 0), 0) + 1;
    const dateRegistered = newUser.dateRegistered || new Date().toISOString().slice(0, 10);
    setRows((prevRows) => [
      ...prevRows,
      {
        id: nextId,
        fullName: newUser.fullName.trim(),
        birthdate: newUser.birthdate || null,
        email: newUser.email.trim(),
        dateRegistered,
        role: newUser.role || 'user',
        isActive: Boolean(newUser.isActive),
      },
    ]);
    setIsAddOpen(false);
  }, [newUser, rows]);

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
        valueOptions: ['developer', 'user', 'tester'],
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
        renderCell: (params) => {
          const onEdit = () => alert(`Edit user: ${params.row.fullName}`);

          return (
            <Stack direction="row" spacing={0.5} alignItems="center">
              <IconButton size="small" color="primary" onClick={onEdit} aria-label="edit">
                <EditIcon fontSize="small" />
              </IconButton>
              <Switch
                size="small"
                checked={Boolean(params.row.isActive)}
                onChange={() => onToggleActive(params.row.id)}
                inputProps={{ 'aria-label': `toggle ${params.row.fullName} active` }}
              />
            </Stack>
          );
        },
      },
    ],
    [onToggleActive]
  );

  const roleOptions = useMemo(() => {
    const roleSet = new Set(rows.map((row) => row.role).filter(Boolean));
    return ['all', ...Array.from(roleSet)];
  }, [rows]);

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return rows.filter((row) => {
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
  }, [rows, roleFilter, searchTerm, statusFilter]);

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

      <Box sx={{ height: 520, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 5 } }, sorting: { sortModel: [{ field: 'fullName', sort: 'asc' }] } }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          density="comfortable"
          processRowUpdate={(newRow) => {
            setRows((prevRows) => prevRows.map((row) => (row.id === newRow.id ? newRow : row)));
            return newRow;
          }}
        />
      </Box>

      <Dialog open={isAddOpen} onClose={onCloseAdd} fullWidth maxWidth="sm">
        <DialogTitle>Add user</DialogTitle>
        <DialogContent>
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
                {['developer', 'user', 'tester'].map((role) => (
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
                  : ' '
              }
              fullWidth
              required
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
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseAdd}>Cancel</Button>
          <Button
            variant="contained"
            onClick={onSaveNewUser}
            disabled={
              !newUser.fullName.trim() ||
              !newUser.email.trim() ||
              !newUser.password.trim() ||
              !isValidEmail(newUser.email) ||
              !meetsPasswordRule(newUser.password) ||
              !isAtLeast18(newUser.birthdate)
            }
          >
            Add user
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UsersPage;