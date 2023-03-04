import MeetupList from "@/components/meetups/MeetupList";
import { getMeetups } from "@/lib/db-util";
import Head from "next/head";

/*
const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "first Meetup",
    image: "https://source.unsplash.com/1zkHXas1GIo",
    address: "Some address 5, 12345 Some City",
    description: "This is a first meetup",
  },
  {
    id: "m2",
    title: "second Meetup",
    image: "https://source.unsplash.com/XnIWbaujHec",
    address: "Some address 6, 12345 Some City",
    description: "This is a second meetup",
  },
];
/* */

const HomePage = (props) => {
  /*
  // PB : The pre-rendering html page generated by nextjs take the result from the first render cycle : initially empty [] !!!
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  useEffect(() => {
    // send a http request and fetch data
    setLoadedMeetups(DUMMY_MEETUPS);
  }, []);
  */

  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      {/* <MeetupList meetups={loadedMeetups} /> */}
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// Static generation
export async function getStaticProps() {
  // console.log("regenerate props...");

  let meetupsData = await getMeetups({}, { description: 0 });

  return {
    props: {
      // meetups: DUMMY_MEETUPS,
      meetups: meetupsData,
    },
    revalidate: 60,
  };
}

/*
// Server-Side generation
export async function getServerSideProps(context) {
  const req = context.req; // for authentication : req.header ...
  const res = context.res;

  // fetch data from an api
  console.log("regenerate props...");
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}
/* */

export default HomePage;