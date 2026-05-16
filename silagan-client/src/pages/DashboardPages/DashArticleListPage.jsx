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
import { fetchArticles, createArticle, updateArticle } from '../../services/articleService';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 720,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const toParagraphs = (content) => {
  if (!content) return [];
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
};

const toContentText = (paragraphs) => {
  if (!Array.isArray(paragraphs)) return '';
  return paragraphs.join('\n\n');
};

function DashArticleListPage() {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [newArticle, setNewArticle] = useState({
    name: '',
    title: '',
    imageLink: '',
    content: '',
    isActive: true,
  });

  const loadArticles = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await fetchArticles();
      setArticles(
        data.map((article) => ({
          id: article._id,
          name: article.name,
          title: article.title,
          imageLink: article.imageLink || '',
          content: Array.isArray(article.content) ? article.content : [],
          isActive: typeof article.isActive === 'boolean' ? article.isActive : true,
        }))
      );
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [loadArticles]);

  const onOpenAdd = useCallback(() => {
    setIsEditing(false);
    setNewArticle({
      name: '',
      title: '',
      imageLink: '',
      content: '',
      isActive: true,
    });
    setOpen(true);
  }, []);

  const onCloseAdd = useCallback(() => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
  }, []);

  const handleEdit = useCallback(
    (id) => {
      const articleToEdit = articles.find((article) => article.id === id);
      if (!articleToEdit) return;
      setNewArticle({
        name: articleToEdit.name,
        title: articleToEdit.title,
        imageLink: articleToEdit.imageLink,
        content: toContentText(articleToEdit.content),
        isActive: articleToEdit.isActive,
      });
      setEditArticleId(id);
      setIsEditing(true);
      setOpen(true);
    },
    [articles]
  );

  const onChangeNewArticle = useCallback((field, value) => {
    setNewArticle((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSaveArticle = useCallback(async () => {
    try {
      const payload = {
        name: newArticle.name.trim(),
        title: newArticle.title.trim(),
        imageLink: newArticle.imageLink.trim(),
        content: toParagraphs(newArticle.content),
        isActive: newArticle.isActive,
      };

      if (isEditing) {
        await updateArticle(editArticleId, payload);
      } else {
        await createArticle(payload);
      }

      await loadArticles();
      onCloseAdd();
    } catch (error) {
      console.error('Error saving article:', error);
    }
  }, [editArticleId, isEditing, loadArticles, newArticle, onCloseAdd]);

  const handleToggleActive = useCallback(
    async (id, isActive) => {
      try {
        await updateArticle(id, { isActive: !isActive });
        await loadArticles();
      } catch (error) {
        console.error('Error toggling article status:', error);
      }
    },
    [loadArticles]
  );

  const columns = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 120, sortable: true },
      { field: 'name', headerName: 'Slug', width: 200, sortable: true },
      { field: 'title', headerName: 'Title', width: 220, sortable: true },
      {
        field: 'paragraphs',
        headerName: 'Paragraphs',
        width: 120,
        sortable: true,
        valueGetter: (_value, row) => (Array.isArray(row?.content) ? row.content.length : 0),
      },
      {
        field: 'preview',
        headerName: 'Preview',
        width: 320,
        sortable: false,
        renderCell: (params) => {
          const snippet = params.row.content?.[0] || '';
          return snippet.length > 80 ? `${snippet.slice(0, 80)}...` : snippet;
        },
      },
      {
        field: 'isActive',
        headerName: 'Status',
        width: 120,
        sortable: true,
        renderCell: (params) => (params.value ? 'Active' : 'Inactive'),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 180,
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
              inputProps={{ 'aria-label': `toggle ${params.row.title} active` }}
            />
          </Stack>
        ),
      },
    ],
    [handleEdit, handleToggleActive]
  );

  const filteredRows = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return articles.filter((row) => {
      const matchesSearch =
        !term ||
        [row.name, row.title].some((value) => String(value || '').toLowerCase().includes(term));
      const matchesStatus =
        statusFilter === 'all' || (statusFilter === 'active' ? row.isActive : !row.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [articles, searchTerm, statusFilter]);

  const isSaveDisabled =
    !newArticle.name.trim() ||
    !newArticle.title.trim() ||
    toParagraphs(newArticle.content).length === 0;

  return (
    <>
      <div className="flex">
        <Typography variant="h4" gutterBottom className="pr-10">
          Articles
        </Typography>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ mb: 2, width: '100%' }}
          alignItems={{ md: 'center' }}
        >
          <TextField
            label="Search"
            placeholder="Slug or title"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            size="small"
            fullWidth
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
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
            <IconButton color="primary" onClick={onOpenAdd} aria-label="add article">
              <AddIcon />
            </IconButton>
          </Box>
        </Stack>
      </div>

      <Box sx={{ height: 520, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
            sorting: { sortModel: [{ field: 'title', sort: 'asc' }] },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          density="comfortable"
        />
      </Box>

      <Modal
        keepMounted
        open={open}
        onClose={onCloseAdd}
        aria-labelledby="add-article-modal"
        aria-describedby="add-article-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="add-article-modal" variant="h4" component="h2" sx={{ mb: 2 }}>
            {isEditing ? 'Edit Article' : 'Add Article'}
          </Typography>

          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Slug"
              value={newArticle.name}
              onChange={(event) => onChangeNewArticle('name', event.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Title"
              value={newArticle.title}
              onChange={(event) => onChangeNewArticle('title', event.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Image link"
              value={newArticle.imageLink}
              onChange={(event) => onChangeNewArticle('imageLink', event.target.value)}
              fullWidth
              placeholder="https://"
            />
            <TextField
              label="Content"
              value={newArticle.content}
              onChange={(event) => onChangeNewArticle('content', event.target.value)}
              fullWidth
              multiline
              minRows={5}
              placeholder="Write paragraphs separated by blank lines."
              required
            />
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(newArticle.isActive)}
                  onChange={(event) => onChangeNewArticle('isActive', event.target.checked)}
                />
              }
              label="Active"
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={onCloseAdd} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSaveArticle} variant="contained" disabled={isSaveDisabled}>
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default DashArticleListPage;
