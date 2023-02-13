export function formatDate(date : Date){
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    let firstDate = date.toISOString().split('T')[0];
    let firstDateParts = firstDate.split('-');

    return (firstDateParts[2] + "/" + firstDateParts[1] + "/" + firstDateParts[0]);
}

export function formatDateTime(date : Date){
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - (offset * 60 * 1000));
    let firstDate = date.toISOString().split('T')[0];
    let firstDateParts = firstDate.split('-');

    let secondDate = date.toISOString().split('T')[1];
    let secondDateTime = secondDate.split('.')[0];

    return (firstDateParts[2] + "/" + firstDateParts[1] + "/" + firstDateParts[0]) + ' ' + secondDateTime;
}