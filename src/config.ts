// Configuration helper to manage environment variables

export interface AppConfig {
  viam: {
    serviceHost: string;
    authEntity: string;
    apiKey: string;
    organizationId: string;
    pipelineId: string;
  };
  app: {
    name: string;
    version: string;
  };
  isDevelopment: boolean;
  isProduction: boolean;
}

// Validate required environment variables
function validateEnvVar(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Create configuration object from environment variables
export const config: AppConfig = {
  viam: {
    serviceHost: validateEnvVar(
      "VITE_VIAM_SERVICE_HOST",
      import.meta.env.VITE_VIAM_SERVICE_HOST
    ),
    authEntity: validateEnvVar(
      "VITE_VIAM_AUTH_ENTITY",
      import.meta.env.VITE_VIAM_AUTH_ENTITY
    ),
    apiKey: validateEnvVar(
      "VITE_VIAM_API_KEY",
      import.meta.env.VITE_VIAM_API_KEY
    ),
    organizationId: validateEnvVar(
      "VITE_VIAM_ORGANIZATION_ID",
      import.meta.env.VITE_VIAM_ORGANIZATION_ID
    ),
    pipelineId: validateEnvVar(
      "VITE_VIAM_PIPELINE_ID",
      import.meta.env.VITE_VIAM_PIPELINE_ID
    ),
  },
  app: {
    name: import.meta.env.VITE_APP_NAME || "Phillies Web App",
    version: import.meta.env.VITE_APP_VERSION || "1.0.0",
  },
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Helper function to log configuration (without sensitive data)
export function logConfig(): void {
  if (config.isDevelopment) {
    console.log("App Configuration:", {
      app: config.app,
      viam: {
        serviceHost: config.viam.serviceHost,
        organizationId: config.viam.organizationId,
        pipelineId: config.viam.pipelineId,
        // Don't log sensitive data
        authEntity: config.viam.authEntity ? "[SET]" : "[MISSING]",
        apiKey: config.viam.apiKey ? "[SET]" : "[MISSING]",
      },
      isDevelopment: config.isDevelopment,
      isProduction: config.isProduction,
    });
  }
}
