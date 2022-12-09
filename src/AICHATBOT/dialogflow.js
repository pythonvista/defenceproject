async function ChatBot(word) {
  let sessionID = Math.floor(Math.random() * 378974206843640 + 36893787392073);
//   let auths = gcloud auth print-access-token;
  try {
    const response = await fetch(
      `https://dialogflow.googleapis.com/v2/projects/eatrychatbot-axde/agent/sessions/${sessionID}:detectIntent`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer ya29.a0AeTM1iewTqQO0DJ-v0_3XPoSBzrUWuDKhsO86CaA7kelKInlSeFYasOaUVOK9NVABoLTEsXQpQuIsdasX0k2TIn730dCU3_OURQ0F5V4gAYAvs7FQ6RQq1W7NH1wv64AZSrZE1iOkugLWjqScnx7X6E26k2Ow3wwAoqIpQaCgYKAeQSARASFQHWtWOmeTgsTFHzza80H6nAdo5tJQ0173",
          "x-goog-user-project": "eatrychatbot-axde",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          query_input: {
            text: {
              text: word,
              language_code: "en-US",
            },
          },
        }),
      }
    );

    return response;
  } catch (err) {
    console.log(err);
  }
}

// console.log(Model('am hungry'))
export { ChatBot };
