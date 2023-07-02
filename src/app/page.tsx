import HomeBanner from "@/components/HomeBanner";
import HomePromotion from "@/components/HomePromotion";
import HomeSlider from "@/components/HomeSlider";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <HomePromotion />
      {/* @ts-ignore  */}
      <HomeSlider />
    </div>
  );
};

export default Home;
