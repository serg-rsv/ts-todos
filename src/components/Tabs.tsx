import React, { useState } from 'react';
import styles from '../styles/Tabs.module.css';

export interface ITab {
  title: string;
  content: React.ReactNode;
}

interface ITabsProps {
  tabs: ITab[];
  defaultActiveTab?: number;
}

const Tabs: React.FC<ITabsProps> = ({ defaultActiveTab, tabs }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || 0);

  const handleTabClick = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className={styles.tabs}>
      <ul className={styles.tabsNav}>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={activeTab === index ? styles.active : ''}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div className={styles.tabsContent}>{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
