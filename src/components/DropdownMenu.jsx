export default function DropdownMenu({ open, trigger, items }) {
    return (
        <div className="dropdown">
            {trigger}
            {open ? (
                <ul className="menu">
                    {items.map((item) => (
                        <li key={item.tasktypeid} className="menu-item">{item.name}</li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};