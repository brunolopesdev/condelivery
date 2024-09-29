import axios from "axios";

export const sendOrderNotification = async (id: number, mensagem: string) => {
  await axios.post(`/api/profile/notifications/create`, {
    data: new Date(),
    moradorId: id,
    mensagem: mensagem,
  });
};
