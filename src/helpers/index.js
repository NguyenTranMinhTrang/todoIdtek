export const formatDate = (date) => {
    let tempDate = new Date(date);
    return tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
}