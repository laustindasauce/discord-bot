module.exports = {
	name: 'beep',
	aliases: ['boop', 'boink'],
	description: 'Beep!',
	args: false,
	readOnly: false,
	guildOnly: false,
	permLevel: 0,
	/**
	 * This command is a simple call and response
	 * 
	 * @param {message Object} message the message Object that was sent to trigger this command
	 * @param {array} _args the rest of the message after the command
	 * @param {Redis client} _redis Redis client (our database)
	 * @param {num} _level users permission level
	 */
	postReminder: async (jsonData) => {
        try {
            axios({
                url: `${BASE_URL}/austinapi/email`,
                method: 'post',
                data: jsonData,
            })
                .then(function (response) {
                    if (response.data === "Format Error") {
                        alert("Invalid email format")
                    } else if (response.data === "Error") {
                        alert("Email username/host could not be found")
                    } else if (response.data === "Email not sent") {
                        alert("Email wasn't sent due to an error.. please try again.")
                    } else {
                        bottom_div.style.display = "none"
                        bottom2_div.style.display = "block"
                    }
                    console.log(response)
                })
                .catch(function (error) {
                    // your action on error success
                    console.log(error)
                })
        } catch (e) {
            console.error(e)
        }
    },
	test() {
		return true;
	},
};