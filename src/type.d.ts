declare module 'vuex' {
  export * from 'vuex/types/index.d.ts'
  export * from 'vuex/types/helpers.d.ts'
  export * from 'vuex/types/logger.d.ts'
  export * from 'vuex/types/vue.d.ts'
}

declare module 'vue-html2canvas' {
  import { Plugin } from 'vue'

  declare const VueHtml2Canvas: Plugin<[]>

  export default VueHtml2Canvas
}

declare module 'k-progress-v3' {
  import { Component } from 'vue'

  declare const KProgress = Component
  export default KProgress
}
