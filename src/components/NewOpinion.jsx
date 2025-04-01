import { useActionState } from "react";

export function NewOpinion() {
  function submitAction(prevAction, formData) {
    const yourName = formData.get('userName')
    const title = formData.get('title')
    const opinion = formData.get('body')

    const errors = []
    if(yourName.length < 1) {
      errors.push('please enter your name')
    }

    if(title.length < 1) {
      errors.push('please enter the title')
    }

    if(opinion.length < 10) {
      errors.push('please enter your opinion')
    }

    if(errors.length > 0) {
      return {errors, enteredValues: {
        yourName,
        title,
        opinion
      }}
    }

    return {errors: null}
  }

  const [formState, formAction] = useActionState(submitAction, {errors: null})

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.yourName}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.opinion}></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">{formState.errors.map(error => (
            <li key={error}>{error}</li>
          ))}</ul>
        )}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
