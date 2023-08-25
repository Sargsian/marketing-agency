import type { NextApiRequest, NextApiResponse } from "next";
import { type submitType } from "src/components/sections/ApplicationForm/Form";
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

  const message = `
  Имя / Название организации: ${data.name} %0A
  Телеграм / Скайп: ${data.telegram} %0A
  Бюджет: ${data.budget} %0A
  Почта: ${data.email} %0A
  Сообщение: ${data.message}
    `;

  const ret = await fetch(
    `https://api.telegram.org/bot${bot}/sendMessage?chat_id=${"6644910426"}&text=${message}&parse_mode=HTML`
  );

  if (ret.status === 200) {
    return res.send(200);
  }
};

export default telegramBot;
