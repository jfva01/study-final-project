// This file contains the URL configuration for the project. 
// It checks the environment variable NODE_ENV to determine 
// whether the application is running in production or development 
// mode. Based on this, it sets the appropriate URL for the application.

export const url = process.env.NODE_ENV === 'production' ? 'https://study-final-project.vercel.app/' : 'http://localhost:5173/';