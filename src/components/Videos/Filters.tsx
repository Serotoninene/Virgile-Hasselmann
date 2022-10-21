import React from "react";

interface FiltersProps {
  filterSelected: string;
  setFilterSelected: (e: string) => void;
}

const filterLinks = ["Films", "Corporate", "Musique"];

const Filters = ({ filterSelected, setFilterSelected }: FiltersProps) => {
  return (
    <div className="flex text-2xl sm:justify-center sm:text-5xl">
      <ul className="flex">
        {filterLinks.map((filter, idx) => (
          <div key={filter} className="flex">
            <li
              onClick={() => setFilterSelected(filter)}
              className={`${
                filterSelected === filter ? "text-blue font-black" : ""
              } mx-1`}
            >
              {filter}
            </li>
            {idx !== filterLinks.length - 1 && <li>/</li>}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
