import React, { useState } from 'react';
import Layout from '@theme/Layout';
import ImageCard from '../components/Gallery/ImageCard';
import ImageModal from '../components/Gallery/ImageModal';
import styles from './gallery.module.css';

// 图片数据
const galleryImages = [
  {
    id: 1,
    title: '神经',
    description: '丰川打底，随便糊了一下',
    image: '/img/works/WORK_2025_04_001.jpg',
    tags: ['神经', '抽象', '临摹'],
    size: '1.5 MB'
  },
  {
    id: 2,
    title: '山地车',
    description: '刷视频看到的一个小孩被自行车碾压裆部的画面，比较有张力，随意模仿了一下，抽象',
    image: '/img/works/WORK_2025_04_002.jpg',
    tags: ['虐待', '绿虫子', '抽象'],
  },
  {
    id: 3,
    title: '气球',
    description: '看到一个气球孤零零的图片，于是加了一个上吊',
    image: '/img/works/WORK_2025_04_003.jpg',
    tags: ['气球',  '动漫', '上吊'],
  },
  {
    id: 4,
    title: '捅',
    description: '发神经画的，心情不爽',
    image: '/img/works/WORK_2025_05_001.jpg',
    tags: ['捅', '血', '鬼图'],
  },
  {
    id: 5,
    title: '养老的地方',
    description: '清晨的山间，雾气缭绕，树木若隐若现',
    image: '/img/works/WORK_2025_01_001.jpg',
    tags: ['风景', '自然', '晨雾'],
  },
  {
    id: 6,
    title: '木马',
    description: '黑白色调下的旋转木马，脱离轨道',
    image: '/img/works/WORK_2025_01_002.jpg',
    tags: ['黑白', '奇怪', '旋转木马'],
  },
  {
    id: 7,
    title: '图书馆的奇怪书',
    description: '学校图书馆啥都有啊，区域艺术层',
    image: '/img/works/WORK_2025_01_003.jpg',
    tags: ['动漫', '插画', '角色'],
  },
  {
    id: 8,
    title: '抽',
    description: '找到了一个笔刷',
    image: '/img/works/WORK_2025_01_004.jpg',
    tags: ['抽象', '术', '表现'],
  },
  {
    id: 9,
    title: '废屋',
    description: '被遗弃的木质建筑内部场景，深山老林发现的，物非人非',
    image: '/img/works/WORK_2025_01_005.jpg',
    tags: ['废墟', '建筑', '纪实'],
  },
  {
    id: 10,
    title: '山间',
    description: '群山之间孤寂',
    image: '/img/works/WORK_2025_01_006.jpg',
    tags: ['风景', '自然', '云海'],
  },
  {
    id: 11,
    title: '蓝云',
    description: '感觉不错',
    image: '/img/works/WORK_2025_01_007.jpg',
    tags: ['天空', '自然', '云彩'],
  },
  {
    id: 12,
    title: '山间日升',
    description: '晖',
    image: '/img/works/WORK_2025_01_008.jpg',
    tags: ['风景', '日', '自然'],
  },
  {
    id: 13,
    title: '薄雾',
    description: '好玩',
    image: '/img/works/WORK_2025_01_009.jpg',
    tags: ['风景', '自然', '雾'],
  },
  {
    id: 14,
    title: '喜',
    description: '可爱',
    image: '/img/works/WORK_2025_01_010.jpg',
    tags: ['米塔', '夕', '然'],
  },
  {
    id: 15,
    title: '仿',
    description: '瞎，构图有问题',
    image: '/img/works/WORK_2025_05_002.png',
    tags: ['动', '物', '异'],
  },
  {
    id: 16,
    title: '眼睛',
    description: '躺',
    image: '/img/works/WORK_2025_05_003.png',
    tags: ['动漫', '人物', '海'],
  },
  {
    id: 17,
    title: '信仰已死',
    description: '课堂偷拍',
    image: '/img/works/WORK_2025_05_004.jpg',
    tags: ['偷拍', '课堂'],
  },
  {
    id: 18,
    title: '新春快乐',
    description: '春联',
    image: '/img/works/WORK_2025_02_001.jpg',
    tags: ['对联', '恶搞'],
  },  
  {
    id: 19,
    title: '猫',
    description: '奇怪',
    image: '/img/works/WORK_2025_02_002.jpg',
    tags: ['头发', '奇怪'],
  },
  {
    id: 20,
    title: '处死',
    description: 'remix',
    image: '/img/works/WORK_2025_02_004.jpg',
    tags: ['乱改', '瞎'],
  },
  {
    id: 21,
    title: '笑',
    description: '可爱捏',
    image: '/img/works/WORK_2025_02_003.jpg',
    tags: ['拍', '恶趣味'],
  },
];


const IMAGES_PER_PAGE = 6; // 每页显示6张图片

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // 计算总页数
  const totalPages = Math.ceil(galleryImages.length / IMAGES_PER_PAGE);

  // 获取当前页的图片
  const getCurrentPageImages = () => {
    const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
    const endIndex = startIndex + IMAGES_PER_PAGE;
    return galleryImages.slice(startIndex, endIndex);
  };

  // 页面切换处理
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // 滚动到页面顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout
      title="鬼图示众"
      description="个人网站的图片展示页面">
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>鬼图示众</h1>
          <p>这里展示了我平常制作的乱七八糟的东西，会使用ai进行辅助，能力水平不高，野路子。</p>
        </div>
        <div className={styles.gallery}>
          {getCurrentPageImages().map((image) => (
            <div key={image.id} className={styles.galleryItem}>
              <ImageCard
                {...image}
                onImageClick={handleImageClick}
              />
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {currentPage > 1 && (
              <button
                className={styles.pageButton}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                上一页
              </button>
            )}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`${styles.pageButton} ${pageNum === currentPage ? styles.active : ''}`}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                className={styles.pageButton}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                下一页
              </button>
            )}
          </div>
        )}
      </div>
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </Layout>
  );
} 