const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
    	<input
    		id="search"
    		type="text"
    		placeholder="Filter By Name"
    		aria-label="Search Input"
    		value={filterText}
    		onChange={onFilter}
    	/>
    	<button type="button" onClick={onClear} style={{ border: 'none' }}>X</button>
    </>
);

export default FilterComponent;