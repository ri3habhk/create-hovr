/**
 * Environment-aware error logger
 * Only logs detailed errors in development to prevent information disclosure in production
 */
const logError = (context: string, error: any) => {
  // Only log detailed errors in development
  if (import.meta.env.DEV) {
    console.error(`[${context}]`, error);
  }
  
  // In production, errors are silently ignored or can be sent to error tracking
  // if (import.meta.env.PROD) {
  //   // Send to error tracking service (e.g., Sentry)
  //   sendToErrorTracking(context, error);
  // }
};

export default logError;
