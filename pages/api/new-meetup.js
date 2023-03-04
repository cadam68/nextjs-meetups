// /api/new-meetup
import { insertMeetup } from "@/lib/db-util";

// server side code
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, image, address, description } = req.body;
    let meetupData = { title, image, address, description };

    // validate
    if (!title || !image || !address || !description) {
      res.status(422).json({ message: "Invalid input." });
      return; // <---
    }

    try {
      meetupData = await insertMeetup(meetupData);
      res.status(201).json({ message: "Meetup inserted!", meetupData });
    } catch (error) {
      res.status(500).json({ message: "Storing meetup failed!" });
    }
  } else {
    res.status(405);
  }
}
