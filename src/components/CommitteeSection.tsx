import { useLanguage } from "@/contexts/LanguageContext";
import committeeMember1 from "@/assets/vijay kamat.png";
import committeeMember2 from "@/assets/committee member2.png";
import committeeMember3 from "@/assets/rajiv.png";
import committeeMember4 from "@/assets/valanju.png";
import committeeMember5 from "@/assets/SHWETA PEDNEKAR.png";
import committeeMember6 from "@/assets/VEENA GOSAVI.png";
import committeeMember7 from "@/assets/TEJAL VENGURLEKAR.png";

const CommitteeSection = () => {
  const { t } = useLanguage();
  
  const committeeMembers = [
    {
      id: 1,
      image: committeeMember1,
      name: t('committee.member1.name'),
      position: t('committee.member1.position'),
    },
    {
      id: 2,
      image: committeeMember2,
      name: t('committee.member2.name'),
      position: t('committee.member2.position'),
    },
    {
      id: 3,
      image: committeeMember3,
      name: t('committee.member3.name'),
      position: t('committee.member3.position'),
    },
    {
      id: 4,
      image: committeeMember4,
      name: t('committee.member4.name'),
      position: t('committee.member4.position'),
    },
    {
      id: 5,
      image: committeeMember5,
      name: t('committee.member5.name'),
      position: t('committee.member5.position'),
    },
  ];

  return (
    <section className="bg-card py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-foreground mb-4">
            {t('committee.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('committee.subtitle')}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6"></div>
        </div>

        {/* Committee Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {committeeMembers.map((member) => (
            <div
              key={member.id}
              className="text-center group hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="relative mb-4 mx-auto w-40 h-40 sm:w-48 sm:h-48">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                {member.position}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommitteeSection;