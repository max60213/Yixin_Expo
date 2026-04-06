"use client";

import "./about.css";
import InfoItem from "./InfoItem";
import SectionHeader from "@/app/components/SectionHeader";
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

interface AboutProps {
  className?: string;
  id?: string;
  content: BlocksContent;
}

export default function About({ className, id, content }: AboutProps) {
  return (
    <section className={`about ${className}`} id={id}>
      <SectionHeader title="關於" />
      <div className="about__content">
        <div className="about__content__description block-renderer">
          <BlocksRenderer content={content} />
        </div>
        <div className="about__content__info">
          <InfoItem label="官網" value="https://yixin.art" type="link" />
          <InfoItem label="電話" value="0987654321" type="phone" />
          <InfoItem label="信箱" value="support@yixin.art" type="mail" />
          <InfoItem label="位置" value="桃園市桃園區安東街 1 號" type="address" />
          <InfoItem label="負責人" value="負責人 先生" type="name" />
        </div>
      </div>

    </section >
  );
}

