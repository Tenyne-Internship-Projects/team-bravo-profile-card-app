import { Link } from 'react-router-dom';
const Card = ({ title, value, link }) => (
  <Link
    to={link}
    className="bg-white shadow-[0_10px_10px_rgba(0,0,0,0.4)] rounded-xl p-8 w-full sm:w-[48%] lg:w-[45%] text-center hover:shadow-lg transition-shadow duration-200"
  >
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-2xl font-bold text-[#4d0892]">{value}</p>
  </Link>
);

export default Card;