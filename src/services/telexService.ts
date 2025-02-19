import axios, { AxiosResponse } from "axios";
import { TelexResponse } from "../types";

class TelexService {
  /**
   * Send a message to the Telex channel
   * @param message - The message to send
   * @returns The response from the Telex channel
   */
  static async sendMessage(message: string): Promise<TelexResponse> {
    const channelId = process.env.TELEX_CHANNEL_ID;
    const baseUrl = process.env.TELEX_BASE_URL;
    try {
      const url = `${baseUrl}/webhooks/${channelId}`;
      const response: AxiosResponse<TelexResponse> = await axios.post(url, {
        event_name: "Progress Reminder",
        message,
        status: "success",
        username: "Jay Flash",
      });
      console.log("Successfuly sent message to Telex channel");
      return response.data;
    } catch (error: any) {
      console.error("Error sending message to Telex channel:", error.message);
      throw new Error(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
}

export default TelexService;
