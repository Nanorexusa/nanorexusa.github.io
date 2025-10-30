import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // [MODIFIED] GitHub Pages 배포를 위한 base 경로 추가
  // 'YOUR-REPOSITORY-NAME'을 실제 GitHub 저장소 이름으로 바꿔주세요.
  base: 'SleepyShrimpy.github.io', 
  plugins: [react()],
})
