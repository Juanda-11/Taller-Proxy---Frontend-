import React from 'react';
import {
  CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const COLORS = { inventory: '#2563eb', orders: '#16a34a', payments: '#d97706' };

export default function ResponseChart({ recent, services }) {
  const datasets = services.map((s) => {
    // el backend devuelve primero lo mas reciente: se invierte para mostrar cronologicamente
    const calls = [...(recent[s] || [])].reverse();
    return {
      label: s,
      data: calls.map((c) => c.durationMs),
      borderColor: COLORS[s],
      backgroundColor: COLORS[s],
      tension: 0.25,
      pointRadius: calls.map((c) => (c.status === 'ERROR' ? 5 : 2)),
      pointBackgroundColor: calls.map((c) => (c.status === 'ERROR' ? '#dc2626' : COLORS[s])),
    };
  });
  const maxLen = Math.max(0, ...datasets.map((d) => d.data.length));
  const options = {
    responsive: true,
    animation: false,
    scales: { y: { beginAtZero: true, title: { display: true, text: 'ms' } } },
  };
  return <Line data={{ labels: Array.from({ length: maxLen }, (_, i) => i + 1), datasets }} options={options} />;
}
