import typescript from 'rollup-plugin-typescript'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: ['src/main.ts'],
  output: [
    {
      dir: 'dist',
      format: 'esm',
    }
  ],
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
  ],
  manualChunks(id) {
    if (id.includes('node_modules')) {
      if (id.includes('rxjs')) return 'rxjs'

      return 'vendor'
    }
  },
}
