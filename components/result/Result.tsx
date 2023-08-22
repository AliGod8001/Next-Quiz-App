import Title from "@/components/ui/title/Title";
import ProfileLastResultList from "@/components/profile/last-result/ProfileLastResultList";


const Result = () => {
  return (
    <>
      <Title href="/profile" linkText="Back">
        Question Answerd Result
      </Title>
      <ProfileLastResultList full />
    </>
  );
};

export default Result;
