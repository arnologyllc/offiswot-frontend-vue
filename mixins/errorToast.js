export default {
    methods: {
        showError(v) {
            if (typeof v !== 'string') {
                for (const i in v) {
                    if (typeof v[i] !== 'string') {
                        for (const j in v[i]) {
                            this.$notify.error({
                                title: 'Error',
                                dangerouslyUseHTMLString: true,
                                message: `${i}: ${v[i][j]}`,
                            })
                        }
                    } else {
                        this.$notify.error({
                            title: 'Error',
                            message: v[i],
                        })
                    }
                }
            } else {
                this.$notify.error({
                    title: 'Error',
                    message: v,
                })
            }
        }
    }
}