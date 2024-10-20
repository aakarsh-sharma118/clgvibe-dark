import { featureIcons } from "../constants";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FeatureIcons = ({ className }) => {
  return (
    <div className={className}>
      <h5 className="tagline mb-6 text-center text-n-1/50">
      Helping people connect and enhance learning.
      </h5>
      <ul className="flex">
      {featureIcons.map(({ icon, label }, index) => (
        <li
          className="flex flex-col items-center justify-center flex-1 h-[8.5rem]"
          key={index}
        >
          <FontAwesomeIcon icon={icon} size="2x"/>
          <span className="mt-2 text-center">{label}</span>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default FeatureIcons;
