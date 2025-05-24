'use client';

import { useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.back()} 
      className="mb-4 px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700"
    >
      ← Back
    </button>
  );
}