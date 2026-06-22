"use client";

import AdminAnalyticsCharts from '@/components/dashboard/admin/AdminAnalyticsCharts';
import AdminAnalyticsTotalCard from '@/components/dashboard/admin/AdminAnalyticsTotalCard';
import { getAdminStats } from '@/lib/api/admin';
import React, { useEffect, useState } from 'react';

const AnalyticsHomePage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      const data = await getAdminStats();
      setStats(data);
    };
    loadStats();
  }, []);

  return (
    <div>
      <AdminAnalyticsTotalCard stats={stats} />
      <AdminAnalyticsCharts stats={stats} />
    </div>
  );
};

export default AnalyticsHomePage;