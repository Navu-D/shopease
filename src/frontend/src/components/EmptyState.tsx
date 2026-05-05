import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-16 px-4 text-center"
      data-ocid="empty_state"
    >
      <div className="rounded-full bg-muted p-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <h3 className="font-display text-lg font-semibold text-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground max-w-xs">{description}</p>
      </div>
      {action && (
        <Button onClick={action.onClick} data-ocid="empty_state_button">
          {action.label}
        </Button>
      )}
    </div>
  );
}
