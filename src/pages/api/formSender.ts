import type { NextApiRequest, NextApiResponse } from "next";
import type { submitType } from "src/components/sections/ApplicationForm";
import { env } from "src/env.mjs";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    data: submitType;
  };
}

const telegramBot = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const bot = env.NEXT_TELEGRAM_TOKEN;
  const { data } = req.body;

  const message = `Имя / Название организации: ${data.name} \n
  Телеграм / Скайп: ${data.telegram} \n
  Бюджет: ${data.budget} \n
  Почта: ${data.email} \n 
  Сообщение: ${data.message}
  `;

  console.log(data)

  const ret = await fetch(
    `https://api.telegram.org/bot${bot}/sendMessage?chat_id=${"1026137309"}&text=${message}&parse_mode=HTML`
  );
  res.status(200).send("OK");
  console.log(ret);
};

export default telegramBot;
