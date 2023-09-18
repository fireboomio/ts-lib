const typescript = require('@rollup/plugin-typescript')
const terser = require('@rollup/plugin-terser')

module.exports = {
  input: 'src/umd.ts',
  output: {
    file: 'umd/index.umd.min.js',
    format: 'umd',
    name: 'FBClient',
    sourcemap: false
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.umd.json'
    }),
    terser()
  ]
}
