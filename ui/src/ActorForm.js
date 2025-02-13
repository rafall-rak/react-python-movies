import ActorFormItem from "./ActorFormItem";

export default function ActorForm(props) {
    return props.actors.map( actor => <ActorFormItem key={actor.idx} handleActorChange={props.handleActorChange} actor={actor} />)
}