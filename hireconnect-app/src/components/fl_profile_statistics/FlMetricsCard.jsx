import { Link } from 'react-router-dom';
import '../styles/Card.css';

const FlMetricsCard = ({ title, value, link }) => (
  <Link to={link} className="card">
    <h3 className="card-title">{title}</h3>
    <p className="card-value">{value}</p>
  </Link>
);

export default FlMetricsCard;