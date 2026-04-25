import React from 'react';
import { useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Typography, Card, CardContent, Button } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const columns = [
  { field: 'name', headerName: 'Name', width: 220 },
  { field: 'email', headerName: 'Email', width: 320 },
  { field: 'entries', headerName: 'Journal Entries', type: 'number', width: 160 },
];

const users = [
  { id: 1, name: 'Christopher Naval', email: 'christopher.naval@example.com', entries: 5 },
  { id: 2, name: 'Jonel Villaver', email: 'jonel.villaver@example.com', entries: 12 },
  { id: 3, name: 'Luis Ryan Sanisit', email: 'luis.sanisit@example.com', entries: 8 },
  { id: 4, name: 'Edrich Darren Santuyo', email: 'edrich.santuyo@example.com', entries: 3 },
  { id: 5, name: 'Vj Edgecombe', email: 'vj.edgecombe@example.com', entries: 2 },
];

// Mocked journals with sentiment and emotion labels
const journals = [
  { id: 1, userId: 1, sentiment: 'positive', emotion: 'joy' },
  { id: 2, userId: 2, sentiment: 'negative', emotion: 'anger' },
  { id: 3, userId: 3, sentiment: 'neutral', emotion: 'calm' },
  { id: 4, userId: 2, sentiment: 'positive', emotion: 'gratitude' },
  { id: 5, userId: 1, sentiment: 'positive', emotion: 'joy' },
  { id: 6, userId: 4, sentiment: 'negative', emotion: 'sadness' },
  { id: 7, userId: 3, sentiment: 'neutral', emotion: 'confused' },
  { id: 8, userId: 2, sentiment: 'positive', emotion: 'content' },
  { id: 9, userId: 5, sentiment: 'negative', emotion: 'sadness' },
  { id: 10, userId: 1, sentiment: 'positive', emotion: 'joy' },
];

function DashboardPage() {
  const location = useLocation();

  // Summary numbers
  const totalUsers = users.length;
  const totalJournals = journals.length;

  const sentimentCounts = journals.reduce(
    (acc, j) => {
      acc[j.sentiment] = (acc[j.sentiment] || 0) + 1;
      return acc;
    },
    { positive: 0, negative: 0, neutral: 0 }
  );

  const sentimentSeries = [
    {
      data: [
        { id: 'positive', value: sentimentCounts.positive, label: 'Positive' },
        { id: 'neutral', value: sentimentCounts.neutral, label: 'Neutral' },
        { id: 'negative', value: sentimentCounts.negative, label: 'Negative' },
      ],
    },
  ];

  const emotionCounts = journals.reduce((acc, j) => {
    acc[j.emotion] = (acc[j.emotion] || 0) + 1;
    return acc;
  }, {});

  const topEmotions = Object.entries(emotionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const userRows = users.map((u) => ({ id: u.id, name: u.name, email: u.email, entries: u.entries }));

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Summary Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 my-6">
        <div className="rounded-3xl border-2 border-zinc-900 bg-teal-50 p-5">
          <Typography variant="subtitle1">Total Users</Typography>
          <Typography variant="h3">{totalUsers}</Typography>
        </div>

        <div className="rounded-3xl border-2 border-zinc-900 bg-teal-50 p-5">
          <Typography variant="subtitle1">Total Journal Entries</Typography>
          <Typography variant="h3">{totalJournals}</Typography>
        </div>

        <div className="rounded-3xl border-2 border-zinc-900 bg-teal-50 p-5">
          <Typography variant="subtitle1">Most Prevalent Emotions</Typography>
          <div className="mt-3 flex flex-col gap-2">
            {topEmotions.length === 0 ? (
              <Typography variant="body2">No data yet</Typography>
            ) : (
              topEmotions.map(([emotion, count]) => (
                <div key={emotion} className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-900">{emotion}</span>
                  <span className="text-sm text-zinc-600">{count}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sentiment Chart + Users Table */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 my-6">
        <div className="col-span-1 lg:col-span-1 rounded-3xl border-2 border-zinc-900 bg-white p-4">
          <Typography variant="h6" className="mb-2">
            Sentiment Ratio
          </Typography>
          <div className="flex items-center justify-center">
            <PieChart series={sentimentSeries} width={240} height={240} />
          </div>
          <div className="mt-4 flex justify-around text-sm">
            <div className="flex flex-col items-center">
              <span className="font-semibold">Positive</span>
              <span className="text-zinc-600">{sentimentCounts.positive}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">Neutral</span>
              <span className="text-zinc-600">{sentimentCounts.neutral}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-semibold">Negative</span>
              <span className="text-zinc-600">{sentimentCounts.negative}</span>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 rounded-3xl border-2 border-zinc-900 bg-white p-4">
          <Typography variant="h6" className="mb-2">
            Users Overview
          </Typography>
          <Box sx={{ height: 380, width: '100%' }}>
            <DataGrid
              rows={userRows}
              columns={columns}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Box>
        </div>
      </div>

      {/* React Leaflet Map (kept) */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Location Map
      </Typography>
      <Box sx={{ height: 500, width: '100%' }}>
        <MapContainer center={[14.604253, 120.994314]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[14.604253, 120.994314]}>
            <Popup>
              <div>
                <strong>National University-Manila</strong>
                <br />
                551 F Jhoscon St, Sampaloc, Manila, 1008 Metro Manila
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </>
  );
}

export default DashboardPage;
