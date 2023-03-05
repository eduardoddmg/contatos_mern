export const formatDate = (dateString) => {
	const date = dateString.slice(0, 10).split("-").reverse();
	return date[0] + '/' + date[1] + '/' + date[2];
};
