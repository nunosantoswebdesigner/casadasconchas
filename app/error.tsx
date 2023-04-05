'use client';

import { useEffect } from "react";
import EmptyState from "@/app/components/EmptyState";

interface ErrorStateProps { error: Error }

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => { console.error(error); }, [error]);
  return ( 
    <EmptyState title="Uppsy!! Alguma coisa correu mal!" subtitle="Por favor recarregue a página ou volte mais tarde." />
  );
}
 
export default ErrorState;
