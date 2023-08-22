import { decrypt } from "@/utils/decoding";
import ProfileEdit from "@/components/profile/edit/ProfileEdit";

export const metadata = {
  title: "Profile | Edit",
};

type Params = {
  userId: string
}

const ProfileEditPage = async ({
  params,
}: {
  params: Params;
}) => {
  const userId = decrypt(params.userId);

  return <ProfileEdit userId={userId} />
};

export default ProfileEditPage;
