import { assetUrl } from "@/lib/assets";

type SubpageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  className?: string;
};

export function SubpageHero({ eyebrow, title, description, image, alt, className }: SubpageHeroProps) {
  return (
    <section className={`subpage-hero${className ? ` ${className}` : ""}`}>
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
