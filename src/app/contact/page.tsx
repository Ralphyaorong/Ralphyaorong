import { site } from "@/config/site";
import { assetUrl } from "@/lib/assets";
export const metadata = { title: "联系" };
export default function ContactPage() { const complete = Boolean(site.email || site.wechatQrPath); return <section className="contact-page"><p className="eyebrow">CONTACT</p><h1>联系我</h1><p>如需查看更多作品、沟通合作，或进一步了解 AI 工作流案例，可以通过邮箱或微信联系我。</p>{complete ? <div className="contact-details">{site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}{site.wechatQrPath && <img src={assetUrl(site.wechatQrPath)} alt="微信二维码" />}</div> : <div className="contact-pending"><span>CONTACT STATUS</span><h2>联系方式待补充</h2><p>真实邮箱和微信二维码将在确认后展示。</p></div>}</section>; }
