import MeetupDetail from "@/components/meetups/MeetupDetail";
import { getMeetup, getMeetups } from "@/lib/db-util";
import { ObjectId } from "mongodb";
import Head from "next/head";

const MeetupDetailPage = (props) => {
  const { meetupData: meetup } = props;

  /*
  // fallback handler ( in case of 'fallback: true' in export async function getStaticPaths()
  if (!meetup) {
    return <p>Loading...</p>;
  }
  /* */

  return (
    <>
      <Head>
        <title>{meetup.title}</title>
        <meta name="description" content={meetup.description} />
      </Head>
      <MeetupDetail
        image={meetup.image}
        title={meetup.title}
        address={meetup.address}
        description={meetup.description}
      />
    </>
  );
};

export async function getStaticProps(context) {
  const { meetupId } = context.params;

  // fetch data
  // console.log(`get data for meetupId=${meetupId}`); // console.log on server side

  let meetupData = await getMeetup({ _id: new ObjectId(meetupId) });
  // console.log(meetupData);

  return {
    props: {
      /*
      meetupData: {
        image: "https://source.unsplash.com/1zkHXas1GIo",
        title: "first Meetup",
        address: "Some address 5, 12345 Some City",
        description: "This is a first meetup",
      },
     */
      meetupData,
    },
    revalidate: 3600, // regenerate 'every' hour
  };
}

export async function getStaticPaths() {
  /* const paths = [ { params: { meetupId: "m1" } }, { params: { meetupId: "m2" } }, ];  */
  // const meetups = [{ id: "m1" }, { id: "m2" }];
  const meetups = await getMeetups({}, { _id: 1 });
  // console.log(meetups);
  const paths = meetups.map((meetup) => `/${meetup.id}`);

  return { paths, fallback: false };
  // fallback: false,       // if an id is missing (p3, p4) it will forward to the 404 page
  // fallback: true,        // if an id is missing the page will be generated just in time, /!\ we need the fallback handler on client side
  // fallback: "blocking",  // nextjs wait for the page to be pre-generated on the server before server it
}

export default MeetupDetailPage;
