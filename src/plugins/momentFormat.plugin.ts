import moment from "moment";



export const formatDate = (date: Date, formatType: string) => {
    if ( date === undefined || date === null ) return 'sin fecha';
    if (formatType === '' ) return date;


    return moment(date).format(formatType)
}