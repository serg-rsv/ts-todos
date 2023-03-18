import { memo, useState } from 'react';
import styles from '../styles/TableList.module.css';

export type List = {
  id: number;
  description: string;
  isDeleted: boolean;
};

interface ITableProps {
  list: List[];
  onSort: () => void;
  onAction: (id: number) => void;
}

interface IListProps {
  list: List[];
  setList: React.Dispatch<React.SetStateAction<List[]>>;
}

const Table: React.FC<ITableProps> = memo(({ list, onSort, onAction }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th onClick={onSort}>Description</th>
          <th className={styles.actionTh}>Action</th>
        </tr>
      </thead>
      <tbody>
        {list.length > 0 ? (
          list.map(({ id, description, isDeleted }) => (
            <tr key={id} className={isDeleted ? styles.deletedRow : styles.row}>
              <td>{description}</td>
              <td className={styles.action}>
                <button type="button" onClick={() => onAction(id)}>
                  {isDeleted ? 'Recover' : 'Delete'}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr className={styles.singleRow}>
            <td colSpan={2}>Not todos yet</td>
          </tr>
        )}
      </tbody>
    </table>
  );
});

export const TableList: React.FC<IListProps> = ({ list, setList }) => {
  const [error, setError] = useState<string | null>(null);

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const descriptionInput = e.currentTarget.description as HTMLInputElement;
    const description = descriptionInput.value.trim();

    if (!description) {
      setError('Description is required');
      return;
    }

    const newItem = {
      id: Date.now(),
      description,
      isDeleted: false,
    };

    setList((prevState) => [...prevState, newItem]);
    descriptionInput.value = '';
    setError(null);
  };

  const handleActionButton = (id: number) => {
    setList((prevState) =>
      prevState.map((item) =>
        item.id === id ? { ...item, isDeleted: !item.isDeleted } : item
      )
    );
  };

  const handleSortList = () => {
    const sortedList = [...list].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
    setList(sortedList);
  };

  return (
    <>
      <form onSubmit={handleAddItem} className={styles.form}>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            className={[styles.input, error && styles.error].join(' ')}
            type="text"
            name="description"
            placeholder="Enter description"
          />
          {error && (
            <div
              style={{ position: 'absolute', color: 'red', fontSize: '12px' }}
            >
              {error}
            </div>
          )}
        </div>
        <button className={styles.button} type="submit">
          Create
        </button>
      </form>
      <Table
        list={list}
        onSort={handleSortList}
        onAction={handleActionButton}
      />
    </>
  );
};
