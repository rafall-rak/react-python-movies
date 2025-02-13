import { useState } from "react";

export default function ActorFormItem(props) {
    function setActorFirstName(firstName) {
        props.handleActorChange({ ...props.actor, firstName: firstName });
    }

    function setActorLastname(lastName) {
        props.handleActorChange({ ...props.actor, lastName: lastName });
    }

    return <div className="row">
        <div className="column">
            <label>Name</label>
            <input id={"actorName_" + props.actor.idx} type="text" value={props.actor.firstName} onChange={(event) => setActorFirstName(event.target.value)} />
        </div>
        <div className="column">
            <label>Surname</label>
            <input id={"actorSurname" + props.actor.idx} type="text" value={props.actor.lastName} onChange={(event) => setActorLastname(event.target.value)} />
        </div>
    </div>
}