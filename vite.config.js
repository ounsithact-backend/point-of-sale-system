// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
// })

// export default defineConfig({
//   // ...other config...
//   server: {
//     watch: {
//       // Use polling if your FS watcher is unreliable
//       usePolling: true,
//       interval: 100,
//     },
//   },
// });
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      // ប្រើ polling ប្រសិនបើ file system watcher របស់អ្នកមិនទៀងទាត់
      usePolling: true,
      interval: 100,
    },
  },
})