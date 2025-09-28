import Title from "@/components/Main/Title";
import { heroData } from "@/utils/data";
import TrendyCard from "./TrendyCard";

const TrendyPlants = () => {
  return (
    <div className="py-28 space-y-20">
      <Title
        fancy
        wrapperClassName="text-center"
        contentClassName="text-center text-3xl md:text-4xl lg:text-5xl text-white font-semibold"
      >
        Our Trendy plants
      </Title>

      <div className="space-y-16">
        {heroData.trendyPlants.map((plant) => (
          <TrendyCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};

export default TrendyPlants;
