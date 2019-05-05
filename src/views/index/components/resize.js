export default {
  data () {
    return {
      windowOffsetWidth: 0
    }
  },
  mounted () {
    window.addEventListener('resize', this._resizeChangeFont)
    this.windowOffsetWidth = document.body.offsetWidth
  },
  methods: {
    _resizeChangeFont () {
      this.windowOffsetWidth = document.body.offsetWidth
    }
  },
  computed: {
    fontSize () {
      if (this.windowOffsetWidth <= 1440) {
        return 12
      } else if (this.windowOffsetWidth > 1440 && this.windowOffsetWidth < 1600) {
        return 12
      } else {
        return 13
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this._resizeChangeFont)
  }
}
