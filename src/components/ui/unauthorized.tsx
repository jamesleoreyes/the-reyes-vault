import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from './card';
import Link from "next/link";
import { Button } from "./button";
import { PATHS } from "@/lib/paths";

export function Unauthorized() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Unauthorized</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            You do not have the necessary permissions to view this page.
          </p>
          <Button asChild>
            <Link href={PATHS.DASHBOARD}>Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};