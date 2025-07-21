const KanbanHeader = (props) => {
    const { btnEnabled = false } = props;
    const addBtn = btnEnabled ? (<button className="btn btn-primary sml">Add Card</button>) : null;
    return (
        <div className="container">
            <div className="row rkanban-header">
                <h1>Kanban Board</h1>
                <p>Drag and drop cards between columns to manage your tasks.</p>
                {addBtn}
            </div>
        </div >
    );
};

export default KanbanHeader;