import CreatorAnalyticsCharts from '@/components/dashboard/creator/CreatorAnalyticsCharts';
import CreatorAnalyticsTotalCard from '@/components/dashboard/creator/CreatorAnalyticsTotalCard';
import React from 'react';

const CreatorHomePage = () => {
    return (
        <div>
            <CreatorAnalyticsTotalCard/>
            <CreatorAnalyticsCharts/>
        </div>
    );
};

export default CreatorHomePage;