import OpenAI from "openai";

const openai = new OpenAI();

const runPrompt = async () => {
  const salary_amount = 50000;
  const expenses = "rent, groceries, and utilities";

  const prompt = `
    Give me some financial assistance on how to save money. My salary is ${salary_amount}. My only expenses are ${expenses}.
    Please return the advice in a parsable JSON format using the below JSON format:
    {
        "Financial Advice 1": "Your advice here for 1",
        "Financial Advice 2": "Your advice here for 2",
    }`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18", // To select the model you want to use
    messages: [
      {
        role: "system",
        content: "You are a useful Financial Assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 100, // Max tokens is 2048
    temperature: 1, // How much creativity you want AI to have. Max is 2
  });

//   const parsableJSONResponse = response.data.choice[0].text;
//   const parsedResponse = JSON.parse(parsableJSONResponse);
  console.log(response);
};

runPrompt();
