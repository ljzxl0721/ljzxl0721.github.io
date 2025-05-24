import React from 'react';
import styles from './styles.module.css';

export default function AboutMe() {
  return (
    <section className={styles.about}>
      <div className="container">
        <div className={styles.aboutInner}>
          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <img
                src="/img/logo.jpg"
                alt="Profile"
                className={styles.avatar}
              />
              <div className={styles.profileLabel}>邪怯</div>
            </div>
          </div>
          <div className={styles.contentSection}>
            <h2 className={styles.title}>Nothing to see here ╮( ˘ ､ ˘ )╭</h2>
            <div className={styles.description}>
              <p>
                这里我的个人简介，过去使用过这些名字：
                <span className={styles.highlight}>"邪怯" "暂时" "俨梓" "亖虄"</span>
                哪一个都无所谓了。
              </p>
              
              <div className={styles.infoBlock}>
                <h3>身份</h3>
                <p>流浪者，普通大学生，地理系。</p>
              </div>

              <div className={styles.infoBlock}>
                <h3>爱好</h3>
                <p>
                  看书（文哲艺理），玩音乐（编曲作曲，弹吉他），绘画（瞎糊一下），
                  玩游戏（galgame，封神的，独立游戏开发），捣鼓小玩具（big规模k性tool，地信视监）。
                </p>
              </div>

              <div className={styles.infoBlock}>
                <h3>特质</h3>
                <p>黑深残，颓废，自我否定，怠惰，忧郁，沉沦，有病。</p>
              </div>

              <div className={styles.infoBlock}>
                <h3>联系方式</h3>
                <p>
                  微信id：<span className={styles.contact}>ljzxl0721</span>
                  <br />
                  邮箱：<span className={styles.contact}>ljzxl0721@outlook.com欢迎投喂不良信息</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 