import React from 'react';
import { Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { colors } from '../utils/theme';

const CustomLineChart = ({ data, title, xKey, yKey, color = colors.secondary }) => {
  // Largeur dynamique : 100px par point de données minimum
  const minWidth = data ? Math.max(data.length * 100, 600) : 600;

  return (
    <Box sx={{ width: '100%', height: '100%', overflowX: 'auto' }}>
      <Box sx={{ minWidth: `${minWidth}px`, height: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart 
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
              tick={{ fontSize: 12, fontWeight: 500 }}
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
            <Line 
              type="monotone" 
              dataKey={yKey} 
              stroke={color} 
              strokeWidth={3} 
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default CustomLineChart;