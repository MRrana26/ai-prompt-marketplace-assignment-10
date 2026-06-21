import AdminAnalyticsCharts from '@/components/dashboard/admin/AdminAnalyticsCharts';
import AdminAnalyticsTotalCard from '@/components/dashboard/admin/AdminAnalyticsTotalCard';
import React from 'react';

const AnalyticsHomePage = () => {
    return (
        <div>
            <AdminAnalyticsTotalCard/>
            <AdminAnalyticsCharts/>
        </div>
    );
};

export default AnalyticsHomePage;