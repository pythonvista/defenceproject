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
            "Bearer ya29.a0AeTM1idrvqp-FDFT7id3jdJFg-yhTzkW19QbW498wTHLT5ChDmH7MQsXoZLImVqX-A_loecoAJ47gfnnFEfTu8qY3ej6M38EN6vniFPXaVpNkqC20gaaN6RRbehRC6Oonc9muFIZmhCOBAIeHs_KaFqmcu9aMXEuYphaaCgYKAUUSARASFQHWtWOm8QrjglB0861Q9x9KWFL4Xg0171",
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
