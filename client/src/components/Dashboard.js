import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

function Dashboard({ data }) {
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  };

  return (
    <div className="dashboard">
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Page Views</h3>
          <div className="metric-value">{formatNumber(data.pageViews)}</div>
        </div>
        <div className="metric-card">
          <h3>Unique Visitors</h3>
          <div className="metric-value">{formatNumber(data.uniqueVisitors)}</div>
        </div>
        <div className="metric-card">
          <h3>Bounce Rate</h3>
          <div className="metric-value">{data.bounceRate}%</div>
        </div>
        <div className="metric-card">
          <h3>Avg Session</h3>
          <div className="metric-value">{Math.floor(data.avgSessionDuration / 60)}m {data.avgSessionDuration % 60}s</div>
        </div>
        <div className="metric-card">
          <h3>Conversion Rate</h3>
          <div className="metric-value">{data.conversionRate}%</div>
        </div>
        <div className="metric-card">
          <h3>Revenue</h3>
          <div className="metric-value">{formatCurrency(data.revenue)}</div>
        </div>
      </div>
      <div className="timestamp">
        Last updated: {new Date(data.timestamp).toLocaleString()}
      </div>
    </div>
  );
}

export default Dashboard;
