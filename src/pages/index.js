import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';
import BackgroundEffect from '../components/BackgroundEffect';
import AboutMe from '../components/AboutMe';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

function FeatureCard({title, description, link, icon}) {
  return (
    <div className={clsx('col col--6', styles.featureCard)}>
      <Link to={link} className={styles.featureLink}>
        <div className="card">
          <div className="card__header">
            <h3>
              {icon && <i className={`fas ${icon} ${styles.featureIcon}`}></i>}
              {title}
            </h3>
          </div>
          <div className="card__body">
            <p>{description}</p>
          </div>
          <div className={styles.cardFooter}>
            <span className={styles.readMore}>
              探索 <i className="fas fa-arrow-right"></i>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="分">
      <BackgroundEffect />
      <HomepageHeader />
      <main>
        <AboutMe />
        <div className={styles.featuresContainer}>
          <div className="container">
            <div className="row">
              <div className="col col--12">
                <h2 className={styles.sectionTitle}>可有板块</h2>
                <p className={styles.sectionDescription}>
                  请随意
                </p>
              </div>
            </div>
            <div className={styles.featuresGrid}>
              <FeatureCard
                title="文段符号"
                description="随便放一点奇形怪状的东西，可能是一些想法、笔记或者其他任何有趣的内容。"
                link="/docs/intro"
                icon="fa-book"
              />
              <FeatureCard
                title="鬼图示众"
                description="一些乱改的绘图和摄影内容，包含各种风格的作品，有些可能比较诡异或抽象。"
                link="/gallery"
                icon="fa-images"
              />
              <FeatureCard
                title="人工智障"
                description="接入了廉价LLM进行角色扮演对话，可以和AI进行一些有趣的交互，但请手下留情。"
                link="/chat"
                icon="fa-robot"
              />
              <FeatureCard
                title="散笔胡言"
                description="碎片化、无结构的记录，可能包含日常思考、感悟或者任何值得记录的片段。"
                link="/blog"
                icon="fa-pen-fancy"
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
