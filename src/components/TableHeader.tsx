import styles from '../styles/TableHeader.module.css';

const TableHeader: React.FC = () => {
  return (
    <div className={styles.tableHeader}>
      <div>ID</div>
      <div>Title</div>
      <div>Descriptrion</div>
      <div>Status</div>
    </div>
  );
};

export default TableHeader;
