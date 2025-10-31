import { AlertCircle, XCircle, AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Button } from './ui/button';

interface ErrorComponentProps {
  type?: 'error' | 'warning' | 'notFound' | 'forbidden' | 'serverError';
  title?: string;
  message?: string;
  details?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  showRetry?: boolean;
  showHome?: boolean;
}

const ErrorComponent = ({
  type = 'error',
  title,
  message,
  details,
  onGoHome,
  showRetry = true,
  showHome = true,
}: ErrorComponentProps) => {
  const onRetry = () => window.location.reload()
  const errorConfigs = {
    error: {
      icon: XCircle,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      title: title || 'Something Went Wrong',
      message: message || 'An unexpected error occurred. Please try again.',
    },
    warning: {
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      title: title || 'Warning',
      message: message || 'Please check your input and try again.',
    },
    notFound: {
      icon: AlertCircle,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      title: title || '404 - Page Not Found',
      message: message || "The page you're looking for doesn't exist or has been moved.",
    },
    forbidden: {
      icon: XCircle,
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      title: title || '403 - Access Forbidden',
      message: message || "You don't have permission to access this resource.",
    },
    serverError: {
      icon: AlertCircle,
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      title: title || '500 - Server Error',
      message: message || 'Our servers are experiencing issues. Please try again later.',
    },
  };

  const config = errorConfigs[type];
  const Icon = config.icon;

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <Card className={`max-w-2xl w-full ${config.borderColor} border-2`}>
        <CardHeader className={`${config.bgColor} border-b ${config.borderColor}`}>
          <div className="flex items-center gap-4">
            <div className={`${config.iconColor} bg-white rounded-full p-3`}>
              <Icon className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-2xl">{config.title}</CardTitle>
              <CardDescription className="text-base mt-1">
                {config.message}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {details && (
          <CardContent className="pt-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Details</AlertTitle>
              <AlertDescription className="mt-2">
                <code className="text-sm bg-muted p-2 rounded block overflow-x-auto">
                  {details}
                </code>
              </AlertDescription>
            </Alert>
          </CardContent>
        )}

        <CardFooter className="flex gap-3 pt-6">
          {showRetry && onRetry && (
            <Button onClick={onRetry} className="gap-2">
              <RefreshCcw className="h-4 w-4" />
              Try Again
            </Button>
          )}
          {showHome && onGoHome && (
            <Button variant="outline" onClick={onGoHome} className="gap-2">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

// Inline Error Alert (for inline errors in forms or sections)
interface InlineErrorProps {
  message: string;
  onDismiss?: () => void;
}

export const InlineError = ({ message, onDismiss }: InlineErrorProps) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>{message}</span>
        {onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-auto p-0 hover:bg-transparent"
          >
            Dismiss
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};

// Empty State Component (when no data is found)
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
      {icon && (
        <div className="mb-4 text-muted-foreground">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {action && (
        <Button onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default ErrorComponent;
