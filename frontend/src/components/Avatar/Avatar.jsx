import { UserIcon } from "../../lib/icons";

const Avatar = ({ className = "", src = "", alt = "" }) => {
    return src ? (
        <img src={src} alt={alt} className={className} />
    ) : (
        <UserIcon className={className} />
    );
};

export default Avatar;
