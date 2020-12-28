module.exports = {
	name: 'correctFormat',
	description: 'Checks arguments after ![command] to see if there is a tagged member',
	/**
	 * This command is a simple call and response
	 * 
	 * @param {string} date argument directly after command with potential tagged member
     * 
     * @return {string} Reason the date wasn't formatted correctly
	 */
	execute(date) {
        let arr = date.split('/');
        if (!arr.length === 5) return 'Missing parameter.';
        if (arr[0] > 5 || arr[0] < 0) return 'Year must be \`00 < yy < 06\`';
        if (arr[1] > 11 || arr[1] < 0) return 'Month must be \`00 < mm < 12\`';
        if (arr[2] > 30 || arr[2] < 0) return 'Day must be \`00 < dd < 31\`';
        if (arr[3] > 23 || arr[3] < 0) return 'Hour must be \`00 < hh < 24\`';
        if (arr[4] > 59 || arr[4] < 0) return 'Minute must be \`00 < mm < 60\`';
        return 'Passing';
	},
	test() {
		return true;
	},
};