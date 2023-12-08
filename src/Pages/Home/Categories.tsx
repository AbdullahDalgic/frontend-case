import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/Store";
import MultiSelectCheckbox from "src/Components/MultiSelectCheckbox";
import {
  categoryCheckedToggle,
  getCategories,
} from "src/Store/slices/categories";

export default function () {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.categories
  );

  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (!data.length || error) {
      dispatch(getCategories());
    }
  }, []);

  const handleCheckboxToggle = (id: number) => {
    dispatch(categoryCheckedToggle(id));
  };

  return (
    <div className="menu-categories">
      <h5 className="title">Kategoriler</h5>
      <div className="search-input">
        <input
          type="text"
          placeholder="kategori ara..."
          onChange={(e: any) => setSearch(e.target.value)}
        />
        <div className="search-icon">
          <img src="/assets/search.svg" alt="search" />
        </div>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>{error ?? "Error..."}</div>}
      {data && (
        <MultiSelectCheckbox
          data={data.filter((item) =>
            item.name.toLowerCase().includes(search.trim().toLowerCase())
          )}
          change={handleCheckboxToggle}
        />
      )}

      <button type="button">Ara</button>
    </div>
  );
}
