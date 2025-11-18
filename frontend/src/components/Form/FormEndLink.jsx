import { Link } from 'react-router-dom';

const FormEndLink = ({ to = '', text = '', title = 'link' }) => {
  return (
    <div className="text-center">
      <p className="text-base-content/60">
        {text}{' '}
        <Link to={to} className="link link-primary">
          {title}
        </Link>
      </p>
    </div>
  );
};

export default FormEndLink;
