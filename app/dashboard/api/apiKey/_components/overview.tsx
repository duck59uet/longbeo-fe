'use client';

import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { genApiKey, getInfo } from '@/services/myaccount';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function OverViewPage() {
 
  const [apiInfo, setApiInfo] = useState<any>(null);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    getInfo()
      .then((res) => {
        console.log(res.Data.apiKey);
        setApiInfo(res.Data.apiKey);
        setUserId(res.Data.id);
      })
      .catch((error) => {
        toast.error('Failed to load API key');
      });
  }, []);

  const genApiKeyFunc = async () => {
    try {
      // Replace with actual API call logic
      await genApiKey();
      window.location.reload();
    } catch (error) {
      console.error('Failed to generate API key', error);
    }
  };

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>API Key</CardTitle>
            </CardHeader>
            <CardContent>
              {status === 'loading' ? (
                <p>Loading...</p>
              ) : apiInfo ? (
                <p className="text-sm font-mono break-all bg-gray-100 p-2 rounded">
                  {apiInfo}
                </p>
              ) : (
                <Button onClick={() => genApiKeyFunc()}>
                  Generate API Key: https://api.dichvumat.com/api/v2
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
