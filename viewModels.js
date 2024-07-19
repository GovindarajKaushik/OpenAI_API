import OpenAI from "openai";

const openai = new OpenAI();




async function listModels() {
  try {
    const response = await openai.models.list();
    console.log(response.data);
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();
