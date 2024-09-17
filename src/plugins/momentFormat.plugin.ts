import moment from "moment";



export const formatDate = (date: string | null, formatType: string) => {
    if ( date === undefined || date === null ) return 'sin fecha';
    if (formatType === '' ) return date;


    return moment(date).format(formatType) as string
}