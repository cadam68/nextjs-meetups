import { MongoClient } from "mongodb";

const connectDatabase = async () => {
  const url = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.krpq2cg.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(url);
  return client;
};

const insertDocument = async (client, collection, document) => {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
};

const getFilteredDocuments = async (
  client,
  collection,
  filter,
  projection,
  sort
) => {
  const db = client.db();
  const documents = await db
    .collection(collection)
    .find(filter)
    .project(projection)
    .sort(sort)
    .toArray();
  // console.log('getFilteredDocuments', projection, documents);
  return documents;
};

const getFilteredDocument = async (client, collection, filter, projection) => {
  const db = client.db();
  const document = await db.collection(collection).findOne(filter, projection);
  // console.log('getFilteredDocument', projection, document);
  return document;
};

// --------------------------------------

export const insertMeetup = async (meetupData) => {
  let client;

  try {
    client = await connectDatabase();
    const db = client.db();
    const result = await db.collection("meetups").insertOne(meetupData);
    meetupData.id = result.insertedId;
  } catch (error) {
    console.log(`insert new meetup fails due to : ${error.message}`);
    throw new Error("insert meetup fails");
  } finally {
    await client.close();
  }

  return meetupData;
};

export const getMeetups = async (filter, projection) => {
  let client;
  let meetupsData = [];

  try {
    client = await connectDatabase();
    const db = client.db();
    meetupsData = (
      await getFilteredDocuments(client, "meetups", filter, projection, null)
    ).map((item) => {
      let meetupData = { ...item, id: item._id.toString() }; // ObjectId restoredObjectId = new ObjectId(stringValue);
      delete meetupData._id;
      return meetupData;
    });
  } catch (error) {
    console.log(`loading meetups fails due to ${error.message}`);
  } finally {
    await client.close();
  }

  return meetupsData;
};

export const getMeetup = async (filter, projection) => {
  let client;
  let meetupData;

  try {
    client = await connectDatabase();
    const db = client.db();
    meetupData = await getFilteredDocument(
      client,
      "meetups",
      filter,
      projection
    );
    meetupData.id = meetupData._id.toString();
    delete meetupData._id;
    // console.log("getMeetup", meetupData);
  } catch (error) {
    console.log(`loading meetups fails due to ${error.message}`);
  } finally {
    await client.close();
  }

  return meetupData;
};
