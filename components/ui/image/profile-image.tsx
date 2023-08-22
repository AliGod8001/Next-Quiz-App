import Image, { StaticImageData } from "next/image";
import Avatar from "antd/es/avatar/avatar";

const ProfileImage = ({
  src,
  userName,
  className,
  width,
  height,
  loading,
}: {
  src?: | string | null;
  userName?: string;
  className?: string;
  width: number;
  height: number;
  loading?: "eager" | "lazy";
}) => {
  return src ? (
    <Image
      className={className}
      src={src}
      width={width}
      height={height}
      loading={loading}
      alt={`${userName} profile image`}
    />
  ) : (
    <Avatar className={className}>{userName && userName[0]}</Avatar>
  );
};

export default ProfileImage;
