async function ChatBot(word) {
  let sessionID = Math.floor(Math.random() * 378974206843640 + 36893787392073);
  //   let auths = gcloud auth print-access-token;
  try {
    const response = await fetch(
      `https://dialogflow.googleapis.com/v2/projects/defense-project-chatbot/agent/sessions/${sessionID}:detectIntent`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer ya29.a0AeTM1idwiYXPirM273kRcn3rGpZoYzEOK0_QF22DsY-GHTNYVnbmn8T3j0F9Zikkz174Pa6QsEyozOND6Pq67-WQ_89df9LDZWxg2HkZdcMf4TbDoOE1fK63R8wm7iGy2_6ngjOGM-mkN5vfmMY69nl___c-6eoqp5hcdAaCgYKARcSARISFQHWtWOmj5F3mxxAcVDLtIfO807rdQ0173",
          "x-goog-user-project": "defense-project-chatbot",
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
