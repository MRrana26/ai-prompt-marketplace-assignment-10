"use client";

import CreatorAnalyticsCharts from '@/components/dashboard/creator/CreatorAnalyticsCharts';
import CreatorAnalyticsTotalCard from '@/components/dashboard/creator/CreatorAnalyticsTotalCard';
import { getCreatorPrompts } from '@/lib/api/prompts';
import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';

const CreatorHomePage = () => {
  const [prompts, setPrompts] = useState([]);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const loadPrompts = async () => {
      if (isPending) return;
      const creatorEmail = user?.email;
      if (creatorEmail) {
        const data = await getCreatorPrompts(creatorEmail);
        setPrompts(data);
      }
    };
    loadPrompts();
  }, [user, isPending]);

  const totalCopies = prompts.reduce((sum, p) => sum + (p.copyCount || 0), 0);

  return (
    <div>
      <CreatorAnalyticsTotalCard
        promptsCount={prompts.length}
        copiesCount={totalCopies}
        bookmarksCount={0}
      />
      <CreatorAnalyticsCharts  prompts={prompts} />
    </div>
  );
};

export default CreatorHomePage;