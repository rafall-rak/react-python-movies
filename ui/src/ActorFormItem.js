export default function ActorFormItem(props) {
    function setActorName(name) {
        props.handleActorChange({...props.actor, name: name});
    }

    function setActorSurname(surname) {
        props.handleActorChange({...props.actor, surname: surname});
    }

    return <div className="row">
        <div className="column">
            <label>Name</label>
            <input id={"actorName_" + props.actor.idx} type="text" value={props.actor.name}
                   onChange={(event) => setActorName(event.target.value)}/>
        </div>
        <div className="column">
            <label>Surname</label>
            <input id={"actorSurname" + props.actor.idx} type="text" value={props.actor.surname}
                   onChange={(event) => setActorSurname(event.target.value)}/>
        </div>
    </div>
}