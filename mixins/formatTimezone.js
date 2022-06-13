import moment from "moment"
export default {
    methods: {
        formatTimezone(time) {
            const date = new Date(`${moment(time).format('YYYY-MM-DD HH:mm:ss')} ${localStorage.getItem('timezone')}`)
            return date 
        },
    }
}