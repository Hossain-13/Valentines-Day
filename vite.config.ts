import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'your-repo-name' with your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/Valentines-Day', // Change to '/your-repo-name/' if not using a custom domain
});
