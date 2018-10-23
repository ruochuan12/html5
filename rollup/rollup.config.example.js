// rollup.config.js
// rollup中文官网链接：https://rollupjs.org/guide/zh#-overview-
export default {
    // 核心选项
    input,     // 必须
    external,
    plugins,
  
    // 额外选项
    onwarn,
  
    // danger zone
    acorn,
    context,
    moduleContext,
    legacy
  
    output: {  // 必须 (如果要输出多个，可以是一个数组)
      // 核心选项
      file,    // 必须
      format,  // 必须
      name,
      globals,
  
      // 额外选项
      paths,
      banner,
      footer,
      intro,
      outro,
      sourcemap,
      sourcemapFile,
      interop,
  
      // 高危选项
      exports,
      amd,
      indent
      strict
    },
};