'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';
import InputField from './input-field';

const PersonalWebCard = () => {
  const { control } = useFormContext();

  return (
    <Card className="border border-gray-200 shadow-none rounded-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Personal Web & Digital Presence
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-4">
        <InputField
          control={control}
          name="personalWebsite"
          label="Personal Website"
          placeholder="Enter personal website URL"
        />
        <InputField
          control={control}
          name="portfolio"
          label="Portfolio"
          placeholder="Enter portfolio URL"
        />
        <InputField
          control={control}
          name="blog"
          label="Blog"
          placeholder="Enter blog URL"
        />
        <InputField
          control={control}
          name="onlineResume"
          label="Online Resume"
          placeholder="Enter online resume URL"
        />
        <InputField
          control={control}
          name="linktree"
          label="Linktree / Beacons / Lnk.bio"
          placeholder="Enter Linktree / Beacons / Lnk.bio URL"
        />
        <InputField
          control={control}
          name="publicNotion"
          label="Public Notion Page"
          placeholder="Enter public Notion page URL"
        />
      </CardContent>
    </Card>
  );
};

export default PersonalWebCard;
