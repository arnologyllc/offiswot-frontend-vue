export default {
    methods: {
        onInputBlur(field) {
            if(!this.payload[field]) {
              this.isShow[field] = false
            }
        },
        isBlured(field) {
            return this.$refs[field]?.focused
        },
    }
}