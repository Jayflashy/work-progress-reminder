import { Request, Response } from "express";
import reminderMessages from "../data/reminderMessages.json";
import TelexService from "../services/telexService";

class ReminderController {
  // get random reminder message
  private static getRandomMessage(): string {
    const messages = reminderMessages.messages;
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex].message;
  }
  // send reminder message to telex channel
  public static async sendReminder(req: Request, res: Response) {
    try {
      // get reminder message
      const reminderMessage = ReminderController.getRandomMessage();
      // send to telex channel
      const telexResponse = await TelexService.sendMessage(reminderMessage);
      // send response to client
      res.json({ status: "success", message: reminderMessage, telexResponse });
    } catch (error: any) {
      console.error("Error sending reminder:", error.message);
      res.status(500).json({ status: "error", message: error.message });
    }
  }
}

export default ReminderController;
