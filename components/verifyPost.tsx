"use client";
import { useState } from "react";
import { toast } from '@/hooks/use-toast';
const api = process.env.NEXT_PUBLIC_API_URL;
type VerificationButtonProps = {
  postId: string;
  token: string;
};

export function VerificationButton({ postId, token }: VerificationButtonProps) {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const res = await fetch(`${api}/story/verify/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await res.json();
      if (response.success) {
        toast({
            title: "Verification",
            description: response.message,
            variant: "default",
        });
      } else {
        toast({
            title: "Verification",
            description: response.message,
            variant: "destructive",
        });
      }
    } catch (error) {
        toast({
            title: "Verification",
            description: "Failed to verify post",
            variant: "destructive",
        });
    } finally {
      setIsVerifying(false);

    }
  };

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4">
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded"
        onClick={handleVerify}
        disabled={isVerifying}
      >
        {isVerifying ? "Verifying..." : "Click here to verify"}
      </button>
    </div>
  );
}

