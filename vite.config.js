import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//import eslint from "vite-plugin-eslint";
// https://vitejs.dev/config/
import vitePluginSvgr from 'vite-plugin-svgr';
export default defineConfig({
  plugins: [react(),vitePluginSvgr()],
})
