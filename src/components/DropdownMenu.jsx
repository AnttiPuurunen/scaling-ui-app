export default function DropdownMenu({ taskType, options, setTaskType }) {

    const handleTypeSelect = (event) => {
        console.log(event.target.value);
        setTaskType(event.target.value);
    }

    return (
        <label>
            Valitse tyyppi:
            <select value={taskType} onChange={handleTypeSelect}>
                {options.map((option, index) => (
                    <option key={index} value={option.taskTypeId}>{option.name}</option>
                ))}
            </select>
        </label>
    );
};
