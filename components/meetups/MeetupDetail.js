import styles from "./MeetupDetail.module.css";
import Card from "../ui/Card";

const MeetupDetail = (props) => {
  return (
    <Card>
      <section className={styles.detail}>
        <img src={props.image} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </Card>
  );
};

export default MeetupDetail;
