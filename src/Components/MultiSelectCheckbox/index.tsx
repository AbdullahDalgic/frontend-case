interface IProps {
  data: {
    id: number;
    name: string;
    checked: boolean;
  }[];
  change: (id: number) => void;
}

/**
 * MultiSelectCheckbox Component
 * @param data - checkbox data
 * @param change - checkbox change event
 * @returns
 */
export default function ({ data, change }: IProps) {
  return (
    <div className="checkbox-group">
      {data &&
        data.map((item, index) => (
          <div className="checkbox-item" key={index}>
            <input
              type="checkbox"
              id={`checkbox_${item.id}`}
              checked={item.checked}
              onChange={() => change(item.id)}
            />
            <label htmlFor={`checkbox_${item.id}`}>{item.name}</label>
          </div>
        ))}
    </div>
  );
}
