"use client";
import { ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
  title: string;
}

export default function BaseLayout({ children, title }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-gray-800 text-white py-4 shadow">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
      </header>
      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
