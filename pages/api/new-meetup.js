// /api/new-meetup
// server side code
import { insertMeetup } from "../../lib/db-util";

/**
 * @swagger
 * /api/new-meetup:
 *   post:
 *     summary: Create a new Meetup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              title:
 *                type: string
 *                description: The meetup's title.
 *                example: first Meetup
 *              image:
 *                type: string
 *                description: The meetup's image link.
 *                example: https://source.unsplash.com/1zkHXas1GIo
 *              address:
 *                type: string
 *                description: The meetup's address.
 *                example: Some address 5, 12345 Some City
 *              description:
 *                type: string
 *                description: The meetup's description.
 *                example: This is a first meetup
 *
 *     responses:
 *       201:
 *         description: Meetup created
 *       422:
 *         description: Invalid input
 *       500:
 *         description: Storing meetup failed
 */
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
