import React from 'react';
import { Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { colors } from '../utils/theme';

const CustomBarChart = ({ data, title, xKey, yKey, color = colors.primary }) => {
  // Largeur dynamique : 100px par barre minimum
  const minWidth = data ? Math.max(data.length * 120, 600) : 600;

  return (
    <Box sx={{ width: '100%', height: '100%', overflowX: 'auto' }}>
      <Box sx={{ minWidth: `${minWidth}px`, height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={xKey} 
              angle={-45} 
              textAnchor="end" 
              height={100}
              interval={0}
              tick={{ fontSize: 13, fontWeight: 500 }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              width={70}
              tickFormatter={(value) => {
                if (value >= 1000000) return (value/1000000).toFixed(1) + 'M';
                if (value >= 1000) return (value/1000).toFixed(0) + 'k';
                return value;
              }}
            />
            <Tooltip 
              formatter={(value) => {
                return new Intl.NumberFormat('fr-FR', { 
                  style: 'currency', 
                  currency: 'XOF',
                  maximumFractionDigits: 0 
                }).format(value);
              }}
            />
            <Bar 
              dataKey={yKey} 
              fill={color} 
              radius={[4, 4, 0, 0]}
              maxBarSize={80}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default CustomBarChart;