import OpenAI from "openai";
import express from "express";
const app = express();
app.use(express.json());
// const express = require("express");
// const app=express();

// app.use(express.json());

const openai = new OpenAI();

const runPrompt = async (prompt, salary, expenses) => {


  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini-2024-07-18", // To select the model you want to use
    messages: [
      {
        role: "system",
        content: "You are a useful Financial Assistant. If you receive any prompts that are not related to personal finance please reply saying Please prompt me based on personal finance",
      },
      {
        role: "system",
        content: `Please make use of the Users details that you are giving financial assistance to. Their Salary ${salary}, expenses: ${expenses}`
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
return response
};



app.get('/getFinancial_Assistance', async (req, res) => {
  const salary = req.body.salary;
  const expenses = req.body.expenses;
  const userPrompt = req.body.prompt;

  const api_response = await runPrompt(userPrompt, salary, expenses); // calling OpenAI API

  console.log(api_response.choices[0].message);
  res.send(api_response.choices[0].message);


});


app.listen(3000, () => {

  console.log("server started...")

})





