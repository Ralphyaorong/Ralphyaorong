import { assetUrl } from "@/lib/assets";

type SubpageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export function SubpageHero({ eyebrow, title, description, image, alt }: SubpageHeroProps) {
  return (
    <section className="subpage-hero">
      <img src={assetUrl(image)} alt={alt} loading="eager" fetchPriority="high" decoding="sync" />
      <div className="subpage-hero__shade" aria-hidden="true" />
      <div className="subpage-hero__content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
