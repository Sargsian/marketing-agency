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

  console.log("req", req.body);

  const message = `
Имя / Название организации: ${data.name} %0A
Телеграм / Скайп: ${data.telegram} %0A
Бюджет: ${data.budget} %0A
Почта: ${data.email} %0A
Сообщение: ${data.message}
  `;

  const ret = await fetch(
    `https://api.telegram.org/bot${bot}/sendMessage?chat_id=${"1026137309"}&text=${message}&parse_mode=HTML`
  );

  if (ret.status === 200) {
    return res.redirect("/success");
  }
};

export default telegramBot;
