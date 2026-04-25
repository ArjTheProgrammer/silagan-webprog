import React, { useMemo, useState } from 'react';
import { Typography, Card, CardContent, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

// Mocked journal entries with dates and GoEmotions-like labels
const mockedJournals = [
  { id: 1, userId: 1, date: '2026-01-05', emotion: 'joy' },
  { id: 2, userId: 2, date: '2026-01-15', emotion: 'anger' },
  { id: 3, userId: 1, date: '2026-02-03', emotion: 'sadness' },
  { id: 4, userId: 3, date: '2026-02-18', emotion: 'joy' },
  { id: 5, userId: 2, date: '2026-03-01', emotion: 'surprise' },
  { id: 6, userId: 4, date: '2026-03-22', emotion: 'fear' },
  { id: 7, userId: 1, date: '2026-03-30', emotion: 'joy' },
  { id: 8, userId: 5, date: '2026-04-12', emotion: 'neutral' },
  { id: 9, userId: 2, date: '2026-04-14', emotion: 'joy' },
  { id: 10, userId: 3, date: '2026-04-28', emotion: 'sadness' },
  { id: 11, userId: 1, date: '2026-04-29', emotion: 'joy' },
  { id: 12, userId: 2, date: '2026-05-03', emotion: 'anger' },
  { id: 13, userId: 4, date: '2026-05-11', emotion: 'joy' },
  { id: 14, userId: 5, date: '2026-05-19', emotion: 'disgust' },
  { id: 15, userId: 3, date: '2026-05-23', emotion: 'joy' },
];

function formatMonth(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, { month: 'short', year: 'numeric' });
}

function generateMockSummary(journals) {
  if (!journals || journals.length === 0) return 'No journal entries available to summarize.';

  const total = journals.length;
  const dates = journals.map((j) => new Date(j.date));
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  const emotionCounts = journals.reduce((acc, j) => {
    acc[j.emotion] = (acc[j.emotion] || 0) + 1;
    return acc;
  }, {});

  const sorted = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1]);
  const topThree = sorted.slice(0, 3).map(([e, c]) => `${e} (${c})`).join(', ');

  const top = sorted[0] ? sorted[0][0] : 'neutral';

  // More human-like paragraphing and suggestions
  return `Between ${minDate.toLocaleDateString()} and ${maxDate.toLocaleDateString()}, there were ${total} journal entries. The most frequently expressed emotions were ${topThree}. Overall, entries leaned toward ${top}, suggesting users are generally experiencing more ${top}-related moments during this period. Consider encouraging prompts that help users reflect on triggers and coping strategies for ${top} to promote awareness and balance.`;
}

function ReportsPage() {
  const [monthsToShow, setMonthsToShow] = useState(5);

  const { months, emotions, series } = useMemo(() => {
    // Build month buckets (sorted)
    const monthsSet = new Set();
    mockedJournals.forEach((j) => monthsSet.add(formatMonth(j.date)));
    const monthsArr = Array.from(monthsSet).sort((a, b) => {
      return new Date(a) - new Date(b);
    });

    // limit to last N months
    const visibleMonths = monthsArr.slice(-monthsToShow);

    // gather unique emotions
    const emotionSet = new Set(mockedJournals.map((j) => j.emotion));
    const emotionsArr = Array.from(emotionSet);

    // counts per month per emotion
    const counts = {};
    mockedJournals.forEach((j) => {
      const m = formatMonth(j.date);
      counts[m] = counts[m] || {};
      counts[m][j.emotion] = (counts[m][j.emotion] || 0) + 1;
    });

    // build chart series: one series per emotion with values aligned to visibleMonths
    const chartSeries = emotionsArr.map((em) => ({
      label: em,
      data: visibleMonths.map((m) => counts[m]?.[em] || 0),
    }));

    return { months: visibleMonths, emotions: emotionsArr, series: chartSeries };
  }, [monthsToShow]);

  const summary = useMemo(() => generateMockSummary(mockedJournals), []);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 my-6">
        <div className="col-span-1 lg:col-span-2 rounded-3xl border-2 border-zinc-900 bg-white p-4">
          <Typography variant="h6" className="mb-2">
            Emotions by Month
          </Typography>
          <Box sx={{ height: 360, width: '100%' }}>
            <FormControl size="small" sx={{ mb: 2, minWidth: 140 }}>
              <InputLabel id="months-label">Months</InputLabel>
              <Select
                labelId="months-label"
                value={monthsToShow}
                label="Months"
                onChange={(e) => setMonthsToShow(Number(e.target.value))}
              >
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </FormControl>

            <BarChart series={series} categories={months} height={260} stacked />
          </Box>
        </div>

        <div className="col-span-1 rounded-3xl border-2 border-zinc-900 bg-white p-4">
          <Typography variant="h6" className="mb-2">
            AI Summary
          </Typography>
          <Card variant="outlined" sx={{ bgcolor: 'transparent' }}>
            <CardContent>
              <Typography variant="body2" paragraph>
                {summary}
              </Typography>
            </CardContent>
          </Card>

          <Typography variant="h6" className="mt-4 mb-2">
            Overall Emotion Distribution
          </Typography>
          <Card variant="outlined" sx={{ mt: 1 }}>
            <CardContent>
              {/* build pie series from mockedJournals */}
              <PieChart
                series={[
                  {
                    data: Object.entries(
                      mockedJournals.reduce((acc, j) => {
                        acc[j.emotion] = (acc[j.emotion] || 0) + 1;
                        return acc;
                      }, {})
                    ).map(([id, value]) => ({ id, value, label: `${id}` })),
                  },
                ]}
                width={220}
                height={220}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* removed raw counts debug output per request */}
    </>
  );
}

export default ReportsPage;