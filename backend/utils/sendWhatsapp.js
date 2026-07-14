import axios from 'axios'

export const sendWtsp = async (recepient, message) => {
  try {
    const response = await axios.post('http://api.textmebot.com/send.php', {
      recipient: recepient,
      apikey: 'E2tf7r47y9au', // Your active TextMeBot API Key
      text: message
    })
    return response
  } catch (err) {
    console.error("WhatsApp Send Error:", err)
  }
}
