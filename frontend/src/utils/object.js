export const deleteItem = (props, obj) => {
	const newArr = obj.map((props, ...rest) => rest);
	return newArr;
};