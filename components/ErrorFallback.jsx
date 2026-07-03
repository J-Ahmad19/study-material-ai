import React from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ErrorFallback = ({ error, resetError, title = "Something went wrong" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/5 p-4">
      <div className="rounded-2xl border border-border bg-card p-8 max-w-md w-full text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-16 h-16 text-destructive" />
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        
        <p className="text-muted-foreground mb-4">
          {error?.message || "An unexpected error occurred. Please try again."}
        </p>
        
        {error?.details && (
          <div className="bg-muted/50 rounded-lg p-3 mb-6 text-sm text-muted-foreground text-left overflow-auto max-h-32">
            <p className="font-mono">{error.details}</p>
          </div>
        )}
        
        <Button 
          onClick={resetError}
          className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  )
}

export default ErrorFallback
