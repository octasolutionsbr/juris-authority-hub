import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface OpportunityCardSkeletonProps {
  showImage?: boolean;
}

export const OpportunityCardSkeleton = ({ showImage = false }: OpportunityCardSkeletonProps) => {
  return (
    <Card className="overflow-hidden">
      {showImage && (
        <Skeleton className="h-48 w-full rounded-none" />
      )}
      <CardHeader>
        <div className="flex items-start gap-3">
          <Skeleton className="w-6 h-6 rounded" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-10" />
        </div>
      </CardContent>
    </Card>
  );
};