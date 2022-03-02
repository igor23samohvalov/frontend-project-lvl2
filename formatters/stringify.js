export default (data) => JSON.stringify(data, null, 4).replace(/['",]+/g, '');
